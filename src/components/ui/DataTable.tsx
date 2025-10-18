/**
 * Enhanced Data Table Component
 *
 * Advanced data table with sorting, filtering, pagination, and bulk actions.
 * Built on @tanstack/react-table.
 */

'use client';

import type {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronsUpDown, ChevronUp, Download, Settings } from 'lucide-react';
// Re-export useState from React for use in DataTable
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
  enableSelection?: boolean;
  enableSorting?: boolean;
  enableFiltering?: boolean;
  enablePagination?: boolean;
  enableColumnVisibility?: boolean;
  enableExport?: boolean;
  onExport?: () => void;
  className?: string;
  emptyMessage?: string;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
  enableSelection = false,
  enableSorting = true,
  enableFiltering = true,
  enablePagination = true,
  enableColumnVisibility = true,
  enableExport = false,
  onExport,
  className,
  emptyMessage = 'No results found.',
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState('');

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection: enableSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
  });

  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className={cn('w-full space-y-4', className)}>
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        {/* Search */}
        {enableFiltering && (
          <input
            type="text"
            placeholder="Search..."
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
            className="h-10 w-64 rounded-md border px-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        )}

        <div className="flex gap-2">
          {/* Export Button */}
          {enableExport && onExport && (
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          )}

          {/* Column Visibility */}
          {enableColumnVisibility && (
            <ColumnVisibilityDropdown table={table} />
          )}
        </div>
      </div>

      {/* Selection Count */}
      {enableSelection && selectedCount > 0 && (
        <div className="rounded-md bg-blue-50 px-4 py-2 text-sm text-blue-900">
          {selectedCount}
          {' '}
          row
          {selectedCount > 1 ? 's' : ''}
          {' '}
          selected
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className={cn(
                        'px-4 py-3 text-left text-sm font-semibold text-gray-900',
                        header.column.getCanSort() && 'cursor-pointer select-none hover:bg-gray-100',
                      )}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center gap-2">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <div className="flex-shrink-0">
                            {header.column.getIsSorted() === 'asc'
                              ? <ChevronUp className="h-4 w-4" />
                              : header.column.getIsSorted() === 'desc'
                                ? <ChevronDown className="h-4 w-4" />
                                : <ChevronsUpDown className="h-4 w-4 opacity-30" />}
                          </div>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y bg-white">
              {table.getRowModel().rows.length === 0
                ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="py-12 text-center text-sm text-gray-500"
                      >
                        {emptyMessage}
                      </td>
                    </tr>
                  )
                : (
                    table.getRowModel().rows.map(row => (
                      <tr
                        key={row.id}
                        className={cn(
                          'transition-colors hover:bg-gray-50',
                          onRowClick && 'cursor-pointer',
                          row.getIsSelected() && 'bg-blue-50',
                        )}
                        onClick={() => onRowClick && onRowClick(row.original)}
                      >
                        {row.getVisibleCells().map(cell => (
                          <td
                            key={cell.id}
                            className="px-4 py-3 text-sm text-gray-700"
                          >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {enablePagination && data.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing
            {' '}
            {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
            {' '}
            to
            {' '}
            {Math.min(
              (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
              data.length,
            )}
            {' '}
            of
            {' '}
            {data.length}
            {' '}
            results
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Column Visibility Dropdown Component
 */
function ColumnVisibilityDropdown({ table }: { table: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Settings className="mr-2 h-4 w-4" />
        Columns
      </Button>

      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-48 rounded-md border bg-white p-2 shadow-lg">
          <div className="max-h-64 overflow-y-auto">
            {table
              .getAllColumns()
              .filter((column: any) => column.getCanHide())
              .map((column: any) => (
                <label
                  key={column.id}
                  className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 hover:bg-gray-100"
                >
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={(e) => {
                      column.toggleVisibility(e.target.checked);
                    }}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <span className="text-sm">{column.id}</span>
                </label>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
