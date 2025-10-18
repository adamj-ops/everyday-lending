/**
 * Command Palette Search Logic
 *
 * Implements fuzzy search for entities across the application.
 */

import type { IFuseOptions } from 'fuse.js';
import Fuse from 'fuse.js';

export type SearchableEntity = {
  id: number;
  type: 'loan' | 'borrower' | 'lender' | 'property';
  title: string;
  subtitle?: string;
  metadata?: string;
  url: string;
};

/**
 * Fuse.js configuration for fuzzy search
 */
const fuseOptions: IFuseOptions<SearchableEntity> = {
  keys: [
    { name: 'title', weight: 3 },
    { name: 'subtitle', weight: 2 },
    { name: 'metadata', weight: 1 },
  ],
  threshold: 0.3,
  includeScore: true,
  minMatchCharLength: 2,
};

/**
 * Search across entities with fuzzy matching
 */
export function searchEntities(entities: SearchableEntity[], query: string): SearchableEntity[] {
  if (!query || query.trim() === '') {
    return entities.slice(0, 10); // Return first 10 items when no query
  }

  const fuse = new Fuse(entities, fuseOptions);
  const results = fuse.search(query);

  return results.map(result => result.item).slice(0, 10);
}

/**
 * Get recent items from localStorage
 */
export function getRecentItems(): SearchableEntity[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem('command-palette-recent');
    if (!stored) {
      return [];
    }

    const items = JSON.parse(stored) as SearchableEntity[];
    return items.slice(0, 5); // Return max 5 recent items
  } catch (error) {
    console.error('Error loading recent items:', error);
    return [];
  }
}

/**
 * Save item to recent items
 */
export function saveRecentItem(item: SearchableEntity): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const existing = getRecentItems();

    // Remove duplicates
    const filtered = existing.filter(e => !(e.type === item.type && e.id === item.id));

    // Add new item to the front
    const updated = [item, ...filtered].slice(0, 10); // Keep max 10 recent items

    localStorage.setItem('command-palette-recent', JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recent item:', error);
  }
}

/**
 * Clear recent items
 */
export function clearRecentItems(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem('command-palette-recent');
  } catch (error) {
    console.error('Error clearing recent items:', error);
  }
}

/**
 * Transform data to searchable entities
 */
export function transformLoansToSearchable(loans: any[]): SearchableEntity[] {
  return loans.map(loan => ({
    id: loan.id,
    type: 'loan' as const,
    title: `Loan #${loan.loanNumber}`,
    subtitle: loan.borrower ? `${loan.borrower.firstName} ${loan.borrower.lastName}` : undefined,
    metadata: `${loan.loanAmount} • ${loan.status}`,
    url: `/en/dashboard/loans/${loan.id}`,
  }));
}

export function transformBorrowersToSearchable(borrowers: any[]): SearchableEntity[] {
  return borrowers.map(borrower => ({
    id: borrower.id,
    type: 'borrower' as const,
    title: `${borrower.firstName} ${borrower.lastName}`,
    subtitle: borrower.email,
    metadata: `${borrower.activeLoansCount} active loans`,
    url: `/en/dashboard/borrowers/${borrower.id}`,
  }));
}

export function transformLendersToSearchable(lenders: any[]): SearchableEntity[] {
  return lenders.map(lender => ({
    id: lender.id,
    type: 'lender' as const,
    title: lender.name,
    subtitle: lender.email,
    metadata: `${lender.activeParticipationsCount} participations`,
    url: `/en/dashboard/lenders/${lender.id}`,
  }));
}

export function transformPropertiesToSearchable(properties: any[]): SearchableEntity[] {
  return properties.map(property => ({
    id: property.id,
    type: 'property' as const,
    title: property.address,
    subtitle: `${property.city}, ${property.state} ${property.zipCode}`,
    metadata: property.propertyType || 'Property',
    url: `/en/dashboard/properties/${property.id}`,
  }));
}
