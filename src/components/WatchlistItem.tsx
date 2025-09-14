import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

import { Trash2, Star, Film, Tv, Calendar } from 'lucide-react';

import { useRemoveFromWatchlist, useToggleWatched } from '@/hooks/useWatchlist';

import { formatDistanceToNow } from 'date-fns';

import type { Movie } from '@/types/movie';

type Props = {
  movie: Movie;
  onViewDetails?: (id: string) => void; // ✅ new prop
};
export default function WatchlistItem({ movie }: Props) {
  const removeMutation = useRemoveFromWatchlist();
  const toggleMutation = useToggleWatched();

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col h-full">
      {/* Image */}
      {movie.primaryImage?.url ? (
        <img
          src={movie.primaryImage.url}
          alt={movie.primaryTitle}
          className="rounded-lg w-full aspect-[2/3] object-cover mb-4"
        />
      ) : (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg mb-4">
          <span className="text-gray-400 text-sm">No Image Available</span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 flex flex-col">
        <h3 className="font-semibold text-lg text-gray-900 line-clamp-2 mb-1">
          {movie.primaryTitle}
        </h3>
        {movie.originalTitle !== movie.primaryTitle && (
          <p className="text-sm text-gray-500 line-clamp-1 mb-1">
            {movie.originalTitle}
          </p>
        )}
        <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
          {movie.type === 'movie' ? (
            <Film className="w-4 h-4 text-gray-500" />
          ) : (
            <Tv className="w-4 h-4 text-gray-500" />
          )}
          {movie.type === 'movie' ? 'Movie' : 'TV Series'} · {movie.startYear}
        </p>

        {movie.rating && (
          <p className="text-sm text-gray-700 flex items-center gap-1 mb-2">
            <Star className="w-4 h-4 text-yellow-500" />
            {movie.rating.aggregateRating} (
            {movie.rating.voteCount.toLocaleString()} ratings)
          </p>
        )}

        {/* Added At */}
        {movie.addedAt && (
          <p className="text-xs text-gray-500 flex items-center gap-1 mb-3">
            <Calendar className="w-3 h-3" />
            Added{' '}
            {formatDistanceToNow(new Date(movie.addedAt), { addSuffix: true })}
          </p>
        )}

        {/* Actions */}
        <div
          className="mt-auto flex items-center justify-between gap-2 pt-3 border-t border-gray-100"
          onClick={(e) => e.stopPropagation()} // ✅ prevent modal on action click
        >
          {/* Switch with label */}
          <label className="flex items-center gap-2 cursor-pointer">
            <Switch
              checked={movie.watched}
              onCheckedChange={() => toggleMutation.mutate(movie.id)}
            />
            <span className="text-sm text-gray-700">
              {movie.watched ? 'Watched' : 'Not Watched'}
            </span>
          </label>

          {/* Delete button */}
          <Button
            size="sm"
            variant="destructive"
            onClick={() => removeMutation.mutate(movie.id)}
            className="flex items-center gap-1 cursor-pointer"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
