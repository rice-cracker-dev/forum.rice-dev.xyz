/* eslint-disable no-useless-escape */
import type { JSONContent } from '@tiptap/core';
import type { User } from 'lucia';

export const strIsEmpty = (s?: string | null) => !s || /^\s*$/.test(s);

export const strIsEmail = (s: string) =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    s
  );

export const validateUsername = (s: string) => /^[a-zA-Z0-9]{4,30}$/.test(s);
export const validatePassword = (s: string) => s.length >= 8;

export const validateCategoryPermission = (user?: User, isAdmin = false, isPremium = false) => {
  return !((isAdmin && !user?.is_admin) || (isPremium && !user?.is_premium && !user?.is_admin));
};

export const jsonToContent = (s: any) => s as JSONContent;
