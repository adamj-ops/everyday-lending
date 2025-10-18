/**
 * Table Filter Utilities
 *
 * Custom filter functions for advanced table filtering.
 */

import type { Row } from '@tanstack/react-table';

/**
 * Filter function for numeric range
 */
export function numberRangeFilter<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: [number, number],
): boolean {
  const value = row.getValue(columnId) as number;
  const [min, max] = filterValue;
  return value >= min && value <= max;
}

/**
 * Filter function for date range
 */
export function dateRangeFilter<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: [Date, Date],
): boolean {
  const value = row.getValue(columnId) as Date;
  const [start, end] = filterValue;
  const date = new Date(value);
  return date >= start && date <= end;
}

/**
 * Filter function for multiple select
 */
export function multiSelectFilter<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: string[],
): boolean {
  if (!filterValue || filterValue.length === 0) {
    return true;
  }
  const value = row.getValue(columnId) as string;
  return filterValue.includes(value);
}

/**
 * Filter function for contains (case-insensitive)
 */
export function containsFilter<TData>(
  row: Row<TData>,
  columnId: string,
  filterValue: string,
): boolean {
  const value = row.getValue(columnId) as string;
  return value.toLowerCase().includes(filterValue.toLowerCase());
}

/**
 * Export table data to CSV
 */
export function exportToCSV<TData>(data: TData[], filename: string) {
  if (data.length === 0) {
    return;
  }

  // Get headers from first row
  const headers = Object.keys(data[0] as object);

  // Create CSV content
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers
        .map((header) => {
          const value = (row as any)[header];
          // Escape commas and quotes
          const escaped = String(value).replace(/"/g, '""');
          return `"${escaped}"`;
        })
        .join(','),
    ),
  ];

  const csvContent = csvRows.join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export table data to JSON
 */
export function exportToJSON<TData>(data: TData[], filename: string) {
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
