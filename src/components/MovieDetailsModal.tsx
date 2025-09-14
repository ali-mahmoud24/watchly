import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import { useMovieDetails } from '@/hooks/useMovieDetails';

import type { Movie } from '@/types/movie';

type Props = {
  movie: Movie | null;
  open: boolean;
  onClose: () => void;
  mode: 'search' | 'watchlist';
  onAddToWatchlist?: (movie: Movie) => void;
};

export default function MovieDetailsModal({
  movie,
  open,
  onClose,
  mode,
  onAddToWatchlist,
}: Props) {
  const { data, isLoading, isError } = useMovieDetails(movie?.id ?? '');

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={`max-w-5xl rounded-xl p-6 ${
          mode === 'watchlist'
            ? 'h-[85vh] sm:h-[90vh] overflow-y-auto'
            : ''
        }`}
      >
        <DialogHeader className="sticky top-0 bg-white z-10 pb-2">
          <DialogTitle>{movie?.primaryTitle}</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
          </div>
        )}

        {isError && (
          <p className="text-red-500 text-center py-6">
            Failed to load details. Please try again.
          </p>
        )}

        {data && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4 items-start">
            {/* Poster */}
            {data.primaryImage?.url ? (
              <img
                src={data.primaryImage.url}
                alt={data.primaryTitle}
                className="rounded-lg w-full aspect-[2/3] object-cover shadow-md"
              />
            ) : (
              <div className="w-full aspect-[2/3] bg-gray-100 flex items-center justify-center rounded-lg">
                <span className="text-gray-400 text-sm">No Image Available</span>
              </div>
            )}

            {/* Content */}
            <div className="flex flex-col space-y-6">
              {/* Basic Info */}
              <div className="space-y-1">
                <p className="text-sm text-gray-600">
                  {data.type === 'movie' ? '🎬 Movie' : '📺 TV Series'} ·{' '}
                  {data.startYear}
                </p>
                {data.rating && (
                  <p className="text-sm text-gray-700">
                    ⭐ {data.rating.aggregateRating} (
                    {data.rating.voteCount.toLocaleString()} votes)
                  </p>
                )}
              </div>

              <hr />

              {/* Plot */}
              {data.plot && (
                <p className="text-gray-800 text-sm leading-relaxed">
                  {data.plot}
                </p>
              )}

              <hr />

              {/* Cast */}
              <div className="space-y-2 text-sm">
                {data.directors?.length > 0 && (
                  <p>
                    <span className="font-medium">Director(s):</span>{' '}
                    {data.directors.map((d) => d.displayName).join(', ')}
                  </p>
                )}
                {data.stars?.length > 0 && (
                  <p>
                    <span className="font-medium">Stars:</span>{' '}
                    {data.stars.map((s) => s.displayName).join(', ')}
                  </p>
                )}
              </div>

              {/* Add Button (only in search mode) */}
              {mode === 'search' && onAddToWatchlist && (
                <>
                  <hr />
                  <Button
                    className="w-fit"
                    onClick={() => {
                      if (movie) onAddToWatchlist(movie);
                    }}
                  >
                    ➕ Add to Watchlist
                  </Button>
                </>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
