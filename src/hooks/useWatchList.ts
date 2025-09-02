import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getWatchlist, addMovieToStorage, removeMovieFromStorage, toggleWatchedInStorage } from '@/lib/watchlistStorage';
import type { Movie } from '@/types/movie';

export const WATCHLIST_QK = ['watchlist'] as const;

export function useWatchlistQuery() {
  return useQuery<Movie[]>({
    queryKey: WATCHLIST_QK,
    queryFn: getWatchlist,
    initialData: [],
  });
}

export function useAddToWatchlist() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (movie: Movie) => addMovieToStorage(movie),

    // ✅ Optimistic update
    onMutate: async (movie) => {
      await qc.cancelQueries({ queryKey: WATCHLIST_QK });

      const previous = qc.getQueryData<Movie[]>(WATCHLIST_QK) ?? [];
      const exists = previous.some((m) => m.id === movie.id);

      if (!exists) {
        qc.setQueryData<Movie[]>(WATCHLIST_QK, [...previous, movie]);
      }

      return { previous };
    },

    // ❌ Rollback on error
    onError: (_err, _movie, ctx) => {
      if (ctx?.previous) {
        qc.setQueryData(WATCHLIST_QK, ctx.previous);
      }
    },

    // 🔁 Ensure cache sync
    onSettled: () => {
      qc.invalidateQueries({ queryKey: WATCHLIST_QK });
    },
  });
}


export function useRemoveFromWatchlist() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => removeMovieFromStorage(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: WATCHLIST_QK });
      const previous = qc.getQueryData<Movie[]>(WATCHLIST_QK) ?? [];
      qc.setQueryData(
        WATCHLIST_QK,
        previous.filter((m) => m.id !== id)
      );
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(WATCHLIST_QK, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: WATCHLIST_QK }),
  });
}

export function useToggleWatched() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => toggleWatchedInStorage(id),
    onMutate: async (id) => {
      await qc.cancelQueries({ queryKey: WATCHLIST_QK });
      const previous = qc.getQueryData<Movie[]>(WATCHLIST_QK) ?? [];
      qc.setQueryData(
        WATCHLIST_QK,
        previous.map((m) =>
          m.id === id ? { ...m, watched: !m.watched } : m
        )
      );
      return { previous };
    },
    onError: (_err, _id, ctx) => {
      if (ctx?.previous) qc.setQueryData(WATCHLIST_QK, ctx.previous);
    },
    onSettled: () => qc.invalidateQueries({ queryKey: WATCHLIST_QK }),
  });
}