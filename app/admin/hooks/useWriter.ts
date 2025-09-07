import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useCreatePost, useGetPostById, useGetS3SignedUrl, useUpdatePost } from "../../lib/api/apis";

import { AdminWriterPageState } from "@/types/types";
import { setBackgroundColor } from "../../redux/reducer";
import { useRouter } from "next/navigation";

export default function useWriter(postId?: string | null) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const getSignedUrl = useGetS3SignedUrl();
  
  // Get post data if editing
  const { data: existingPost } = useGetPostById(postId || "");

  const categories = useAppSelector(
    (store) => (store as any).reducers.app.categories,
  );

  const initialForm = useMemo(
    () => {
      console.log("existingPost", existingPost);
      
      if (existingPost?.data) {
        const post = existingPost.data;
        return {
          publishedAt: post.publishedAt || new Date().toISOString(),
          title: post.title || "",
          content: post.content || "",
          summary: post.summary || "",
          thumbnail: post.thumbnail || "",
          referencePlace: post.referencePlace || "",
          images: post.images || "",
          attachFiles: post.attachFiles || "",
          categoryId: post.categoryId?.toString() || "1",
          subcategoryId: post.subcategoryId?.toString() || "1",
        };
      }
      return {
        publishedAt: new Date().toISOString(),
        title: "",
        content: "",
        summary: "",
        thumbnail: "",
        referencePlace: "",
        images: "",
        attachFiles: "",
        categoryId: "1",
        subcategoryId: "1",
      };
    },
    [existingPost],
  );

  const { mutate: createPost } = useCreatePost();
  const { mutate: updatePost } = useUpdatePost();

  const [state, setState] = useState<AdminWriterPageState>(() => ({
    date: existingPost?.data?.publishedAt ? new Date(existingPost.data.publishedAt) : new Date(),
    form: initialForm,
    categories: categories,
    category: categories[0],
    subCategories: categories[0]?.subCategories,
    subCategory: categories[0]?.subCategories[0],
    isUploading: false,
    progress: 0,
    thumbnailFile: null,
  }));

  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateState = useCallback((updates: Partial<AdminWriterPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  }, []);

  useEffect(() => {
    dispatch(setBackgroundColor("#000000"));
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length > 0) {
      console.log(categories);
      
      // If editing an existing post, find the correct category and subcategory
      if (existingPost?.data) {
        const post = existingPost.data;
        const selectedCategory = categories.find((cat: any) => cat.id === post.categoryId?.toString());
        const selectedSubCategory = selectedCategory?.subCategories?.find((subCat: any) => subCat.id === post.subcategoryId?.toString());
        
        updateState({
          categories: categories,
          category: selectedCategory || categories[0],
          subCategories: selectedCategory?.subCategories || categories[0]?.subCategories,
          subCategory: selectedSubCategory || selectedCategory?.subCategories?.[0] || categories[0]?.subCategories?.[0],
          form: initialForm,
          date: post.publishedAt ? new Date(post.publishedAt) : new Date(),
        });
      } else {
        updateState({
          categories: categories,
          category: categories[0],
          subCategories: categories[0]?.subCategories,
          subCategory: categories[0]?.subCategories[0],
        });
      }
    }
  }, [categories, existingPost, initialForm, updateState]);

  const handleClickSubmit = useCallback(async () => {
    if (!state.form.title || !state.form.content) {
      console.error(state.form.title, state.form.content);
      return;
    }

    // 이미 제출 중인 경우 중복 제출 방지
    if (isSubmitting) {
      console.log("이미 제출 중입니다. 잠시 기다려주세요.");
      return;
    }

    setIsSubmitting(true);
    updateState({ isUploading: true, progress: 0 });

    try {
      let thumbnailUrl = state.form.thumbnail; // 기존 썸네일 URL 유지
      
      // 새로운 썸네일 파일이 있는 경우에만 업로드
      if (state.thumbnailFile) {
        const formData = new FormData();
        formData.append("file", state.thumbnailFile.file);

        const response = await fetch("/api/s3", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("data", data);
        thumbnailUrl = data.url;
      }

      const postData = {
        title: state.form.title,
        publishedAt: state.date.toISOString(),
        content: state.form.content,
        summary: state.form.summary || "",
        thumbnail: thumbnailUrl || "",
        referencePlace: state.form.referencePlace || "",
        images: state.form.images || "",
        attachFiles: state.form.attachFiles || "",
        categoryId: Number(state.form.categoryId),
        subcategoryId: Number(state.form.subcategoryId),
        authorId: 1,
      };

      // 편집 모드인지 새 글 작성 모드인지 확인
      if (postId && existingPost?.data) {
        // 업데이트 모드
        console.log("updatePost", postData);
        await updatePost({ 
          id: postId, 
          data: {
            title: postData.title,
            content: postData.content,
            summary: postData.summary,
            thumbnail: postData.thumbnail,
            referencePlace: postData.referencePlace,
            images: postData.images,
            attachFiles: postData.attachFiles,
            categoryId: postData.categoryId,
            subcategoryId: postData.subcategoryId,
          }
        });
      } else {
        // 생성 모드
        console.log("createPost", postData);
        await createPost(postData);
      }
      router.push("/");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
      updateState({
        isUploading: false,
        progress: 0,
        thumbnailFile: null,
        form: initialForm,
      });
    }
  }, [state.form, state.thumbnailFile, state.date, updateState, createPost, updatePost, initialForm, isSubmitting, postId, existingPost]);

  const handleChangeCategory = useCallback(
    (value: string) => {
      const selected = categories.find(
        (category: any) => category.id === value,
      );
      if (selected) {
        updateState({
          category: selected,
          subCategories: selected.subCategories,
          subCategory: selected.subCategories[0],
          form: {
            ...state.form,
            categoryId: selected.id,
            subcategoryId: selected.subCategories[0]?.id,
          },
        });
      }
    },
    [categories, state.form, updateState],
  );

  const handleChangeSubCategory = useCallback(
    (value: string) => {
      const selected = state.subCategories.find(
        (subCategory: any) => subCategory.id === value,
      );

      if (selected) {
        updateState({
          subCategory: selected,
          form: {
            ...state.form,
            subcategoryId: value,
          },
        });
      }
    },
    [state.subCategories, state.form, updateState],
  );

  const handleChangeFiles = useCallback(
    (files: any) => {
      if (!files) return;
      updateState({
        thumbnailFile: files[0],
      });
    },
    [updateState],
  );

  const handleDeleteThumbnail = useCallback(() => {
    updateState({
      thumbnailFile: null,
      form: {
        ...state.form,
        thumbnail: "",
      },
    });
  }, [updateState, state.form]);

  const handleChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      updateState({
        form: {
          ...state.form,
          title: e.currentTarget.value,
        },
      });
    },
    [state.form, updateState],
  );

  const handleChangeContent = useCallback(
    (value: string) => {
      updateState({
        form: {
          ...state.form,
          content: value,
        },
      });
    },
    [state.form, updateState],
  );

  const handleChangeDate = useCallback(
    (date: Date) => {
      console.log("date", date);
      updateState({
        date: date,
      });
    },
    [updateState],
  );

  const handlers = {
    clickSubmit: handleClickSubmit,
    changeCategory: handleChangeCategory,
    changeSubCategory: handleChangeSubCategory,
    changeFiles: handleChangeFiles,
    deleteThumbnail: handleDeleteThumbnail,
    changeTitle: handleChangeTitle,
    changeContent: handleChangeContent,
    changeDate: handleChangeDate,
  };

  const goToHome = useCallback(() => {
    router.push("/");
  }, [router]);

  const navigation = useMemo(
    () => ({
      goToHome,
    }),
    [goToHome],
  );

  return {
    state,
    updateState,
    handlers,
    navigation,
  };
}
