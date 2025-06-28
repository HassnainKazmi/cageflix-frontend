import { useState, useEffect } from "react";
import { fetchFuzzySearch } from "../api/search";
import type { SearchResults } from "../types/search";

interface UseDebouncedSearchResult {
  results: SearchResults[];
  loading: boolean;
  error: string | null;
}

const useDebouncedSearch = (
  search: string,
  debounceMs: number = 300
): UseDebouncedSearchResult => {
  const [results, setResults] = useState<SearchResults[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let ignore = false;

    if (!search) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }
    setLoading(true);

    const doSearch = async () => {
      try {
        const results = await fetchFuzzySearch(search);
        if (!ignore) {
          setResults(results);
          setError(null);
        }
      } catch (err) {
        if (!ignore) setError(err instanceof Error ? err.message : String(err));
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      doSearch();
    }, debounceMs);

    return () => {
      ignore = true;
      clearTimeout(timer);
    };
  }, [search, debounceMs]);

  return { results, loading, error };
};

export default useDebouncedSearch;
