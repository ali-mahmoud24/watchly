import WatchlistTabs from './WatchlistTabs';
import WatchlistSearch from './WatchlistSearch';
import WatchlistSort from './WatchlistSort';

import type { WatchlistFilterKey, WatchlistSortKey } from '@/types/watchlist';

type WatchlistControlsProps = {
  filter: WatchlistFilterKey;
  setFilter: (filter: WatchlistFilterKey) => void;
  counts: { all: number; watched: number; unwatched: number };
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: WatchlistSortKey;
  setSortBy: (sort: WatchlistSortKey) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
};

export default function WatchlistControls({
  filter,
  setFilter,
  counts,
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
}: WatchlistControlsProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Tabs */}
      <WatchlistTabs filter={filter} setFilter={setFilter} counts={counts} />

      {/* Search input */}
      <WatchlistSearch value={searchQuery} onChange={setSearchQuery} />

      {/* Sorting */}
      <WatchlistSort
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
    </div>
  );
}
