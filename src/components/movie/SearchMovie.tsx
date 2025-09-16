import { useEffect, useRef, useState } from 'react';

import MovieDropdown from './MovieDropdown';
import MovieDetailsModal from './MovieDetailsModal';

import { useClickOutside } from '@/hooks/common/useClickOutside';
import useDebounce from '@/hooks/common/useDebounce';
import useMovieSearch from '@/hooks/movie/useMovieSearch';
import { useAddToWatchlist } from '@/hooks/watchlist/useWatchlist';

import { toast } from 'sonner';

import type { Movie } from '@/types/movie';
import { useMovieModal } from '@/hooks/movie/useMovieModal';

export default function SearchMovie() {
  const [inputValue, setInputValue] = useState(''); // always shown in the box
  const [searchTerm, setSearchTerm] = useState(''); // only drives search
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [showDropdown, setShowDropdown] = useState(false);

  const { selectedMovie, open, openModal, closeModal } = useMovieModal();

  const addMutation = useAddToWatchlist();

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(containerRef, () => setShowDropdown(false));

  const debounced = useDebounce(searchTerm, 250);

  const { data: movies = [], isLoading, isError } = useMovieSearch(debounced);
  
  // keep focus + reset highlight when results change
  useEffect(() => {
    inputRef.current?.focus();
    setHighlightedIndex(0);
  }, [debounced, movies.length]);

  const selectMovie = (movie: Movie) => {
    setInputValue(movie.primaryTitle); // ✅ show title in input
    setSearchTerm(''); // ✅ clear search → no more fetch

    setShowDropdown(false);
    openModal(movie);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const length = isLoading ? 0 : movies.length;
    if (length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((i) => (i + 1) % length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((i) => (i === 0 ? length - 1 : i - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const movie = movies[highlightedIndex];
      if (movie) selectMovie(movie);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-md mx-auto mt-10">
      <input
        ref={inputRef}
        type="text"
        placeholder="Search movies..."
        className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value); // update visible text
          setSearchTerm(e.target.value); // drive query only on typing
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        onKeyDown={handleKeyDown}
      />
      {isError && (
        <div className="mt-2 text-red-500 text-sm text-center">
          Error, Please try again later ❌
        </div>
      )}
      {/* MovieDropdown */}
      {showDropdown && (movies.length > 0 || isLoading || isError) && (
        <MovieDropdown
          movies={movies}
          isLoading={isLoading}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          onSelect={selectMovie}
        />
      )}
      {/* Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        open={open}
        onClose={closeModal}
        mode="search"
        onAddToWatchlist={(movie) =>
          addMutation.mutate(movie, {
            onSuccess: () => {
              toast.success('Added to Watchlist', {
                description: `${movie.primaryTitle} has been added successfully.`,
              });
              closeModal();
            },
            onError: (error) => {
              toast.error(`Couldn't add to watchlsit`, {
                description: error.message,
              });
            },
          })
        }
      />
    </div>
  );
}
