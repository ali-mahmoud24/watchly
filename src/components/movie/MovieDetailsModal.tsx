import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { BookmarkPlus, Loader2, X } from 'lucide-react';

import { useMovieDetails } from '@/hooks/movie/useMovieDetails';
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
      <DialogContent className="w-[90vw] sm:w-full !max-w-[700px] rounded-xl p-0 sm:p-0">
        <div className="relative bg-white rounded-xl overflow-hidden">
          {/* Close Button */}
          <DialogClose asChild>
            <button
              aria-label="Close"
              className="absolute right-3 top-3 sm:right-4 sm:top-4 z-40 rounded-md p-1 hover:bg-gray-100 focus:outline-none cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </DialogClose>

          <div
            className={`flex flex-col ${
              mode === 'watchlist' ? 'max-h-[85vh]' : 'max-h-[75vh]'
            } sm:max-h-[90vh]`}
          >
            {/* Header */}
            <DialogHeader className="sticky top-0 bg-white z-30 px-4 py-3 sm:px-6 sm:py-4 border-b">
              <DialogTitle className="text-base sm:text-lg font-semibold truncate">
                {movie?.primaryTitle || 'Untitled'}
              </DialogTitle>
            </DialogHeader>

            {/* Scrollable Content */}
            <div className="overflow-y-auto px-4 py-4 sm:px-6 sm:py-6">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-4">
                  {/* Poster */}
                  <div className="flex justify-center sm:justify-start">
                    {data.primaryImage?.url ? (
                      <img
                        src={data.primaryImage.url}
                        alt={data.primaryTitle}
                        className="rounded-lg shadow-md object-cover 
                     max-h-[250px] sm:max-h-[400px] lg:max-h-[500px] 
                     w-auto"
                      />
                    ) : (
                      <div
                        className="bg-gray-100 flex items-center justify-center 
                     rounded-lg text-center text-gray-400 text-sm
                     max-h-[250px] sm:max-h-[400px] lg:max-h-[500px] 
                     w-[160px] sm:w-[240px] lg:w-[300px]"
                      >
                        No Image Available
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col space-y-4 sm:space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-1 text-sm sm:text-base">
                      <p className="text-gray-600">
                        {data.type === 'movie' ? '🎬 Movie' : '📺 TV Series'} ·{' '}
                        {data.startYear || 'N/A'}
                      </p>
                      <p className="text-gray-700">
                        {data.rating
                          ? `⭐ ${
                              data.rating.aggregateRating
                            } (${data.rating.voteCount.toLocaleString()} votes)`
                          : '⭐ Rating: N/A'}
                      </p>
                    </div>

                    <hr />

                    {/* Plot */}
                    <p className="text-gray-800 text-sm sm:text-base leading-relaxed">
                      {data.plot || 'No plot available.'}
                    </p>

                    <hr />

                    {/* Cast */}
                    <div className="space-y-2 text-sm sm:text-base">
                      <p>
                        <span className="font-medium">Director(s):</span>{' '}
                        {data.directors?.length
                          ? data.directors.map((d) => d.displayName).join(', ')
                          : 'N/A'}
                      </p>
                      <p>
                        <span className="font-medium">Stars:</span>{' '}
                        {data.stars?.length
                          ? data.stars.map((s) => s.displayName).join(', ')
                          : 'N/A'}
                      </p>
                    </div>

                    {/* Add Button (search mode only) */}
                    {mode === 'search' && onAddToWatchlist && (
                      <>
                        <hr />
                        <Button
                          className="w-fit cursor-pointer"
                          onClick={() => {
                            if (movie) onAddToWatchlist(movie);
                          }}
                        >
                          <BookmarkPlus className="w-4 h-4" />
                          Add to Watchlist
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
