import { useState } from 'react';

import type { Movie } from '@/types/movie';

export function useMovieModal() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [open, setOpen] = useState(false);

  const openModal = (movie: Movie) => {
    setSelectedMovie(movie);
    setOpen(true);
  };

  const closeModal = () => {
    setSelectedMovie(null);
    setOpen(false);
  };

  return { selectedMovie, open, openModal, closeModal };
}
