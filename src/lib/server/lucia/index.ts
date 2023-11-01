import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { prisma } from '$lib/server/prisma';
import { prisma as prismaAdapter } from '@lucia-auth/adapter-prisma';

export const auth = lucia({
  adapter: prismaAdapter(prisma),
  middleware: sveltekit(),
  env: dev ? 'DEV' : 'PROD',
  getUserAttributes: (userData) => {
    return {
      userId: userData.id,
      username: userData.username,
      email: userData.email,
      email_verified: userData.email_verified,
      join_date: userData.join_date,
      is_premium: userData.is_premium,
      is_admin: userData.is_admin,
      bio: userData.bio,
      signature: userData.signature,
      avatar_url: userData.avatar_url,
    };
  },
});

export type Auth = typeof auth;
