// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog';
// import { useMovieDetails } from '@/hooks/useMovieDetails';

// import { Loader2 } from 'lucide-react';

// import type { Movie } from '@/types/movie';

// type Props = {
//   movie: Movie | null;
//   onClose: () => void;
// };

// export default function MovieDetailsModal({ movie, onClose }: Props) {
//   const { data, isLoading, isError } = useMovieDetails(movie?.id ?? '');

//   return (
//     <Dialog open={!!movie} onOpenChange={onClose}>
//       <DialogContent className="max-w-3xl max-h-[90vh] flex flex-col">
//         {/* Fixed header */}
//         <DialogHeader className="shrink-0 border-b pb-2">
//           <DialogTitle>{movie?.primaryTitle}</DialogTitle>
//         </DialogHeader>

//         {/* Scrollable body */}
//         <div className="overflow-y-auto flex-1 pr-2">
//           {isLoading && (
//             <div className="flex items-center justify-center py-12">
//               <Loader2 className="w-6 h-6 animate-spin text-gray-500" />
//             </div>
//           )}

//           {isError && (
//             <p className="text-red-500 text-center py-6">
//               Failed to load details. Please try again.
//             </p>
//           )}

//           {data && (
//             <div className="space-y-6">
//               {/* Poster + Info */}
//               <div className="flex gap-6">
//                 {data.primaryImage?.url && (
//                   <img
//                     src={data.primaryImage.url}
//                     alt={data.primaryTitle}
//                     className="rounded-lg aspect-[2/3] object-cover max-w-[200px] flex-shrink-0"
//                   />
//                 )}

//                 <div className="flex-1 space-y-2">
//                   <p className="text-sm text-gray-600">
//                     {data.type === 'movie' ? 'Movie' : 'TV Series'} ·{' '}
//                     {data.startYear}
//                   </p>
//                   {data.rating && (
//                     <p className="text-sm text-gray-700">
//                       ⭐ {data.rating.aggregateRating} (
//                       {data.rating.voteCount.toLocaleString()} votes)
//                     </p>
//                   )}
//                   {data.plot && (
//                     <p className="text-gray-800 text-sm leading-relaxed">
//                       {data.plot}
//                     </p>
//                   )}
//                 </div>
//               </div>

//               {/* Directors / Writers / Stars */}
//               <div className="space-y-2">
//                 {data.directors?.length > 0 && (
//                   <p>
//                     <span className="font-medium">Director(s):</span>{' '}
//                     {data.directors.map((d) => d.displayName).join(', ')}
//                   </p>
//                 )}
//                 {data.writers?.length > 0 && (
//                   <p>
//                     <span className="font-medium">Writer(s):</span>{' '}
//                     {data.writers.map((w) => w.displayName).join(', ')}
//                   </p>
//                 )}
//                 {data.stars?.length > 0 && (
//                   <p>
//                     <span className="font-medium">Stars:</span>{' '}
//                     {data.stars.map((s) => s.displayName).join(', ')}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }
