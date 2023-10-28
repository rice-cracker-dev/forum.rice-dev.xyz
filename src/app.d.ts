/* eslint-disable @typescript-eslint/ban-types */
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
import type { PrismaClient } from '@prisma/client';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      auth: import('lucia').AuthRequest;
    }
    // interface PageData {}
    // interface Platform {}
  }

  /// <reference types="lucia" />
  namespace Lucia {
    type Auth = import('$lib/server/lucia').Auth;
    type DatabaseUserAttributes = {
      username: string;
      email: string;
      email_verified: boolean;
      join_date?: Date;
      bio?: string | null;
      signature?: string | null;
      avatar_url?: string | null;
    };
    type DatabaseSessionAttributes = {};
  }

  // eslint-disable-next-line no-var
  var __prisma: PrismaClient;
}

export {};
