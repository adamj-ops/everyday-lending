/**
 * Smart Search Hook
 *
 * Provides debounced search with fuzzy matching.
 */

'use client';

import { useCallback, useEffect, useState } from 'react';

type UseSmartSearchOptions<T> = {
  /** Items to search */
  items: T[];

  /** Search function */
  searchFn: (items: T[], query: string) => T[];

  /** Debounce delay in ms */
  debounceMs?: number;

  /** Minimum query length before searching */
  minQueryLength?: number;
};

export function useSmartSearch<T>({
  items,
  searchFn,
  debounceMs = 300,
  minQueryLength = 0,
}: UseSmartSearchOptions<T>) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce query
  useEffect(() => {
    setIsSearching(true);
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
      setIsSearching(false);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Get filtered results
  const results = debouncedQuery.length >= minQueryLength
    ? searchFn(items, debouncedQuery)
    : items;

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
  }, []);

  return {
    query,
    debouncedQuery,
    isSearching,
    results,
    setQuery: handleQueryChange,
    clearQuery,
  };
}

/**
 * Hook for async search (e.g., API calls)
 */
export function useAsyncSearch<T>({
  searchFn,
  debounceMs = 300,
  minQueryLength = 2,
}: {
  searchFn: (query: string) => Promise<T[]>;
  debounceMs?: number;
  minQueryLength?: number;
}) {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // Debounce query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.length < minQueryLength) {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const performSearch = async () => {
      setIsSearching(true);
      setError(null);

      try {
        const searchResults = await searchFn(debouncedQuery);
        setResults(searchResults);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Search failed'));
        setResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    performSearch();
  }, [debouncedQuery, minQueryLength, searchFn]);

  const handleQueryChange = useCallback((newQuery: string) => {
    setQuery(newQuery);
  }, []);

  const clearQuery = useCallback(() => {
    setQuery('');
    setDebouncedQuery('');
    setResults([]);
  }, []);

  return {
    query,
    debouncedQuery,
    isSearching,
    results,
    error,
    setQuery: handleQueryChange,
    clearQuery,
  };
}
