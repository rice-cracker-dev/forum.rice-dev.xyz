import type { PageServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ params }) => {
  const { threadId } = params;

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: { posts: { include: { author: { include: { reputations: true } } } } },
  });

  if (!thread) {
    throw error(404, { message: 'Not found' });
  }

  return { thread }
};
