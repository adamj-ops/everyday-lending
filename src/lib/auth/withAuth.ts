/**
 * Authentication and Authorization Middleware
 *
 * Protects API routes and checks permissions.
 */

import type { NextRequest } from 'next/server';
import type { PermissionType } from './permissions';
import type { UserRoleType } from './roles';
import { NextResponse } from 'next/server';
import { hasPermission } from './permissions';
import { UserRole } from './roles';
import { getSession, getUser } from './supabase';

export type AuthenticatedRequest = NextRequest & {
  user: {
    id: string;
    email?: string;
    role: UserRoleType;
    organizationId?: string;
  };
};

/**
 * Authentication middleware options
 */
export type WithAuthOptions = {
  requiredPermissions?: PermissionType[];
  requireAnyPermission?: boolean; // If true, requires ANY of the permissions; if false (default), requires ALL
  allowedRoles?: UserRoleType[];
};

/**
 * Error responses
 */
const UNAUTHORIZED_RESPONSE = NextResponse.json(
  { error: 'Unauthorized', message: 'You must be logged in to access this resource' },
  { status: 401 },
);

const FORBIDDEN_RESPONSE = NextResponse.json(
  { error: 'Forbidden', message: 'You do not have permission to access this resource' },
  { status: 403 },
);

/**
 * Higher-order function to protect API routes with authentication and authorization
 *
 * Usage:
 * ```typescript
 * export const GET = withAuth(async (request: AuthenticatedRequest) => {
 *   const userId = request.user.id;
 *   // Your route logic here
 * }, { requiredPermissions: [Permission.LOAN_VIEW] });
 * ```
 */
export function withAuth<T extends any[]>(
  handler: (request: AuthenticatedRequest, ...args: T) => Promise<NextResponse>,
  options: WithAuthOptions = {},
) {
  return async (request: NextRequest, ...args: T): Promise<NextResponse> => {
    try {
      // Get the current session
      const session = await getSession();

      if (!session) {
        return UNAUTHORIZED_RESPONSE;
      }

      // Get the current user
      const user = await getUser();

      if (!user) {
        return UNAUTHORIZED_RESPONSE;
      }

      // Get user role from user metadata
      const roleString = (user.user_metadata?.role as UserRoleType) || UserRole.READ_ONLY;
      const role = roleString as unknown as UserRole;
      const organizationId = user.user_metadata?.organization_id as string | undefined;

      // Check role-based access
      if (options.allowedRoles && !options.allowedRoles.includes(roleString)) {
        return FORBIDDEN_RESPONSE;
      }

      // Check permission-based access
      if (options.requiredPermissions && options.requiredPermissions.length > 0) {
        const hasAccess = options.requireAnyPermission
          ? options.requiredPermissions.some(permission => hasPermission(role, permission))
          : options.requiredPermissions.every(permission => hasPermission(role, permission));

        if (!hasAccess) {
          return FORBIDDEN_RESPONSE;
        }
      }

      // Attach user information to the request
      const authenticatedRequest = request as AuthenticatedRequest;
      authenticatedRequest.user = {
        id: user.id,
        email: user.email,
        role: roleString,
        organizationId,
      };

      // Call the actual route handler
      return await handler(authenticatedRequest, ...args);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { error: 'Internal Server Error', message: 'An error occurred during authentication' },
        { status: 500 },
      );
    }
  };
}

/**
 * Middleware to check if user is authenticated (no permission checks)
 */
export function requireAuth<T extends any[]>(
  handler: (request: AuthenticatedRequest, ...args: T) => Promise<NextResponse>,
) {
  return withAuth(handler);
}

/**
 * Get the current user's role from the request
 * Helper function for use inside authenticated route handlers
 */
export async function getCurrentUserRole(): Promise<UserRoleType | null> {
  const user = await getUser();
  if (!user) {
    return null;
  }

  return (user.user_metadata?.role as UserRoleType) || UserRole.READ_ONLY;
}

/**
 * Get the current user's organization ID from the request
 * Helper function for use inside authenticated route handlers
 */
export async function getCurrentUserOrganizationId(): Promise<string | null> {
  const user = await getUser();
  if (!user) {
    return null;
  }

  return user.user_metadata?.organization_id as string | null;
}
