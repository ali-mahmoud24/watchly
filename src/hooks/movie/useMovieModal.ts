import { useModal } from '@/hooks/common/useModal';
import type { Movie } from '@/types/movie';

export function useMovieModal() {
  const { data, open, openModal, closeModal } = useModal<Movie>();

  return {
    selectedMovie: data,
    open,
    openModal,
    closeModal,
  };
}
