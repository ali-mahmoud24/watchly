import { useEffect, useRef } from 'react';

import MovieCardDropdown from './MovieCardDropdown';

import type { Movie } from '@/types/movie';
import LoadingMessage from '../common/LoadingMessage';

type Props = {
  movies: Movie[];
  isLoading: boolean;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelectMovie: (movie: Movie) => void;
};

export default function MovieDropdown({
  movies,
  isLoading,
  highlightedIndex,
  setHighlightedIndex,
  onSelectMovie,
}: Props) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!movies.length) return;
    const el = itemsRef.current[highlightedIndex];
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, movies.length]);

  return (
    <div className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-80 overflow-y-auto z-50 cursor-pointer">
      {isLoading && <LoadingMessage message="Loading results..." />}

      {!isLoading &&
        movies.map((movie, index) => (
          <div
            key={movie.id}
            ref={(el) => {
              itemsRef.current[index] = el;
            }}
            onMouseEnter={() => setHighlightedIndex(index)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelectMovie(movie)}
            className={`${index === highlightedIndex ? 'bg-blue-100' : ''}`}
          >
            <MovieCardDropdown movie={movie} />
          </div>
        ))}
    </div>
  );
}
