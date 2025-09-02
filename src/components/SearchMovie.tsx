import { useEffect, useRef, useState } from 'react';

import MovieDropdown from './MovieDropdown';
import MovieDetailsModal from './MovieDetailsModal';

import useDebounce from '../hooks/useDebounce';
import useMovieSearch from '../hooks/useMovieSearch';

import type { Movie } from '../types/movie';
import { useClickOutside } from '../hooks/useClickOutside';

export default function SearchMovie() {
  const [inputValue, setInputValue] = useState(''); // always shown in the box
  const [searchTerm, setSearchTerm] = useState(''); // only drives search
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null); // ✅ state for modal
  const [modalOpen, setModalOpen] = useState(false); // ✅ state for modal

  const [showDropdown, setShowDropdown] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useClickOutside(containerRef, () => setShowDropdown(false));

  const debounced = useDebounce(searchTerm, 250);

  const { data: movies = [], isLoading, isError } = useMovieSearch(debounced);
  const inputRef = useRef<HTMLInputElement>(null);
  // keep focus + reset highlight when results change
  useEffect(() => {
    inputRef.current?.focus();
    setHighlightedIndex(0);
  }, [debounced, movies.length]);

  const selectMovie = (movie: Movie) => {
    console.log('Selected movie:', movie.id, movie.primaryTitle);

    setInputValue(movie.primaryTitle); // ✅ show title in input
    setSearchTerm(''); // ✅ clear search → no more fetch
    setShowDropdown(false);

    setSelectedMovie(movie); // ✅ save selected movie
    setModalOpen(true); // ✅ open modal
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
          ❌ Error, Please try again later
        </div>
      )}

      {showDropdown && (movies.length > 0 || isLoading || isError) && (
        <MovieDropdown
          movies={movies}
          isLoading={isLoading}
          highlightedIndex={highlightedIndex}
          setHighlightedIndex={setHighlightedIndex}
          onSelect={(id) => {
            const movie = movies.find((x) => x.id === id);
            if (movie) selectMovie(movie);
          }}
        />
      )}

      {/* ✅ Modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
