import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { useAppSelector } from "../../redux/hooks";
import { CreatePostDto } from "@/types/dto";
import { uploadFile, useCreatePost } from "@/libs/api";
import { AdminWriterPageState } from "@/types/types";
import { Category } from "@/types/entities";
import ReactQuill from "react-quill";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../../redux/hooks";
import { setBackgroundColor } from "../../redux/reducer";

export default function useWriter() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const categories = useAppSelector(
    (store) => (store as any).reducers.app.categories,
  );

  const initialForm = useMemo<CreatePostDto>(() => ({
    title: "",
    content: "",
    summary: "",
    thumbnail: "",
    referencePlace: "",
    images: "",
    attachFiles: "",
    categoryId: categories[0]?.id,
    subcategoryId: categories[0]?.subcategories[0]?.id,
  }), [categories]);

  const { mutate: createPost } = useCreatePost(initialForm);

  const quillRef = useRef<ReactQuill>(null);
  const [state, setState] = useState<AdminWriterPageState>(() => ({
    date: new Date(),
    form: initialForm,
    categories: categories,
    category: categories[0],
    subCategories: categories[0]?.subcategories,
    subCategory: categories[0]?.subcategories[0],
    isUploading: false,
    progress: 0,
    thumbnailFile: null,
    quillRef: quillRef,
  }));

  const updateState = useCallback((updates: Partial<AdminWriterPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  }, []);

  useEffect(() => {
    dispatch(setBackgroundColor("#000000"));
  }, [dispatch]);

  useEffect(() => {
    if (categories?.length > 0) {
      updateState({
        categories: categories,
        category: categories[0],
        subCategories: categories[0]?.subcategories,
        subCategory: categories[0]?.subcategories[0],
      });
    }
  }, [categories, updateState]);
  
  const handlers = useMemo(() => ({
    clickSubmit: async () => {
      if (!state.form.title || !state.form.content) {
        console.error(state.form.title, state.form.content);
        return;
      }
      
      updateState({ isUploading: true, progress: 0 });
      
      try {
        let thumbnailUrl = "";
        if (state.thumbnailFile) {
          const formData = new FormData();
          formData.append("file", state.thumbnailFile?.file);
          const item: any = await uploadFile(formData);
          thumbnailUrl = item.data[0].url;
        }
        
        const post = {
          ...state.form,
          thumbnail: thumbnailUrl,
          categoryId: Number(state.form.categoryId),
          subcategoryId: Number(state.form.subcategoryId),
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
    },
    
    changeCategory: (value: string) => {
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
    
    changeSubCategory: (value: string) => {
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
    
    changeFiles: (files: any) => {
      if (!files) return;
      updateState({
        thumbnailFile: files[0],
      });
    },
    
    changeTitle: (e: React.ChangeEvent<HTMLInputElement>) => {
      updateState({
        form: {
          ...state.form,
          title: e.currentTarget.value,
        },
      });
    },
    
    changeContent: (value: string) => {
      updateState({
        form: {
          ...state.form,
          content: value,
        },
      });
    },
    
    changeDate: (date: Date) => {
      updateState({
        date: date,
      });
    },
  }), [state, categories, createPost, initialForm, updateState]);

  const navigation = useMemo(() => ({
    goToHome: () => {
      router.push("/");
    },
  }), [router]);

  return {
    state,
    updateState,
    handlers,
    navigation,
  };
}
