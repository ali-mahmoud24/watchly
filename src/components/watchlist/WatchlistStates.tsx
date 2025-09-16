export function WatchlistEmpty() {
  return (
    <div className="max-w-2xl mx-auto px-4 mt-6">
      <p className="text-gray-500 text-center">
        No movies in your watchlist yet.
      </p>
    </div>
  );
}

export function WatchlistLoading() {
  return (
    <div className="max-w-2xl mx-auto px-4 mt-6">
      <p className="text-gray-500 text-center">Loading watchlist...</p>
    </div>
  );
}
