import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

import type { Movie } from '@/types/movie';

type Props = {
  movie: Movie | null;
  open: boolean;
  onClose: () => void;
};

export default function MovieDetailsModal({ movie, open, onClose }: Props) {
  if (!movie) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl rounded-2xl p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {movie.primaryTitle}
          </DialogTitle>
          <DialogDescription>
            {movie.originalTitle !== movie.primaryTitle
              ? `Original Title: ${movie.originalTitle}`
              : null}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col md:flex-row gap-6">
          {/* Movie Poster */}
          {movie.primaryImage?.url ? (
            <img
              src={movie.primaryImage.url}
              alt={movie.primaryTitle}
              width={200}
              height={300}
              className="rounded-lg shadow-md object-cover"
            />
          ) : (
            <div className="w-[200px] h-[300px] flex items-center justify-center bg-gray-200 rounded-lg">
              <span className="text-gray-500">No Image</span>
            </div>
          )}

          {/* Movie Info */}
          <div className="flex-1 space-y-3">
            <p>
              <strong>Type:</strong>{' '}
              {movie.type === 'movie' ? '🎬 Movie' : '📺 TV Series'}
            </p>
            <p>
              <strong>Start Year:</strong> {movie.startYear}
            </p>
            {movie.rating ? (
              <p>
                <strong>Rating:</strong> ⭐ {movie.rating.aggregateRating} (
                {movie.rating.voteCount.toLocaleString()} votes)
              </p>
            ) : (
              <p className="text-gray-500">No rating available</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
