import { Category, SubCategory, Post } from "@/types/entities";
import { CategoryPageState } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  useGetPostBySubCategoryId,
  useGetSubCategoriesByCategoryId,
} from "../../../lib/api/apis";
import { setBackgroundColor } from "../../../redux/reducer";
import { PaginatedResponse } from "@/types/api";

const CATEGORY_COLORS = {
  "0": "#FCC018",
  "1": "#0B3B10",
  "2": "#0F2355",
  default: "#D62C28",
} as const;

const CATEGORY_IMAGE = {
  "0": "/images/bridge.png",
  "1": "/images/korea.png",
  "2": "/images/life.png",
  default: "/images/kurumi2.png",
} as const;

const CATEGORY_TITLE = {
  "0": "Musical & Movie",
  "1": "Life",
  "2": "Cafe & Restaurant",
  "3": "Sightseeing",
  default: "Kurumi",
} as const;

export default function useCategory(id: string) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const color = useMemo(
    () =>
      CATEGORY_COLORS[id as keyof typeof CATEGORY_COLORS] ||
      CATEGORY_COLORS.default,
    [id],
  );

  const mainImage = useMemo(
    () =>
      CATEGORY_IMAGE[id as keyof typeof CATEGORY_IMAGE] ||
      CATEGORY_IMAGE.default,
    [id],
  );
  
  const title = useMemo(
    () =>
      CATEGORY_TITLE[id as keyof typeof CATEGORY_TITLE] ||
      CATEGORY_TITLE.default,
    [id],
  );

  const categories = useAppSelector(
    (store) => (store as any).reducers.app.categories,
  );

  const category = useMemo(
    () =>
      categories.find(
        (category: Category) => BigInt(category.id) === BigInt(Number(id) + 1),
      ),
    [categories, id],
  );

  const initialState = useMemo<CategoryPageState>(
    () => ({
      isOpen: false,
      id,
      title,
      color,
      mainImage,
      currentBoard: category ? category : ({ title: "" } as Category),
      currentSubBoard: { title: "" } as SubCategory,
      subBoards: [],
      posts: [],
    }),
    [id, title,, color, category, mainImage],
  );

  const [state, setState] = useState<CategoryPageState>(initialState);

  const updateState = useCallback((updates: Partial<CategoryPageState>) => {
    setState((prevState) => ({ ...prevState, ...updates }));
  }, []);

  const {
    data: subcategories,
    isLoading: subcategoriesLoading,
    isError: subcategoriesError,
    refetch: subcategoriesRefetch,
  } = useGetSubCategoriesByCategoryId(Number(id) + 1);

  const {
    data: posts,
    isLoading: postsLoading,
    isError: postsError,
    refetch: postsRefetch,
  } = useGetPostBySubCategoryId(Number(state.currentSubBoard?.id));

  useEffect(() => {
    dispatch(setBackgroundColor("#FFFFFF"));
  }, [dispatch]);

  useEffect(() => {
    if (category) {
      updateState({
        title: category?.title || "",
        currentBoard: category || ({} as Category),
      });
    }
  }, [category, updateState]);

  useEffect(() => {
    if (subcategories?.data) {
      const typedSubcategories = subcategories.data as unknown as SubCategory[];
      const defaultSubBoard = !state.currentSubBoard?.id
        ? typedSubcategories[0]
        : state.currentSubBoard;
      updateState({
        subBoards: typedSubcategories,
        currentSubBoard: defaultSubBoard
          ? defaultSubBoard
          : ({ title: "" } as SubCategory),
      });
    }
  }, [subcategories, updateState, state.currentSubBoard]);

  useEffect(() => {
    console.log(posts);
    if (posts?.data) {
      const typedPosts = posts.data as unknown as Post[];
      updateState({ posts: typedPosts });
    }
  }, [posts, updateState]);

  const handleClickSubCategory = useCallback(
    (subCategory: SubCategory) => {
      updateState({ currentSubBoard: subCategory });
      postsRefetch();
    },
    [updateState, postsRefetch],
  );

  const handleToggleSideMenu = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: !prevState.isOpen }));
  }, []);

  const handleSideMenuClose = useCallback(() => {
    setState((prevState) => ({ ...prevState, isOpen: false }));
  }, []);

  const handlers = useMemo(
    () => ({
      clickSubCategory: handleClickSubCategory,
      toggleSideMenu: handleToggleSideMenu,
      onSideMenuClose: handleSideMenuClose,
    }),
    [handleClickSubCategory, handleToggleSideMenu, handleSideMenuClose],
  );

  const goToPost = useCallback(
    (postId: string) => {
      router.push(`/post/${postId}`);
    },
    [router],
  );

  const navigation = useMemo(
    () => ({
      goToPost,
    }),
    [goToPost],
  );

  return {
    state,
    updateState,
    handlers,
    navigation,
    postsLoading: false,
    postsError: false,
  };
}
