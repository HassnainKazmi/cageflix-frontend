import { useEffect, useState } from "react";
import { fetchTitles } from "../api/titles";
import type { Title } from "../types/title";

interface UseTitlesOptions {
  skip?: number;
  limit?: number;
  titleType?: string | string[];
  enabled?: boolean;
}

interface UseTitlesResult {
  titles: Title[];
  loading: boolean;
  error: string | null;
}

const useTitles = ({
  skip = 0,
  limit = 24,
  titleType,
  enabled = true,
}: UseTitlesOptions = {}): UseTitlesResult => {
  const [titles, setTitles] = useState<Title[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    let ignore = false;

    const load = async () => {
      setLoading(true);
      try {
        const titles: Title[] = await fetchTitles(skip, limit, titleType);
        if (!ignore) {
          setTitles(titles);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };
    load();

    return () => {
      ignore = true;
    };
  }, [skip, limit, titleType, enabled]);

  return { titles, loading, error };
};

export default useTitles;
