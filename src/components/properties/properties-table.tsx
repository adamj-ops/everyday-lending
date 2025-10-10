'use client';

import type { Property } from '@/hooks/use-properties-client';
import { motion } from 'framer-motion';
import {
  Edit,
  Eye,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
} from 'lucide-react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useProperties } from '@/hooks/use-properties-client';
import { formatCurrency, formatDate } from '@/lib/formatters';

type PropertiesTableProps = {
  onPropertySelect: (property: Property) => void;
  onCreateProperty: () => void;
};

export function PropertiesTable({ onPropertySelect, onCreateProperty }: PropertiesTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: properties, isLoading, error } = useProperties(searchQuery);

  const handleRowClick = (property: Property) => {
    onPropertySelect(property);
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex h-32 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-accent"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-destructive">
            Error loading properties. Please try again.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <div className="relative max-w-xs">
                <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search properties by address or city…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">
                {properties?.length || 0}
                {' '}
                properties
              </div>
              <Button size="sm" onClick={onCreateProperty}>
                <Plus className="mr-2 h-4 w-4" />
                New Property
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Properties</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="font-semibold">Address</TableHead>
                <TableHead className="font-semibold">City, State</TableHead>
                <TableHead className="font-semibold">Property Type</TableHead>
                <TableHead className="font-semibold">ARV</TableHead>
                <TableHead className="font-semibold">Purchase Price</TableHead>
                <TableHead className="font-semibold">Created At</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties?.map((property, index) => (
                <motion.tr
                  key={property.id}
                  className="h-[44px] cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => handleRowClick(property)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell className="text-sm font-medium">
                    <div>
                      <div className="font-medium">{property.address}</div>
                      <div className="text-xs text-muted-foreground">
                        {property.zipCode}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {property.city}
                    ,
                    {' '}
                    {property.state}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="capitalize">
                      {property.propertyType?.replace('_', ' ') || 'N/A'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    {property.afterRepairValue
                      ? formatCurrency(Number.parseFloat(property.afterRepairValue))
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-sm">
                    {property.purchasePrice
                      ? formatCurrency(Number.parseFloat(property.purchasePrice))
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="text-sm">
                    {formatDate(property.createdAt)}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRowClick(property)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit Property
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>

          {properties?.length === 0 && (
            <div className="py-12 text-center">
              <div className="text-muted-foreground">
                {searchQuery ? 'No properties found matching your search.' : 'No properties found.'}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
