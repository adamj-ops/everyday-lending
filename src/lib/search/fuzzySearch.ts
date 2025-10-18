/**
 * Fuzzy Search Utilities
 *
 * Client-side fuzzy search implementation.
 */

import type { IFuseOptions } from 'fuse.js';
import Fuse from 'fuse.js';

/**
 * Generic fuzzy search function
 */
export function fuzzySearch<T>(
  items: T[],
  query: string,
  keys: string[],
  options?: Partial<IFuseOptions<T>>,
): T[] {
  if (!query || query.trim() === '') {
    return items;
  }

  const fuse = new Fuse(items, {
    keys,
    threshold: 0.3,
    includeScore: true,
    minMatchCharLength: 2,
    ...options,
  });

  const results = fuse.search(query);
  return results.map(result => result.item);
}

/**
 * Search borrowers by name, email, or phone
 */
export function searchBorrowers(borrowers: any[], query: string) {
  return fuzzySearch(borrowers, query, [
    'firstName',
    'lastName',
    'email',
    'phone',
  ]);
}

/**
 * Search lenders by name, email, or contact person
 */
export function searchLenders(lenders: any[], query: string) {
  return fuzzySearch(lenders, query, [
    'name',
    'email',
    'contactPerson',
  ]);
}

/**
 * Search properties by address, city, or state
 */
export function searchProperties(properties: any[], query: string) {
  return fuzzySearch(properties, query, [
    'address',
    'city',
    'state',
    'zipCode',
  ]);
}

/**
 * Search loans by loan number, borrower name, or property address
 */
export function searchLoans(loans: any[], query: string) {
  return fuzzySearch(loans, query, [
    'loanNumber',
    'borrower.firstName',
    'borrower.lastName',
    'property.address',
  ]);
}

/**
 * Highlight matching text in search results
 */
export function highlightMatch(text: string, query: string): { text: string; isMatch: boolean }[] {
  if (!query) {
    return [{ text, isMatch: false }];
  }

  const regex = new RegExp(`(${query})`, 'gi');
  const parts = text.split(regex);

  return parts.map(part => ({
    text: part,
    isMatch: regex.test(part),
  }));
}
