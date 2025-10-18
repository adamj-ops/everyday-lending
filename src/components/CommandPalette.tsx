/**
 * Command Palette Component
 *
 * Global command palette accessible via Cmd+K / Ctrl+K.
 * Provides quick navigation and actions across the application.
 */

'use client';

import type { SearchableEntity } from '@/lib/commandPalette/search';
import { Command } from 'cmdk';
import {
  Building2,
  DollarSign,
  FileText,
  Home,
  Plus,
  TrendingUp,
  User,
  Users,
  Wallet,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useCommandPalette } from '@/hooks/useCommandPalette';
import { useCommandActions } from '@/lib/commandPalette/actions';
import './CommandPalette.css';

const SECTION_ICONS = {
  navigation: <Home className="h-4 w-4" />,
  create: <Plus className="h-4 w-4" />,
  search: <FileText className="h-4 w-4" />,
  settings: <Home className="h-4 w-4" />,
};

const ENTITY_ICONS = {
  loan: <DollarSign className="h-4 w-4" />,
  borrower: <User className="h-4 w-4" />,
  lender: <Users className="h-4 w-4" />,
  property: <Building2 className="h-4 w-4" />,
  analytics: <TrendingUp className="h-4 w-4" />,
  payment: <Wallet className="h-4 w-4" />,
};

export function CommandPalette() {
  const router = useRouter();
  const {
    isOpen,
    setIsOpen,
    searchQuery,
    setSearchQuery,
    results,
    recentItems,
    handleSelect,
  } = useCommandPalette();

  const actions = useCommandActions();

  const handleEntitySelect = useCallback(
    (entity: SearchableEntity) => {
      handleSelect(entity);
      router.push(entity.url);
    },
    [handleSelect, router],
  );

  const handleClose = useCallback(() => {
    setIsOpen(false);
    setSearchQuery('');
  }, [setIsOpen, setSearchQuery]);

  if (!isOpen) {
    return null;
  }

  return (
    <Command.Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      label="Command palette"
      className="fixed top-[15vh] left-1/2 z-50 w-full max-w-2xl -translate-x-1/2"
    >
      <div className="rounded-lg border bg-white shadow-2xl">
        <div className="flex items-center border-b px-3">
          <FileText className="mr-2 h-4 w-4 text-gray-500" />
          <Command.Input
            placeholder="Search or type a command..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>

        <Command.List className="max-h-[400px] overflow-y-auto p-2">
          <Command.Empty className="py-6 text-center text-sm text-gray-500">
            No results found.
          </Command.Empty>

          {/* Recent Items */}
          {!searchQuery && recentItems.length > 0 && (
            <Command.Group heading="Recent">
              {recentItems.map(item => (
                <Command.Item
                  key={`${item.type}-${item.id}`}
                  onSelect={() => {
                    handleEntitySelect(item);
                    handleClose();
                  }}
                  className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                >
                  {ENTITY_ICONS[item.type]}
                  <div className="flex-1">
                    <div className="font-medium">{item.title}</div>
                    {item.subtitle && (
                      <div className="text-xs text-gray-500">{item.subtitle}</div>
                    )}
                  </div>
                  {item.metadata && (
                    <div className="text-xs text-gray-400">{item.metadata}</div>
                  )}
                </Command.Item>
              ))}
            </Command.Group>
          )}

          {/* Navigation Actions */}
          {!searchQuery && (
            <Command.Group heading="Navigation">
              {actions
                .filter(action => action.section === 'navigation')
                .map(action => (
                  <Command.Item
                    key={action.id}
                    onSelect={() => {
                      action.perform();
                      handleClose();
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    {SECTION_ICONS[action.section]}
                    <div className="flex-1">
                      <div className="font-medium">{action.title}</div>
                      {action.description && (
                        <div className="text-xs text-gray-500">{action.description}</div>
                      )}
                    </div>
                    {action.shortcut && action.shortcut.length > 0 && (
                      <div className="flex gap-1">
                        {action.shortcut.map(key => (
                          <kbd
                            key={`${action.id}-shortcut-${key}`}
                            className="rounded bg-gray-100 px-2 py-1 font-mono text-xs"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </Command.Item>
                ))}
            </Command.Group>
          )}

          {/* Create Actions */}
          {!searchQuery && (
            <Command.Group heading="Create">
              {actions
                .filter(action => action.section === 'create')
                .map(action => (
                  <Command.Item
                    key={action.id}
                    onSelect={() => {
                      action.perform();
                      handleClose();
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                  >
                    {SECTION_ICONS[action.section]}
                    <div className="flex-1">
                      <div className="font-medium">{action.title}</div>
                      {action.description && (
                        <div className="text-xs text-gray-500">{action.description}</div>
                      )}
                    </div>
                    {action.shortcut && action.shortcut.length > 0 && (
                      <div className="flex gap-1">
                        {action.shortcut.map(key => (
                          <kbd
                            key={`${action.id}-shortcut-${key}`}
                            className="rounded bg-gray-100 px-2 py-1 font-mono text-xs"
                          >
                            {key}
                          </kbd>
                        ))}
                      </div>
                    )}
                  </Command.Item>
                ))}
            </Command.Group>
          )}

          {/* Search Results */}
          {searchQuery && results.length > 0 && (
            <>
              {/* Group by entity type */}
              {(['loan', 'borrower', 'lender', 'property'] as const).map((type) => {
                const typeResults = results.filter(r => r.type === type);
                if (typeResults.length === 0) {
                  return null;
                }

                return (
                  <Command.Group
                    key={type}
                    heading={`${type.charAt(0).toUpperCase() + type.slice(1)}s`}
                  >
                    {typeResults.map(item => (
                      <Command.Item
                        key={`${item.type}-${item.id}`}
                        onSelect={() => {
                          handleEntitySelect(item);
                          handleClose();
                        }}
                        className="flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        {ENTITY_ICONS[item.type]}
                        <div className="flex-1">
                          <div className="font-medium">{item.title}</div>
                          {item.subtitle && (
                            <div className="text-xs text-gray-500">{item.subtitle}</div>
                          )}
                        </div>
                        {item.metadata && (
                          <div className="text-xs text-gray-400">{item.metadata}</div>
                        )}
                      </Command.Item>
                    ))}
                  </Command.Group>
                );
              })}
            </>
          )}
        </Command.List>

        <div className="border-t px-3 py-2 text-xs text-gray-500">
          <span>Press </span>
          <kbd className="rounded bg-gray-100 px-2 py-1 font-mono">↑</kbd>
          <span> </span>
          <kbd className="rounded bg-gray-100 px-2 py-1 font-mono">↓</kbd>
          <span> to navigate, </span>
          <kbd className="rounded bg-gray-100 px-2 py-1 font-mono">Enter</kbd>
          <span> to select, </span>
          <kbd className="rounded bg-gray-100 px-2 py-1 font-mono">Esc</kbd>
          <span> to close</span>
        </div>
      </div>
    </Command.Dialog>
  );
}
