import { CreatePostDto, PostResponse } from "./dto";
import { Category, Post, SubCategory } from "./entities";

export interface CardStyle {
  scale: number;
  filter: string;
  opacity: number;
  yOffset: number;
  zIndex: number;
}

export interface MainPageState {
  isMobile: boolean;
  isOpen: boolean;
  timerRef: any;
  maxVisibleBlogs: number;
  visibleBlogs: any[];
  arrayIndex: number[];
  currentIndex: number;
  windowHeight: number;
  posts: PostResponse[];
  limit: number;
  isScrolling: boolean;
  currentSection: number;
  currentPostId: string;
  currentDate: Date;
}

export interface UseMainType {
  state: MainPageState;
  updateState: (updates: Partial<MainPageState>) => void;
  handlers: {
    onPageChange: (page: number) => void;
    onSelected: (postId: string) => void;
    onChangeDate: (date: Date) => void;
    onSelectedDate: (date: Date) => void;
    onSideMenuClose: () => void;
    toggleSideMenu: () => void;
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
  isOpen: boolean;
  id: string;
  color: string;
  title: string;
  boardName: string;
  date: Date;
  post: Post;
}

export interface UsePostType {
  state: PostPageState;
  updateState: (updates: Partial<PostPageState>) => void;
  handlers: {
    toggleSideMenu: () => void;
    onSideMenuClose: () => void;
  };
}

export interface AdminWriterPageState {
  date: Date;
  form: CreatePostDto;
  categories: Category[];
  category: Category;
  subCategories: SubCategory[];
  subCategory: SubCategory;
  isUploading: boolean;
  progress: number;
  thumbnailFile: any | null;
}

export interface UseAdminWriterType {
  state: AdminWriterPageState;
  updateState: (updates: Partial<AdminWriterPageState>) => void;
  handlers: {
    clickSubmit: () => void;
    changeCategory: (value: string) => void;
    changeSubCategory: (value: string) => void;
    changeFiles: (files: FileList | null) => void;
    changeTitle: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changeContent: (value: string) => void;
    changeDate: (date: Date) => void;
  };
  navigation: NavigationType;
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
