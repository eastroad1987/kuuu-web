import { useEffect, useRef, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { CreatePostDto } from "@/types/dto";
import { useCreatePost } from "@/libs/api";
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

  const initialForm: CreatePostDto = {
    title: "",
    content: "",
    summary: "",
    thumbnail: "",
    referencePlace: "",
    images: "",
    attachFiles: "",
    categoryId: categories[0]?.id,
    subcategoryId: categories[0]?.subcategories[0]?.id,
  };

  const { mutate: createPost } = useCreatePost(initialForm);

  const quillRef = useRef<ReactQuill>(null);
  const [state, setState] = useState<AdminWriterPageState>({
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
  });

  const updateState = (updates: Partial<AdminWriterPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  useEffect(() => {
    dispatch(setBackgroundColor("#000000"));
  }, []);

  useEffect(() => {
    updateState({
      categories: categories,
      category: categories[0],
      subCategories: categories[0]?.subcategories,
      subCategory: categories[0]?.subcategories[0],
    });
  }, [categories]);
  
  const handlers = {
    clickSubmit: () => {
      // if (!form.title || !form.content) {
      //   console.error(form.title, form.content);
      //   return;
      // }
      // let thumbnailUrl = "";
      // if (thumbnailFile) {
      //   const formData = new FormData();
      //   formData.append("file", thumbnailFile?.file);
      //   const item: any = await uploadFile(formData);
      //   console.log("item: ", item);
      //   thumbnailUrl = item.data[0].url;
      // }
      // try {
      //   setIsUploading(true);
      //   setProgress(0);
      //   const post = {
      //     ...form,
      //     thumbnail: thumbnailUrl,
      //     categoryId: Number(form.categoryId),
      //     subcategoryId: Number(form.subcategoryId),
      //   };
      //   await createPost(post);
      // } catch (error) {
      //   console.error(error);
      // } finally {
      //   setIsUploading(false);
      //   setProgress(0);
      //   setThumbnailFile(null);
      //   setForm(initialForm);
      // }
    },
    changeCategory: (value: string) => {
      // const selected = categories.find(
      //   (category: any) => category.id === Number(value),
      // );
      // setCategory(selected);
      // setSubCategories(selected.subcategories);
      // setSubCategory(selected.subcategories[0]);
      // setForm({
      //   ...form,
      //   categoryId: selected.id,
      //   subcategoryId: selected.subcategories[0].id,
      // });
    },
    changeSubCategory: (value: string) => {
      // setSubCategory(
      //   subCategories.find(
      //     (subCategory: any) => subCategory.id === Number(value),
      //   ),
      // );
      // setForm({
      //   ...form,
      //   subcategoryId: value,
      // });
    },
    changeFiles: (files: any) => {
      // if (!files) return;
      // setThumbnailFile(files[0]);
    },
    changeTitle: (e: React.ChangeEvent<HTMLInputElement>) => {
      // setForm({
      //   ...form,
      //   title: e.currentTarget.value,
      // });
    },
    changeContent: (value: string) => {
      // setForm({
      //   ...form,
      //   content: value,
      // });
    },
    changeDate: (date: Date) => {
      updateState({
        date: date,
      });
    },
  };

  const navigation = {
    goToHome: () => {
      router.push("/");
    },
  };

  return {
    state,
    updateState,
    handlers,
    navigation,
  };
}
