import WatchlistItem from "./WatchlistItem";
import SectionDivider from "./SectionDivider";

import { useWatchlistQuery } from "@/hooks/useWatchlist";

export default function Watchlist() {
  const { data: watchlist, isLoading } = useWatchlistQuery();
  if (isLoading) return <p>Loading watchlist...</p>;
  if (!watchlist || watchlist.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 mt-6">
        <p className="text-gray-500 text-center">
          No movies in your watchlist yet.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 mt-6">
      <SectionDivider label="Your Watchlist" />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
        {watchlist.map((movie) => (
          <WatchlistItem key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
