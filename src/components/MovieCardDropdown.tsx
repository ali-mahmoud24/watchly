import type { Movie } from '../types/movie';

type Props = {
  movie: Movie;
};

export default function MovieCardDropdown({ movie }: Props) {
  const hasImage = !!movie.primaryImage?.url;
  const hasRating = !!movie.rating?.aggregateRating;
  const hasYear = !!movie.startYear;
  const hasType = !!movie.type;

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
          {movie.primaryTitle ?? 'Untitled'}
        </h3>

        {movie.originalTitle && movie.originalTitle !== movie.primaryTitle && (
          <p className="text-xs text-gray-500 truncate">
            {movie.originalTitle}
          </p>
        )}

        <p className="text-xs text-gray-400 mt-0.5">
          {hasYear ? movie.startYear : 'N/A'} •{' '}
          {hasRating
            ? `${movie.rating!.aggregateRating.toFixed(1)} ⭐`
            : 'No rating'}
          {hasType && ` • ${movie.type === 'movie' ? 'Movie' : 'TV Series'}`}
        </p>
      </div>
    </div>
  );
}
