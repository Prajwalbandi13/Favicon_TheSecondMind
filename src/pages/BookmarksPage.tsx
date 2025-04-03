import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Trash2, ExternalLink } from 'lucide-react';
import { useBookmarkStore } from '../store/bookmarks';

export function BookmarksPage() {
  const { bookmarks, removeBookmark } = useBookmarkStore();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Bookmarked Research
        </h1>

        {bookmarks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">
              No bookmarks yet. Start researching to save interesting topics!
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {bookmarks.map((bookmark) => (
              <motion.div
                key={bookmark.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {bookmark.topic}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Bookmarked on {format(new Date(bookmark.date), 'PPP')}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => removeBookmark(bookmark.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {bookmark.topPaper && (
                  <div className="mt-4 border-t dark:border-gray-700 pt-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Top Paper
                    </h3>
                    <h4 className="text-gray-800 dark:text-gray-200">
                      {bookmark.topPaper.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {bookmark.topPaper.authors.join(', ')}
                    </p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                      {bookmark.topPaper.abstract}
                    </p>
                    <a
                      href={bookmark.topPaper.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mt-2"
                    >
                      View paper <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                )}

                <div className="mt-4 flex items-center">
                  <div className="bg-indigo-50 dark:bg-indigo-900/50 px-3 py-1 rounded-full">
                    <span className="text-sm font-medium text-indigo-700 dark:text-indigo-300">
                      Score: {bookmark.score}/10
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}