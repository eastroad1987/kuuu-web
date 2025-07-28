import { CreatePostDto, PostResponse } from "./dto";
import { Category, Post, SubCategory } from "./entities";
import { Value } from "react-calendar/dist/cjs/shared/types";
import React from "react";

/**
 * Represents the style properties for a card component.
 */
export interface CardStyle {
  scale: number;
  filter: string;
  opacity: number;
  yOffset: number;
  zIndex: number;
  rotation: number;
}

/**
 * Data structure for blog cards (manual data)
 */
export interface CardData {
  postId: string;
  image: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
}

/**
 * Post API response structure for card display
 */
export interface PostCardData {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  viewCnt: number;
  publishedAt: string;
  categoryId: string;
  subcategoryId: string;
  category?: {
    id: string;
    title: string;
  };
  subcategory?: {
    id: string;
    title: string;
  };
}

/**
 * Convert a Post to CardData format
 */
export const postToCardData = (post: PostCardData): CardData => ({
  postId: post.id,
  image: post.thumbnail || "/images/default-thumbnail.jpg",
  title: post.title,
  subtitle: post.category?.title || "",
  description: post.content.replace(/<[^>]*>/g, "").substring(0, 100) + "...",
  badge: post.subcategory?.title || "",
  badgeColor: getBadgeColorByCategory(post.categoryId),
});

/**
 * Get badge color based on category ID
 */
const getBadgeColorByCategory = (categoryId: string): string => {
  const colorMap: {[key: string]: string} = {
    "1": "bg-blue-500",    // NEWS
    "2": "bg-green-500",   // BLOG
    "3": "bg-amber-500",   // CAFE/RESTRAINT
    "4": "bg-indigo-500",  // TRAVEL
    "5": "bg-rose-500",    // CULTURE
  };
  
  return colorMap[categoryId] || "bg-gray-500";
};

/**
 * Main page state interface with improved type safety
 */
export interface MainPageState {
  isMobile: boolean;
  isOpen: boolean;
  isHover: boolean;
  windowHeight: number;
  limit: number;
  currentSection: number;
  currentPostId: string;
  currentDate: Date;
  isRotating: boolean;
  cardHeight: number;
  activeCardIndex: number;
  cardData: CardData[];
}

/**
 * Main context interface for the home page
 */
export interface UseMainType {
  state: MainPageState;
  updateState: (updates: Partial<MainPageState>) => void;
  handlers: {
    onPageChange: (page: number) => void;
    onSelected: (postId: string) => void;
    onSideMenuClose: () => void;
    onEnter: () => void;
    onLeave: () => void;
    toggleSideMenu: () => void;
    getVisibleCards: () => CardData[];
    calendarChange: (value: Value, event?: React.MouseEvent<HTMLButtonElement>) => void;
  };
}

/**
 * Category page state interface
 */
export interface CategoryPageState {
  isOpen: boolean;
  title: string | null;
  color: string | null;
  id: string | null;
  mainImage: string | null;
  currentBoard: Category;
  currentSubBoard: SubCategory;
  subBoards: SubCategory[];
  posts: Post[];
}

/**
 * Category page context interface
 */
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

/**
 * Post page state interface
 */
export interface PostPageState {
  isOpen: boolean;
  id: string;
  color: string;
  title: string;
  boardName: string;
  date?: Date;
  post: Post;
}

/**
 * Post page context interface
 */
export interface UsePostType {
  state: PostPageState;
  updateState: (updates: Partial<PostPageState>) => void;
  handlers: {
    toggleSideMenu: () => void;
    onSideMenuClose: () => void;
  };
}

/**
 * Admin writer page state interface
 */
export interface AdminWriterPageState {
  date: Date;
  form: CreatePostDto;
  categories: Category[];
  category: Category;
  subCategories: SubCategory[];
  subCategory: SubCategory;
  isUploading: boolean;
  progress: number;
  thumbnailFile: File | null; // Use File type instead of any
}

/**
 * Admin writer page context interface
 */
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

/**
 * Auth page state interface
 */
export interface AuthPageState {
  // Add properties as needed
}

/**
 * Auth page context interface
 */
export interface UseAuthType {
  state: AuthPageState;
  updateState: (updates: Partial<AuthPageState>) => void;
  handlers: {
    fetchAuthData: () => void;
  };
}

/**
 * Navigation helper interface for page transitions
 */
export interface NavigationType {
  goToHome?: () => void;
  goToPost?: (postId: string) => void;
  goToAdminWriter?: () => void;
  goToAuth?: () => void;
}
