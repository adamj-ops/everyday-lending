/**
 * Command Palette Hook
 *
 * Manages command palette state and keyboard listeners.
 */

'use client';

import type { SearchableEntity } from '@/lib/commandPalette/search';
import { useEffect, useState } from 'react';
import {
  getRecentItems,
  saveRecentItem,

  searchEntities,
  transformBorrowersToSearchable,
  transformLendersToSearchable,
  transformLoansToSearchable,
  transformPropertiesToSearchable,
} from '@/lib/commandPalette/search';
import { useBorrowers } from './use-borrowers-client';
import { useLenders } from './use-lenders-client';
import { useLoans } from './use-loans-client';
import { useProperties } from './use-properties-client';

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [recentItems, setRecentItems] = useState<SearchableEntity[]>([]);

  // Fetch all entities for search
  const { data: loans = [] } = useLoans();
  const { data: borrowers = [] } = useBorrowers();
  const { data: lenders = [] } = useLenders();
  const { data: properties = [] } = useProperties();

  // Transform to searchable entities
  const searchableEntities: SearchableEntity[] = [
    ...transformLoansToSearchable(loans),
    ...transformBorrowersToSearchable(borrowers),
    ...transformLendersToSearchable(lenders),
    ...transformPropertiesToSearchable(properties),
  ];

  // Keyboard listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Load recent items on mount
  useEffect(() => {
    const items = getRecentItems();
    setRecentItems(items);
  }, []);

  // Get filtered results based on search query
  const results = searchEntities(searchableEntities, searchQuery);

  const handleSelect = (item: SearchableEntity) => {
    saveRecentItem(item);
    setRecentItems(getRecentItems());
    setIsOpen(false);
    setSearchQuery('');
  };

  return {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    results,
    recentItems,
    handleSelect,
  };
}
