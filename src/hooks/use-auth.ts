/**
 * Authentication Hooks
 *
 * Hooks for checking user permissions and roles on the client side.
 */

'use client';

import type { User } from '@supabase/supabase-js';
import type { PermissionType } from '@/lib/auth/permissions';
import type { UserRoleType } from '@/lib/auth/roles';
import { useEffect, useState } from 'react';
import { hasPermission } from '@/lib/auth/permissions';
import { UserRole } from '@/lib/auth/roles';
import { createClient } from '@/lib/auth/supabase';

/**
 * Hook to get current authenticated user
 *
 * @example
 * ```tsx
 * const { user, isLoading } = useAuth();
 * ```
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const supabase = createClient();

    const getUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error getting user:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { user, isLoading };
}

/**
 * Hook to check if current user has specific permissions
 *
 * @example
 * ```tsx
 * const { hasAccess, isLoading } = usePermission([Permission.LOAN_CREATE]);
 * ```
 */
export function usePermission(requiredPermissions: PermissionType[], requireAnyPermission = false) {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkPermissions = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setHasAccess(false);
          setIsLoading(false);
          return;
        }

        const role = (user.user_metadata?.role as UserRoleType) || UserRole.READ_ONLY;

        const access = requireAnyPermission
          ? requiredPermissions.some(permission => hasPermission(role as UserRole, permission))
          : requiredPermissions.every(permission => hasPermission(role as UserRole, permission));

        setHasAccess(access);
      } catch (error) {
        console.error('Error checking permissions:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPermissions();
  }, [requiredPermissions, requireAnyPermission]);

  return { hasAccess, isLoading };
}

/**
 * Hook to get current user's role
 *
 * @example
 * ```tsx
 * const { role, isLoading } = useUserRole();
 * ```
 */
export function useUserRole() {
  const [role, setRole] = useState<UserRoleType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUserRole = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          setRole(null);
          setIsLoading(false);
          return;
        }

        setRole((user.user_metadata?.role as UserRoleType) || UserRole.READ_ONLY);
      } catch (error) {
        console.error('Error getting user role:', error);
        setRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUserRole();
  }, []);

  return { role, isLoading };
}
