'use client';

import { motion } from 'framer-motion';
import {
  Bell,
  ChevronDown,
  Command,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/hooks/use-auth';
import { createClient } from '@/lib/supabase-client';

type TopbarProps = {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showMenuButton?: boolean;
  locale?: string;
};

export function Topbar({
  title = 'Everyday Lending',
  subtitle,
  onMenuClick,
  showMenuButton = false,
  locale = 'en',
}: TopbarProps) {
  const [searchValue, setSearchValue] = useState('');
  const { user } = useAuth();
  const router = useRouter();
  const supabase = createClient();

  async function handleSignOut() {
    await supabase.auth.signOut();
    router.push(`/${locale}/sign-in`);
    router.refresh();
  }

  return (
    <motion.header
      className="flex h-14 items-center justify-between border-b border-border bg-background/80 px-6 shadow-sm backdrop-blur-md"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Left Section */}
      <div className="flex items-center space-x-4">
        {showMenuButton && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="h-8 w-8 p-0 hover:bg-muted/50"
          >
            <Menu className="h-4 w-4" />
          </Button>
        )}

        <div>
          <h1 className="text-lg font-semibold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </div>

      {/* Center Section - Search */}
      <div className="mx-8 max-w-md flex-1">
        <div className="relative">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search loans, borrowers, properties..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            className="h-9 border-border/50 bg-background/50 pr-4 pl-10 transition-all duration-200 focus:border-border focus:bg-background"
          />
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <kbd className="pointer-events-none inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100 select-none">
              <Command className="h-3 w-3" />
              K
            </kbd>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center space-x-2">
        {/* Notifications */}
        <Button
          variant="ghost"
          size="sm"
          className="relative h-9 w-9 p-0 hover:bg-muted/50"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-accent">
            <span className="text-accent-foreground text-[8px] font-medium">3</span>
          </span>
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-9 px-3 hover:bg-muted/50 focus:bg-muted/50"
            >
              <div className="flex items-center space-x-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent">
                  <User className="text-accent-foreground h-4 w-4" />
                </div>
                <div className="hidden text-left sm:block">
                  <div className="text-sm font-medium text-foreground">{user?.email || 'User'}</div>
                  <div className="text-xs text-muted-foreground">Member</div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </motion.header>
  );
}
