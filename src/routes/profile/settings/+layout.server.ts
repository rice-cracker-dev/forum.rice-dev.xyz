import type { LayoutServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/utils';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();

  if (!session) {
    throw redirect(302, handleLoginRedirect(url));
  }

  const userData = await prisma.user.findUnique({ where: { id: session.user.userId } });

  if (!userData) {
    throw error(400, { message: 'Cannot fetch account data.' });
  }

  return { user: session.user, userData };
};
