export interface Title {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  startYear: string | null;
  endYear: string | null;
  runtimeMinutes: string | null;
  genres: string[];
  averageRating: number | null;
  numVotes: number | null;
  description?: string | null;
}
