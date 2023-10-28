import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
  const { userId } = params;

  const userInfo = await prisma.user.findUnique({
    where: { id: userId },
    include: { reputations: true, threads: true, posts: { include: { thread: true } } },
  });

  if (!userInfo) {
    throw error(404, { message: 'User not found.' });
  }

  return { userInfo };
};
