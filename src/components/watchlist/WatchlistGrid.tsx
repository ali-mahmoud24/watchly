import { motion, AnimatePresence } from 'framer-motion';

import WatchlistItem from './WatchlistItem';

import type { Movie } from '@/types/movie';

type WatchlistEmptyStateProps = {
  filter: string;
};

function WatchlistEmptyState({ filter }: WatchlistEmptyStateProps) {
  return (
    <motion.p
      key="empty"
      className="text-gray-500 text-center col-span-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      No {filter === 'all' ? '' : filter} movies found.
    </motion.p>
  );
}

type WatchlistGridProps = {
  movies: Movie[];
  filter: string;
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  onSelectMovie: (movie: Movie) => void;
};

export default function WatchlistGrid({
  movies,
  filter,
  searchQuery,
  sortBy,
  sortOrder,
  onSelectMovie,
}: WatchlistGridProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${filter}-${searchQuery}-${sortBy}-${sortOrder}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.25 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {movies.length > 0 ? (
          movies.map((movie) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.25 }}
              onClick={() => onSelectMovie(movie)}
              className="cursor-pointer"
            >
              <WatchlistItem movie={movie} />
            </motion.div>
          ))
        ) : (
          <WatchlistEmptyState filter={filter} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
