/**
 * Table State Hook
 *
 * Manages table state (sorting, filtering, pagination, column visibility).
 */

'use client';

import type {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { useCallback, useEffect, useState } from 'react';

type UseTableStateOptions = {
  /** Unique table ID for localStorage persistence */
  tableId: string;

  /** Enable state persistence */
  persist?: boolean;
};

export function useTableState({ tableId, persist = true }: UseTableStateOptions) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState('');

  // Load persisted state on mount
  useEffect(() => {
    if (!persist || typeof window === 'undefined') {
      return;
    }

    try {
      const stored = localStorage.getItem(`table-state-${tableId}`);
      if (stored) {
        const state = JSON.parse(stored);
        if (state.sorting) {
          setSorting(state.sorting);
        }
        if (state.columnFilters) {
          setColumnFilters(state.columnFilters);
        }
        if (state.columnVisibility) {
          setColumnVisibility(state.columnVisibility);
        }
      }
    } catch (error) {
      console.error('Error loading table state:', error);
    }
  }, [tableId, persist]);

  // Save state to localStorage when it changes
  useEffect(() => {
    if (!persist || typeof window === 'undefined') {
      return;
    }

    try {
      const state = {
        sorting,
        columnFilters,
        columnVisibility,
      };
      localStorage.setItem(`table-state-${tableId}`, JSON.stringify(state));
    } catch (error) {
      console.error('Error saving table state:', error);
    }
  }, [tableId, persist, sorting, columnFilters, columnVisibility]);

  const resetState = useCallback(() => {
    setSorting([]);
    setColumnFilters([]);
    setColumnVisibility({});
    setRowSelection({});
    setGlobalFilter('');

    if (persist && typeof window !== 'undefined') {
      localStorage.removeItem(`table-state-${tableId}`);
    }
  }, [tableId, persist]);

  return {
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    columnVisibility,
    setColumnVisibility,
    rowSelection,
    setRowSelection,
    globalFilter,
    setGlobalFilter,
    resetState,
  };
}
