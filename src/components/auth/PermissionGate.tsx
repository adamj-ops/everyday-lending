/**
 * Permission Gate Component
 *
 * Conditionally renders children based on user permissions and roles.
 */

'use client';

import type { PermissionType } from '@/lib/auth/permissions';
import type { UserRoleType } from '@/lib/auth/roles';
import { useEffect, useState } from 'react';
import { hasPermission } from '@/lib/auth/permissions';
import { UserRole } from '@/lib/auth/roles';
import { createClient } from '@/lib/auth/supabase';

// Empty array constant to avoid re-renders
const EMPTY_PERMISSIONS: PermissionType[] = [];

type PermissionGateProps = {
  /** Children to render if user has permission */
  children: React.ReactNode;

  /** Required permissions (user must have ALL by default) */
  requiredPermissions?: PermissionType[];

  /** If true, user must have ANY of the required permissions instead of ALL */
  requireAnyPermission?: boolean;

  /** Allowed roles (alternative to permission checking) */
  allowedRoles?: UserRoleType[];

  /** Content to show when user doesn't have permission */
  fallback?: React.ReactNode;

  /** If true, renders nothing when unauthorized instead of fallback */
  hideWhenUnauthorized?: boolean;
};

/**
 * Component that conditionally renders children based on user permissions
 *
 * @example
 * ```tsx
 * <PermissionGate requiredPermissions={[Permission.LOAN_CREATE]}>
 *   <CreateLoanButton />
 * </PermissionGate>
 * ```
 *
 * @example
 * ```tsx
 * <PermissionGate allowedRoles={[UserRole.ADMIN, UserRole.SERVICER]}>
 *   <AdminPanel />
 * </PermissionGate>
 * ```
 */
export function PermissionGate({
  children,
  requiredPermissions = EMPTY_PERMISSIONS,
  requireAnyPermission = false,
  allowedRoles,
  fallback = null,
  hideWhenUnauthorized = false,
}: PermissionGateProps) {
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

        const roleString = (user.user_metadata?.role as UserRoleType) || UserRole.READ_ONLY;
        const role = roleString as unknown as UserRole;

        // Check role-based access
        if (allowedRoles) {
          setHasAccess(allowedRoles.includes(roleString));
          setIsLoading(false);
          return;
        }

        // Check permission-based access
        if (requiredPermissions.length > 0) {
          const access = requireAnyPermission
            ? requiredPermissions.some(permission => hasPermission(role, permission))
            : requiredPermissions.every(permission => hasPermission(role, permission));

          setHasAccess(access);
        } else {
          // If no permissions specified, grant access (user is authenticated)
          setHasAccess(true);
        }
      } catch (error) {
        console.error('Error checking permissions:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkPermissions();
  }, [requiredPermissions, requireAnyPermission, allowedRoles]);

  // Show nothing while loading
  if (isLoading) {
    return null;
  }

  // Show children if user has access
  if (hasAccess) {
    return <>{children}</>;
  }

  // Show fallback or nothing when unauthorized
  if (hideWhenUnauthorized) {
    return null;
  }

  return <>{fallback}</>;
}
