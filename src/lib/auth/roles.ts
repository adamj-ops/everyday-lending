/**
 * User Roles and Role-Based Access Control
 *
 * Defines the role hierarchy and role-specific capabilities.
 */

export enum UserRole {
  ADMIN = 'admin',
  LENDER = 'lender',
  SERVICER = 'servicer',
  BORROWER = 'borrower',
  INSPECTOR = 'inspector',
  READ_ONLY = 'read_only',
}

export type UserRoleType = `${UserRole}`;

/**
 * Role hierarchy (higher roles inherit permissions from lower roles)
 */
export const ROLE_HIERARCHY: Record<UserRoleType, number> = {
  [UserRole.ADMIN]: 100,
  [UserRole.SERVICER]: 80,
  [UserRole.LENDER]: 60,
  [UserRole.INSPECTOR]: 40,
  [UserRole.BORROWER]: 20,
  [UserRole.READ_ONLY]: 10,
};

/**
 * Check if a role has higher or equal access than another role
 */
export function hasRoleAccess(userRole: UserRoleType, requiredRole: UserRoleType): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Get the list of roles a user can assign (only roles below their own level)
 */
export function getAssignableRoles(userRole: UserRoleType): UserRoleType[] {
  const userLevel = ROLE_HIERARCHY[userRole];
  return Object.entries(ROLE_HIERARCHY)
    .filter(([_, level]) => level < userLevel)
    .map(([role]) => role as UserRoleType);
}
