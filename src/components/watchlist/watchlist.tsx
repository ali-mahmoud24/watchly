import { WatchlistLoading, WatchlistEmpty } from './WatchlistStates';
import WatchlistControls from './WatchlistControls';
import WatchlistGrid from './WatchlistGrid';
import MovieDetailsModal from '../movie/MovieDetailsModal';
import SectionDivider from '../common/SectionDivider';

import { useWatchlistQuery } from '@/hooks/useWatchlist';
import { useWatchlistState } from '@/hooks/useWatchlistState';
import { useMovieModal } from '@/hooks/useMovieModal';

export default function Watchlist() {
  const { selectedMovie, open, openModal, closeModal } = useMovieModal();

  const { data: watchlist, isLoading } = useWatchlistQuery();

  const {
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
  } = useWatchlistState(watchlist || []);

  if (isLoading) return <WatchlistLoading />;
  if (!watchlist || watchlist.length === 0) return <WatchlistEmpty />;

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6 space-y-6">
      <SectionDivider label="Your Watchlist" />

      {/* Tabs + Search + Sorting */}
      <WatchlistControls
        filter={filter}
        setFilter={setFilter}
        counts={{
          all: allCount,
          watched: watchedCount,
          unwatched: unwatchedCount,
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Animated Grid */}
      <WatchlistGrid
        movies={filtered}
        filter={filter}
        searchQuery={searchQuery}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSelectMovie={openModal}
      />

      {/* The modal */}
      <MovieDetailsModal
        movie={selectedMovie}
        open={open}
        onClose={closeModal}
        mode="watchlist"
      />
    </div>
  );
}
