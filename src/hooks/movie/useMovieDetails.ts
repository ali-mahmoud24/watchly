import apiIMDB from '@/lib/apiIMDB';
import { useQuery } from '@tanstack/react-query';

import type { MovieDetails } from '@/types/movie';

export const MOVIE_DETAILS_QK = ['movieDetails'] as const;

async function fetchMovieDetails(titleId: string) {
  try {
    const { data } = await apiIMDB.get(`/titles/${titleId}`);

    return data as MovieDetails;
  } catch (error) {
    console.error('❌ Error fetching movie detail:', error);
    throw error;
  }
}

export function useMovieDetails(titleId: string) {
  return useQuery<MovieDetails>({
    queryKey: [MOVIE_DETAILS_QK, titleId],
    queryFn: () => fetchMovieDetails(titleId),
    enabled: !!titleId, // only fetch when titleId exists
  });
}
