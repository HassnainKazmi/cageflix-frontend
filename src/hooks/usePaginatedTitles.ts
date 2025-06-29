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
  initialLoading: boolean;
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
  const [initialLoading, setInitialLoading] = useState<boolean>(true);

  const prevTitleType = useRef<string | string[] | undefined>(titleType);

  useEffect(() => {
    if (prevTitleType.current !== titleType) {
      setTitles([]);
      setPage(0);
      setHasMore(true);
      setInitialLoading(true);
      prevTitleType.current = titleType;
    }
  }, [titleType]);

  const loadMore = useCallback(async () => {
    if (!enabled || loading || !hasMore) return;
    setLoading(true);
    try {
      const skip = page * pageSize;
      const result = await fetchTitles(skip, pageSize, titleType);
      setTitles((prev) => {
        const merged = [...prev, ...result];
        const map = new Map<string, Title>();
        merged.forEach((t) => {
          if (!map.has(t.tconst)) {
            map.set(t.tconst, t);
          }
        });
        return Array.from(map.values());
      });
      setHasMore(result.length === pageSize);
      setError(null);
      setPage((prev) => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  }, [page, pageSize, titleType, enabled, loading, hasMore]);

  const reset = () => {
    setTitles([]);
    setPage(0);
    setHasMore(true);
    setError(null);
    setInitialLoading(true);
  };

  useEffect(() => {
    if (!enabled) return;
    if (titles.length === 0 && hasMore) {
      loadMore();
    }
  }, [titleType, enabled]);

  return { titles, loading, error, hasMore, loadMore, reset, initialLoading };
};

export default usePaginatedTitles;
