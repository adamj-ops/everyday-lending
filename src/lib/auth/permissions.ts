/**
 * Permission System
 *
 * Defines granular permissions and role-based permission checks.
 */

import type { UserRole } from './roles';
import { UserRole as Role } from './roles';

/**
 * Available permissions in the system
 */
export enum Permission {
  // Loan permissions
  LOAN_VIEW = 'loan:view',
  LOAN_CREATE = 'loan:create',
  LOAN_UPDATE = 'loan:update',
  LOAN_DELETE = 'loan:delete',
  LOAN_APPROVE = 'loan:approve',

  // Borrower permissions
  BORROWER_VIEW = 'borrower:view',
  BORROWER_CREATE = 'borrower:create',
  BORROWER_UPDATE = 'borrower:update',
  BORROWER_DELETE = 'borrower:delete',

  // Lender permissions
  LENDER_VIEW = 'lender:view',
  LENDER_CREATE = 'lender:create',
  LENDER_UPDATE = 'lender:update',
  LENDER_DELETE = 'lender:delete',

  // Property permissions
  PROPERTY_VIEW = 'property:view',
  PROPERTY_CREATE = 'property:create',
  PROPERTY_UPDATE = 'property:update',
  PROPERTY_DELETE = 'property:delete',

  // Payment permissions
  PAYMENT_VIEW = 'payment:view',
  PAYMENT_CREATE = 'payment:create',
  PAYMENT_UPDATE = 'payment:update',
  PAYMENT_DELETE = 'payment:delete',
  PAYMENT_PROCESS = 'payment:process',

  // Draw permissions
  DRAW_VIEW = 'draw:view',
  DRAW_CREATE = 'draw:create',
  DRAW_UPDATE = 'draw:update',
  DRAW_DELETE = 'draw:delete',
  DRAW_APPROVE = 'draw:approve',
  DRAW_INSPECT = 'draw:inspect',
  DRAW_DISBURSE = 'draw:disburse',

  // Analytics permissions
  ANALYTICS_VIEW = 'analytics:view',
  ANALYTICS_EXPORT = 'analytics:export',

  // User management permissions
  USER_VIEW = 'user:view',
  USER_CREATE = 'user:create',
  USER_UPDATE = 'user:update',
  USER_DELETE = 'user:delete',
  USER_ASSIGN_ROLE = 'user:assign_role',

  // System administration
  SYSTEM_SETTINGS = 'system:settings',
  SYSTEM_AUDIT_LOG = 'system:audit_log',
}

export type PermissionType = `${Permission}`;

/**
 * Role to permissions mapping
 */
export const ROLE_PERMISSIONS: Record<UserRole, PermissionType[]> = {
  [Role.ADMIN]: [
    // Admins have all permissions
    ...Object.values(Permission),
  ],

  [Role.SERVICER]: [
    // Loan permissions
    Permission.LOAN_VIEW,
    Permission.LOAN_CREATE,
    Permission.LOAN_UPDATE,
    Permission.LOAN_APPROVE,

    // Borrower permissions
    Permission.BORROWER_VIEW,
    Permission.BORROWER_CREATE,
    Permission.BORROWER_UPDATE,

    // Lender permissions
    Permission.LENDER_VIEW,

    // Property permissions
    Permission.PROPERTY_VIEW,
    Permission.PROPERTY_CREATE,
    Permission.PROPERTY_UPDATE,

    // Payment permissions
    Permission.PAYMENT_VIEW,
    Permission.PAYMENT_CREATE,
    Permission.PAYMENT_UPDATE,
    Permission.PAYMENT_PROCESS,

    // Draw permissions
    Permission.DRAW_VIEW,
    Permission.DRAW_CREATE,
    Permission.DRAW_UPDATE,
    Permission.DRAW_APPROVE,
    Permission.DRAW_DISBURSE,

    // Analytics permissions
    Permission.ANALYTICS_VIEW,
    Permission.ANALYTICS_EXPORT,

    // Limited user management
    Permission.USER_VIEW,
  ],

  [Role.LENDER]: [
    // View own loans and related data
    Permission.LOAN_VIEW,
    Permission.BORROWER_VIEW,
    Permission.PROPERTY_VIEW,
    Permission.PAYMENT_VIEW,
    Permission.DRAW_VIEW,
    Permission.DRAW_APPROVE,

    // View own analytics
    Permission.ANALYTICS_VIEW,
  ],

  [Role.INSPECTOR]: [
    // Draw-specific permissions
    Permission.DRAW_VIEW,
    Permission.DRAW_INSPECT,
    Permission.DRAW_UPDATE,

    // View related data for inspection
    Permission.LOAN_VIEW,
    Permission.PROPERTY_VIEW,
    Permission.BORROWER_VIEW,
  ],

  [Role.BORROWER]: [
    // View own data
    Permission.LOAN_VIEW,
    Permission.PAYMENT_VIEW,
    Permission.DRAW_VIEW,
    Permission.DRAW_CREATE,
    Permission.PROPERTY_VIEW,
  ],

  [Role.READ_ONLY]: [
    // Read-only access to basic data
    Permission.LOAN_VIEW,
    Permission.BORROWER_VIEW,
    Permission.PROPERTY_VIEW,
    Permission.ANALYTICS_VIEW,
  ],
};

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: UserRole, permission: PermissionType): boolean {
  return ROLE_PERMISSIONS[role].includes(permission);
}

/**
 * Check if a role has any of the specified permissions
 */
export function hasAnyPermission(role: UserRole, permissions: PermissionType[]): boolean {
  return permissions.some(permission => hasPermission(role, permission));
}

/**
 * Check if a role has all of the specified permissions
 */
export function hasAllPermissions(role: UserRole, permissions: PermissionType[]): boolean {
  return permissions.every(permission => hasPermission(role, permission));
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: UserRole): PermissionType[] {
  return ROLE_PERMISSIONS[role];
}
