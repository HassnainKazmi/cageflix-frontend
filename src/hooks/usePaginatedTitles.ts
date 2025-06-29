import { useState, useEffect, useRef, useCallback } from "react";
import { fetchTitles } from "../api/titles";
import type { Title } from "../types/title";

interface UsePaginatedTitlesOptions {
  titleType?: string | string[];
  pageSize?: number;
  enabled?: boolean;
}

interface UsePaginatedTitlesResult {
  titles: Title[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  loadMore: () => void;
  reset: () => void;
}

const usePaginatedTitles = ({
  titleType,
  pageSize = 24,
  enabled = true,
}: UsePaginatedTitlesOptions = {}): UsePaginatedTitlesResult => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const prevTitleType = useRef<string | string[] | undefined>(titleType);

  useEffect(() => {
    if (prevTitleType.current !== titleType) {
      setTitles([]);
      setPage(0);
      setHasMore(true);
      prevTitleType.current = titleType;
    }
  }, [titleType]);

  const loadMore = useCallback(async () => {
    if (!enabled || loading || !hasMore) return;
    setLoading(true);
    try {
      const skip = page * pageSize;
      const result = await fetchTitles(skip, pageSize, titleType);
      setTitles((prev) => [...prev, ...result]);
      setHasMore(result.length === pageSize);
      setError(null);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, titleType, enabled, loading, hasMore]);

  const reset = () => {
    setTitles([]);
    setPage(0);
    setHasMore(true);
    setError(null);
  };

  useEffect(() => {
    if (!enabled) return;
    if (titles.length === 0 && hasMore) {
      loadMore();
    }
  }, [titleType, enabled]);

  return { titles, loading, error, hasMore, loadMore, reset };
};

export default usePaginatedTitles;
