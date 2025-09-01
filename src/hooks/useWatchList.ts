import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getWatchlist, addMovieToStorage } from '@/lib/watchlistStorage';

import type { Movie } from '@/types/movie';

export const WATCHLIST_QK = ['watchlist'] as const;

export function useWatchlistQuery() {
  return useQuery({
    queryKey: WATCHLIST_QK,
    // “Async” for compatibility—could also wrap with Promise.resolve(...)
    queryFn: async () => getWatchlist(),
    initialData: [] as Movie[],
  });
}

export function useAddToWatchlist() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (movie: Movie) => addMovieToStorage(movie),

    // ✅ Optimistic update
    onMutate: async (movie) => {
      await qc.cancelQueries({ queryKey: WATCHLIST_QK });

      const previous = qc.getQueryData<Movie[]>(WATCHLIST_QK) ?? [];

      // Optimistically add if not present
      const exists = previous.some((m) => m.id === movie.id);
      if (!exists) {
        qc.setQueryData<Movie[]>(WATCHLIST_QK, [...previous, movie]);
      }

      return { previous };
    },

    // ❌ Rollback on error
    onError: (error: unknown, _movie, ctx) => {
      if (ctx?.previous) qc.setQueryData(WATCHLIST_QK, ctx.previous);

      const msg =
        error instanceof Error ? error.message : 'Failed to add to watchlist';
      toast.error('Couldn’t add to watchlist', { description: msg });
    },

    // ✅ Notify user
    onSuccess: (_data, movie) => {
      toast.success('Added to Watchlist', {
        description: `${movie.primaryTitle} has been added successfully.`,
      });

      // 👇 Log the latest watchlist after add
      const updated = qc.getQueryData<Movie[]>(WATCHLIST_QK);
      console.log('📺 Current Watchlist:', updated);
    },

    // 🔁 Ensure cache and source of truth are in sync
    onSettled: () => {
      qc.invalidateQueries({ queryKey: WATCHLIST_QK });
    },
  });
}
