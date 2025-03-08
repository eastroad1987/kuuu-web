import { Category, SubCategory } from "@/types/entities";
import { CategoryPageState } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/hooks";
import { useGetPostsBySubCategory } from "@/libs/api";

export default function useCategory(id: string) {
  const router = useRouter();

  const color =
    id === "0"
      ? "#FCC018"
      : id === "1"
        ? "#0B3B10"
        : id === "2"
          ? "#0F2355"
          : "#D62C28";

  const categories = useAppSelector(
    (store) => (store as any).reducers.Categories.categories,
  );
  const category = categories.find(
    (category: any) => category.id === Number(id) + 1,
  );

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    refetch: postsRefetch,
  } = useGetPostsBySubCategory(category ? category?.id : id);

  const initialState: CategoryPageState = {
    isOpen: false,
    id: id,
    title: category?.title || "",
    color,
    currentBoard: {} as Category,
    currentSubBoard: {} as SubCategory,
    subBoards: [],
    posts: [],
  };

  const [state, setState] = useState<CategoryPageState>(initialState);

  const updateState = (updates: Partial<CategoryPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  };

  useEffect(() => {
    console.log("[useCategory] category: ", category);
    if (category) {
      updateState({
        title: category.title,
        currentBoard: category,
        subBoards: category.subcategories,
        currentSubBoard: !state.currentSubBoard?.id
          ? category.subcategories[0]
          : state.currentSubBoard,
      });
    }
  }, [category]);

  useEffect(() => {
    if (posts) {
      updateState({ posts: posts.data });
    }
  }, [posts]);

  useEffect(() => {
    if (state.currentSubBoard?.id) {
      postsRefetch();
    }
  }, [state.currentSubBoard]);

  const handlers = {
    clickSubCategory: (subCategory: SubCategory) => {
      setState((prevState) => ({ ...prevState, currentSubBoard: subCategory }));
    },
    toggleSideMenu: () => {
      setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
    },
    onSideMenuClose: () => {
      setState((prevState) => ({ ...prevState, isOpen: false }));
    },
  };

  const navigation = {
    goToPost: (postId: string) => {
      router.push(`/post/${postId}`);
    },
  };

  return {
    state,
    updateState,
    handlers,
    navigation,
  };
}
