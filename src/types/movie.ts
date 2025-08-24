export interface Movie {
  id: string;
  type: "movie" | "tvSeries";
  primaryTitle: string;
  originalTitle: string;
  primaryImage?: {
    url: string;
    width: number;
    height: number;
  };
  startYear: number;
  rating?: {
    aggregateRating: number;
    voteCount: number;
  };
}