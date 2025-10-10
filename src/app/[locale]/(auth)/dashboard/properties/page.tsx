'use client';

import type { Property } from '@/hooks/use-properties-client';
import { motion } from 'framer-motion';
import { Building2, Plus } from 'lucide-react';
import { useState } from 'react';
import { CreatePropertyDialog } from '@/components/properties/create-property-dialog';
import { PropertiesTable } from '@/components/properties/properties-table';
import { PropertyDrawer } from '@/components/properties/property-drawer';
import { Button } from '@/components/ui/button';

export default function PropertiesPage() {
  const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const handlePropertySelect = (property: Property) => {
    setSelectedPropertyId(property.id);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedPropertyId(null);
  };

  const handleCreateProperty = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Building2 className="h-6 w-6 text-accent" />
            <h1 className="text-2xl font-semibold text-foreground">Properties</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your real estate portfolio and property details
          </p>
        </div>
        <Button className="bg-accent hover:bg-accent/90" onClick={handleCreateProperty}>
          <Plus className="mr-2 h-4 w-4" />
          New Property
        </Button>
      </div>

      {/* Properties Table */}
      <PropertiesTable
        onPropertySelect={handlePropertySelect}
        onCreateProperty={handleCreateProperty}
      />

      {/* Property Drawer */}
      <PropertyDrawer
        propertyId={selectedPropertyId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />

      {/* Create Property Dialog */}
      <CreatePropertyDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </motion.div>
  );
}
