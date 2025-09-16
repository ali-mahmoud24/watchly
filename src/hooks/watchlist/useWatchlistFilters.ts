import { useState, useMemo } from 'react';

import type { Movie } from '@/types/movie';
import type { WatchlistSortKey, WatchlistFilterKey } from '@/types/watchlist';

export function useWatchlistState(watchlist: Movie[] = []) {
  const [filter, setFilter] = useState<WatchlistFilterKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<WatchlistSortKey>('recent');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // counts
  const watchedCount = watchlist.filter((movie) => movie.watched).length;
  const unwatchedCount = watchlist.filter((movie) => !movie.watched).length;
  const allCount = watchlist.length;

  const filtered = useMemo(() => {
    let res = [...watchlist];

    // filter
    if (filter === 'watched') res = res.filter((movie) => movie.watched);
    if (filter === 'unwatched') res = res.filter((movie) => !movie.watched);

    // search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      res = res.filter(
        (movie) =>
          movie.primaryTitle.toLowerCase().includes(q) ||
          (movie.originalTitle?.toLowerCase().includes(q) ?? false)
      );
    }

    // sort
    res.sort((a, b) => {
      if (sortBy === 'title') {
        return sortOrder === 'asc'
          ? a.primaryTitle.localeCompare(b.primaryTitle)
          : b.primaryTitle.localeCompare(a.primaryTitle);
      }
      if (sortBy === 'year') {
        return sortOrder === 'asc'
          ? (a.startYear ?? 0) - (b.startYear ?? 0)
          : (b.startYear ?? 0) - (a.startYear ?? 0);
      }
      if (sortBy === 'recent') {
        return sortOrder === 'asc'
          ? (a.addedAt ?? 0) - (b.addedAt ?? 0)
          : (b.addedAt ?? 0) - (a.addedAt ?? 0);
      }
      return 0;
    });

    return res;
  }, [watchlist, filter, searchQuery, sortBy, sortOrder]);

  return {
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    watchedCount,
    unwatchedCount,
    allCount,
    filtered,
  };
}
