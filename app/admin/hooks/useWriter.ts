import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { AdminWriterPageState } from "@/types/types";
import { useRouter } from "next/navigation";

import { useCreatePost, useGetS3SignedUrl } from "../../lib/api/apis";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBackgroundColor } from "../../redux/reducer";

export default function useWriter() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const getSignedUrl = useGetS3SignedUrl();

  const categories = useAppSelector(
    (store) => (store as any).reducers.app.categories,
  );

  const initialForm = useMemo(
    () => ({
      title: "",
      content: "",
      summary: "",
      thumbnail: "",
      referencePlace: "",
      images: "",
      attachFiles: "",
      categoryId: "1",
      subcategoryId: "1",
    }),
    [],
  );

  const { mutate: createPost } = useCreatePost();

  const [state, setState] = useState<AdminWriterPageState>(() => ({
    date: new Date(),
    form: initialForm,
    categories: categories,
    category: categories[0],
    subCategories: categories[0]?.subCategories,
    subCategory: categories[0]?.subCategories[0],
    isUploading: false,
    progress: 0,
    thumbnailFile: null,
  }));

  const updateState = useCallback((updates: Partial<AdminWriterPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  }, []);

  useEffect(() => {
    dispatch(setBackgroundColor("#000000"));
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length > 0) {
      console.log(categories);
      updateState({
        categories: categories,
        category: categories[0],
        subCategories: categories[0]?.subCategories,
        subCategory: categories[0]?.subCategories[0],
      });
    }
  }, [categories, updateState]);

  const handleClickSubmit = useCallback(async () => {
    if (!state.form.title || !state.form.content) {
      console.error(state.form.title, state.form.content);
      return;
    }

    updateState({ isUploading: true, progress: 0 });

    try {
      let thumbnailUrl = "";
      if (state.thumbnailFile) {
        // 1. Get signed URL
        const { data: signedUrlData } = await getSignedUrl.mutateAsync({
          fileName: state.thumbnailFile.file.name,
          fileType: state.thumbnailFile.file.type,
        });

        // 2. Upload file using signed URL
        const response = await fetch(signedUrlData.signedUrl, {
          method: "PUT",
          body: state.thumbnailFile.file,
          headers: {
            "Content-Type": state.thumbnailFile.file.type || "image/jpeg",
          },
        });
        if (!response.ok) {
          throw new Error(`Upload failed: ${response.statusText}`);
        }

        thumbnailUrl = `https://s3-kuuu.s3.ap-northeast-2.amazonaws.com/${signedUrlData.key}`;
      }
      

      const post = {
        title: state.form.title,
        content: state.form.content,
        summary: state.form.summary || "",
        thumbnail: thumbnailUrl,
        referencePlace: state.form.referencePlace || "",
        images: state.form.images || "",
        attachFiles: state.form.attachFiles || "",
        categoryId: Number(state.form.categoryId),
        subcategoryId: Number(state.form.subcategoryId),
        authorId: 1,
      };

      await createPost(post);
    } catch (error) {
      console.error(error);
    } finally {
      updateState({
        isUploading: false,
        progress: 0,
        thumbnailFile: null,
        form: initialForm,
      });
    }
  }, [
    state.form,
    state.thumbnailFile,
    updateState,
    createPost,
    initialForm,
    getSignedUrl,
  ]);

  const handleChangeCategory = useCallback(
    (value: string) => {
      const selected = categories.find(
        (category: any) => category.id === Number(value),
      );

      if (selected) {
        updateState({
          category: selected,
          subCategories: selected.subcategories,
          subCategory: selected.subcategories[0],
          form: {
            ...state.form,
            categoryId: selected.id,
            subcategoryId: selected.subcategories[0]?.id,
          },
        });
      }
    },
    [categories, state.form, updateState],
  );

  const handleChangeSubCategory = useCallback(
    (value: string) => {
      const selected = state.subCategories.find(
        (subCategory: any) => subCategory.id === Number(value),
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
