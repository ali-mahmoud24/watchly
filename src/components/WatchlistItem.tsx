import { Button } from "@/components/ui/button";
import { useRemoveFromWatchlist, useToggleWatched } from "@/hooks/useWatchlist";

import type { Movie } from "@/types/movie";

type Props = { movie: Movie };

export default function WatchlistItem({ movie }: Props) {
  const removeMutation = useRemoveFromWatchlist();
  const toggleMutation = useToggleWatched();

  return (
    <div className="bg-white rounded-xl shadow p-3 flex flex-col h-full">
      {/* Image */}
      {movie.primaryImage?.url ? (
        <img
          src={movie.primaryImage.url}
          alt={movie.primaryTitle}
          className="rounded-lg w-full aspect-[2/3] object-cover mb-3"
        />
      ) : (
        <div className="w-full h-64 bg-gray-200 flex items-center justify-center rounded-lg mb-3">
          <span className="text-gray-500 text-sm">No Image</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-lg line-clamp-2 mb-1">
          {movie.primaryTitle}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-1 mb-1">
          {movie.originalTitle !== movie.primaryTitle
            ? movie.originalTitle
            : ""}
        </p>
        <p className="text-sm text-gray-600 mt-1 mb-1">
          {movie.type === "movie" ? "🎬 Movie" : "📺 TV Series"} ·{" "}
          {movie.startYear}
        </p>
        {movie.rating && (
          <p className="text-sm text-yellow-600 mt-1 mb-2">
            ⭐ {movie.rating.aggregateRating} (
            {movie.rating.voteCount.toLocaleString()} votes)
          </p>
        )}

        {/* Buttons at the bottom with proper spacing */}
        <div className="mt-auto flex gap-2">
          <Button
            size="sm"
            variant={movie.watched ? "secondary" : "default"}
            onClick={() => toggleMutation.mutate(movie.id)}
          >
            {movie.watched ? "Watched ✅" : "Mark as Watched"}
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => removeMutation.mutate(movie.id)}
          >
            Delete ❌
          </Button>
        </div>
      </div>
    </div>
  );
}
