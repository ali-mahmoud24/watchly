import { useQuery } from '@tanstack/react-query';
import apiIMDB from '../lib/apiIMDB';
import type { Movie } from '../types/movie';

export async function fetchMovies(searchTerm: string): Promise<Movie[]> {
  if (!searchTerm.trim()) return []; // ✅ skip empty/whitespace
  try {
    const { data } = await apiIMDB.get('', {
      params: { query: searchTerm },
    });

    return (data.titles as Movie[]) || [];
  } catch (error) {
    console.error('❌ Error fetching movies:', error);
    // 🔥 Let React Query handle it
    throw error;
  }
}

export default function useMovieSearch(searchTerm: string) {
  const trimmedSearchTerm = searchTerm.trim();

  return useQuery({
    queryKey: ['movies', trimmedSearchTerm],
    queryFn: () => fetchMovies(trimmedSearchTerm),
    enabled: Boolean(trimmedSearchTerm), // ✅ run only if non-empty
    staleTime: 1000 * 60 * 5, // 5 min cache
    retry: 1, // 🔁 only retry once
    retryDelay: 500, // wait half a second
  });
}
