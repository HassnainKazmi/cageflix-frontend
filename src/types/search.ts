export interface SearchResults {
  tconst: string;
  primaryTitle: string;
  titleType?: string | string[];
  genres: string[];
  startYear?: string | null;
  cast: string[];
  averageRating?: number | null;
  numVotes?: number | null;
  score?: number;
  matchField: string;
  matchValue: string;
}
