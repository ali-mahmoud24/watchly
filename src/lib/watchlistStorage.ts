import type { Movie } from '@/types/movie';

const STORAGE_KEY = 'watchly:watchlist';

export function getWatchlist(): Movie[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Movie[]) : [];
  } catch {
    return [];
  }
}

export function setWatchlist(list: Movie[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

/** Simulate a “remote-like” write and dedupe by id */
export async function addMovieToStorage(movie: Movie): Promise<Movie[]> {
  const current = getWatchlist();
  const exists = current.some((m) => m.id === movie.id);
  if (exists) {
    // Treat as an error to exercise onError path
    throw new Error('Already in watchlist');
  }
  const updated = [...current, movie];
  setWatchlist(updated);
  return updated;
}


export async function removeMovieFromStorage(id: string): Promise<Movie[]> {
  const current = getWatchlist();
  const updated = current.filter((m) => m.id !== id);
  setWatchlist(updated);
  return updated;
}

export async function toggleWatchedInStorage(id: string): Promise<Movie[]> {
  const current = getWatchlist();
  const updated = current.map((m) =>
    m.id === id ? { ...m, watched: !m.watched } : m
  );
  setWatchlist(updated);
  return updated;
}
