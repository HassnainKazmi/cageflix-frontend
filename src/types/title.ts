export interface Title {
  tconst: string;
  titleType: string;
  primaryTitle: string;
  originalTitle: string;
  isAdult: boolean;
  cast: string[];
  startYear: string | null;
  endYear: string | null;
  runtimeMinutes: string | null;
  genres: string[];
  averageRating: number | null;
  numVotes: number | null;
  description?: string | null;
}

export type TitleParams = {
  skip: number;
  limit: number;
  titleType?: string | string[];
};

export type TitleType =
  | "tvSeries"
  | "tvEpisode"
  | "tvMiniSeries"
  | "tvSpecial"
  | "tvMovie"
  | "movie";
