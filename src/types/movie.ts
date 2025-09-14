export interface Movie {
  id: string;
  type: 'movie' | 'tvSeries';
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
  watched?: boolean;
  addedAt?: number;
}

// src/types/movie.ts
export interface Person {
  id: string;
  displayName: string;
  alternativeNames?: string[];
  primaryImage?: {
    url: string;
    width: number;
    height: number;
  };
  primaryProfessions: string[];
}

export interface Country {
  code: string;
  name: string;
}

export interface Language {
  code: string;
  name: string;
}

export interface Interest {
  id: string;
  name: string;
  isSubgenre?: boolean;
}

// ✅ MovieDetails extends Movie
export interface MovieDetails extends Movie {
  runtimeSeconds?: number;
  genres: string[];
  metacritic?: {
    score: number;
    reviewCount: number;
  };
  plot?: string;
  directors: Person[];
  writers: Person[];
  stars: Person[];
  originCountries: Country[];
  spokenLanguages: Language[];
  interests: Interest[];
}
