import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Bookmark {
  id: string;
  topic: string;
  date: string;
  score: number;
  topPaper?: {
    title: string;
    authors: string[];
    abstract: string;
    link: string;
  };
}

interface BookmarkState {
  bookmarks: Bookmark[];
  addBookmark: (bookmark: Bookmark) => void;
  removeBookmark: (id: string) => void;
  isBookmarked: (topic: string) => boolean;
}

export const useBookmarkStore = create<BookmarkState>()(
  persist(
    (set, get) => ({
      bookmarks: [],
      addBookmark: (bookmark) => set((state) => ({
        bookmarks: [...state.bookmarks, bookmark]
      })),
      removeBookmark: (id) => set((state) => ({
        bookmarks: state.bookmarks.filter((b) => b.id !== id)
      })),
      isBookmarked: (topic) => get().bookmarks.some((b) => b.topic === topic),
    }),
    {
      name: 'bookmarks-storage',
    }
  )
);