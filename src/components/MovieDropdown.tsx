import { useEffect, useRef } from 'react';
import type { Movie } from '../types/movie';
import MovieCardDropdown from './MovieCardDropdown';

type Props = {
  movies: Movie[];
  isLoading: boolean;
  highlightedIndex: number;
  setHighlightedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelect: (id: string) => void;
};

export default function MovieDropdown({
  movies,
  isLoading,
  highlightedIndex,
  setHighlightedIndex,
  onSelect,
}: Props) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll highlighted item into view
  useEffect(() => {
    if (!movies.length) return;
    const el = itemsRef.current[highlightedIndex];
    el?.scrollIntoView({ block: 'nearest' });
  }, [highlightedIndex, movies.length]);

  return (
    <div className="absolute left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg mt-2 max-h-80 overflow-y-auto z-50">
      {isLoading && (
        <div className="p-3 text-gray-500 text-sm">⏳ Loading…</div>
      )}

      {!isLoading &&
        movies.map((movie, index) => (
          <div
            key={movie.id}
            ref={(el) => (itemsRef.current[index] = el)}
            onMouseEnter={() => setHighlightedIndex(index)}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(movie.id)}
            className={`${index === highlightedIndex ? 'bg-blue-100' : ''}`}
          >
            <MovieCardDropdown movie={movie} />
          </div>
        ))}
    </div>
  );
}
