import type { User } from 'lucia';
import { describe, it, expect } from 'vitest';
import { validateCategoryPermission } from '$lib/helper';

const normalUser: User = {
  avatar_url: undefined,
  bio: undefined,
  join_date: undefined,
  signature: undefined,
  userId: '',
  username: '',
  email: '',
  email_verified: false,
  reputations_count: 0,
  is_admin: false,
  is_premium: false,
};

const premiumUser: User = { ...normalUser, is_premium: true };
const adminUser: User = { ...normalUser, is_admin: true };

describe('permission test', () => {
  it('normal user in admin category', () => {
    expect(validateCategoryPermission(normalUser, true, true)).toBe(false);
  });
  it('premium user in premium category', () => {
    expect(validateCategoryPermission(premiumUser, false, true)).toBe(true);
  });
  it('premium user in admin category', () => {
    expect(validateCategoryPermission(premiumUser, true, false)).toBe(false);
  });
  it('admin user in admin category', () => {
    expect(validateCategoryPermission(adminUser, true, false)).toBe(true);
  });
  it('admin user in premium category', () => {
    expect(validateCategoryPermission(adminUser, false, true)).toBe(true);
  });
});
