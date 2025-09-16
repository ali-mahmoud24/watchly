import type { Movie } from "../../types/movie";

type Props = {
  movie: Movie;
};

export default function MovieMeta({ movie }: Props) {
  const hasYear = !!movie.startYear;
  const hasRating = !!movie.rating?.aggregateRating;
  const hasType = !!movie.type;

  return (
    <p className="text-xs text-gray-400 mt-0.5 flex flex-wrap items-center gap-1">
      {/* Year */}
      <span>{hasYear ? movie.startYear : "N/A"}</span>

      {/* Dot separator */}
      <span>•</span>

      {/* Rating */}
      {hasRating ? (
        <span>{movie.rating!.aggregateRating.toFixed(1)} ⭐</span>
      ) : (
        <span>No rating</span>
      )}

      {/* Type */}
      {hasType && (
        <>
          <span>•</span>
          <span>{movie.type === "movie" ? "Movie" : "TV Series"}</span>
        </>
      )}
    </p>
  );
}
