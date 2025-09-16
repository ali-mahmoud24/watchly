import MovieMeta from "./MovieMeta";

import type { Movie } from "@/types/movie";

type Props = {
  movie: Movie;
};

export default function MovieCardDropdown({ movie }: Props) {
  const hasImage = !!movie.primaryImage?.url;

  return (
    <div className="flex items-center gap-2 p-2 min-h-[56px]">
      {/* Thumbnail */}
      {hasImage ? (
        <img
          src={movie.primaryImage!.url}
          alt={movie.primaryTitle}
          className="w-12 h-16 object-cover rounded-md flex-shrink-0"
        />
      ) : (
        <div className="w-12 h-16 bg-gray-200 flex items-center justify-center text-gray-500 text-xs rounded-md flex-shrink-0">
          🎬
        </div>
      )}

      {/* Info */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium truncate">
          {movie.primaryTitle ?? "Untitled"}
        </h3>

        {movie.originalTitle && movie.originalTitle !== movie.primaryTitle && (
          <p className="text-xs text-gray-500 truncate">
            {movie.originalTitle}
          </p>
        )}

        <MovieMeta movie={movie} />
      </div>
    </div>
  );
}
