import { useEffect, useState } from 'react';

import MovieDropdown from './MovieDropdown';
import MovieDetailsModal from './MovieDetailsModal';

import ErrorMessage from '@/components/common/ErrorMessage';

import useDebounce from '@/hooks/common/useDebounce';
import useMovieSearch from '@/hooks/movie/useMovieSearch';
import { useAddToWatchlist } from '@/hooks/watchlist/useWatchlist';
import { useMovieModal } from '@/hooks/movie/useMovieModal';
import { useKeyboardNavigation } from '@/hooks/common/useKeyboardNavigation';
import { useDropdown } from '@/hooks/common/useDropdown';

import { toast } from 'sonner';

import type { Movie } from '@/types/movie';

export default function SearchMovie() {
  const [inputValue, setInputValue] = useState(''); // always shown in the box
  const [searchTerm, setSearchTerm] = useState(''); // only drives search
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const {
    open: showDropdown,
    setOpen: setShowDropdown,
    containerRef,
    inputRef,
  } = useDropdown();
  const { selectedMovie, open, openModal, closeModal } = useMovieModal();

  const addMutation = useAddToWatchlist();

  const debounced = useDebounce(searchTerm, 250);

  const { data: movies = [], isLoading, isError } = useMovieSearch(debounced);

  // Reset highlight when results change
  useEffect(() => {
    setHighlightedIndex(0);
  }, [debounced, movies.length]);

  const selectMovie = (movie: Movie) => {
    setInputValue(movie.primaryTitle); // ✅ show title in input
    setSearchTerm(''); // ✅ clear search → no more fetch

    setShowDropdown(false);
    openModal(movie);
  };

  const handleKeyDown = useKeyboardNavigation(
    isLoading ? [] : movies,
    highlightedIndex,
    setHighlightedIndex,
    selectMovie
  );

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
      {isError && <ErrorMessage message="Error, Please try again later" />}

      {/* MovieDropdown */}
      {showDropdown && (movies.length > 0 || isLoading || isError) && (
        <MovieDropdown
          movies={movies}
          isLoading={isLoading}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          onSelectMovie={selectMovie}
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
