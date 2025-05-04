import { Category, SubCategory } from "@/types/entities";
import { CategoryPageState } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useGetPostsBySubCategory } from "@/libs/api";
import { setBackgroundColor } from "../../../redux/reducer";

export default function useCategory(id: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const color = useMemo(() => {
    return id === "0"
      ? "#FCC018"
      : id === "1"
        ? "#0B3B10"
        : id === "2"
          ? "#0F2355"
          : "#D62C28";
  }, [id]);

  const categories = useAppSelector(
    (store) => (store as any).reducers.app.categories,
  );
  
  const category = useMemo(() => {
    return categories.find(
      (category: any) => category.id === Number(id) + 1,
    );
  }, [categories, id]);

  const initialState = useMemo<CategoryPageState>(() => ({
    isOpen: false,
    id: id,
    title: category?.title || "",
    color,
    currentBoard: {} as Category,
    currentSubBoard: {} as SubCategory,
    subBoards: [],
    posts: [],
  }), [id, color, category]);

  const [state, setState] = useState<CategoryPageState>(initialState);

  const updateState = useCallback((updates: Partial<CategoryPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  }, []);

  const subcategoryId = useMemo(() => {
    return state.currentSubBoard?.id ? state.currentSubBoard.id.toString() : "0";
  }, [state.currentSubBoard]);

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    refetch: postsRefetch,
  } = useGetPostsBySubCategory(subcategoryId);

  useEffect(() => {
    dispatch(setBackgroundColor("#FFFFFF"));
  }, [dispatch]);

  useEffect(() => {
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
  }, [category, updateState, state.currentSubBoard?.id]);

  useEffect(() => {
    if (posts) {
      updateState({ posts: posts.data });
    }
  }, [posts, updateState]);

  useEffect(() => {
    if (state.currentSubBoard?.id) {
      postsRefetch();
    }
  }, [state.currentSubBoard?.id, postsRefetch]);

  const handleClickSubCategory = useCallback((subCategory: SubCategory) => {
    updateState({ currentSubBoard: subCategory });
  }, [updateState]);
  
  const handleToggleSideMenu = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  }, [updateState]);
  
  const handleSideMenuClose = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: false }));
  }, [updateState]);

  const handlers = {
    clickSubCategory: handleClickSubCategory,
    toggleSideMenu: handleToggleSideMenu,
    onSideMenuClose: handleSideMenuClose,
  };

  const goToPost = useCallback((postId: string) => {
    router.push(`/post/${postId}`);
  }, [router]);

  const navigation = useMemo(() => ({
    goToPost
  }), [goToPost]);

  return {
    state,
    updateState,
    handlers,
    navigation,
    postsLoading,
    postsError
  };
}
