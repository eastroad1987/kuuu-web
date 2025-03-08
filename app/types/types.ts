import { CategoryResponse, PostResponse, SubCategoryResponse } from "./dto";
import { Category, Post, SubCategory } from "./entities";

export interface MainPageState {
  posts: PostResponse[];
  limit: number;
  isScrolling: boolean;
  currentSection: number;
}

export interface UseMainType {
  state: MainPageState;
  updateState: (updates: Partial<MainPageState>) => void;
  handlers: {
    onPageChange: (page: number) => void;
  };
}

export interface CategoryPageState {
  isOpen: boolean;
  title: string | null;
  color: string | null;
  id: string | null;
  currentBoard: Category;
  currentSubBoard: SubCategory;
  subBoards: SubCategory[];
  posts: Post[];
}

export interface UseCategoryType {
  state: CategoryPageState;
  updateState: (updates: Partial<CategoryPageState>) => void;
  handlers: {
    clickSubCategory: (subCategory: SubCategory) => void;
    toggleSideMenu: () => void;
    onSideMenuClose: () => void;
  };
  navigation: NavigationType;
}

export interface PostPageState {

}

export interface UsePostType {
  state: PostPageState;
  updateState: (updates: Partial<PostPageState>) => void;
  handlers: {
    fetchPostData: () => void;
  };
}

export interface AdminWriterPageState {

}

export interface UseAdminWriterType {
  state: AdminWriterPageState;
  updateState: (updates: Partial<AdminWriterPageState>) => void;
  handlers: {
    fetchAdminWriterData: () => void;
  };
}

export interface AuthPageState {

}

export interface UseAuthType {
  state: AuthPageState;
  updateState: (updates: Partial<AuthPageState>) => void;
  handlers: {
    fetchAuthData: () => void;
  };
}

export interface NavigationType {
  goToHome?: () => void;
  goToPost?: (postId: string) => void;
  goToAdminWriter?: () => void;
  goToAuth?: () => void;
}
