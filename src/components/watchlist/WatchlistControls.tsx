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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
      {/* Tabs (4/12) */}
      <div className="md:col-span-5 min-w-0">
        <WatchlistTabs filter={filter} setFilter={setFilter} counts={counts} />
      </div>

      {/* Search (5/12) */}
      <div className="md:col-span-3 min-w-0">
        <WatchlistSearch value={searchQuery} onChange={setSearchQuery} />
      </div>

      {/* Sorting (3/12) */}
      <div className="md:col-span-3 min-w-0 flex items-center justify-end">
        <WatchlistSort
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
      </div>
    </div>
  );
}
