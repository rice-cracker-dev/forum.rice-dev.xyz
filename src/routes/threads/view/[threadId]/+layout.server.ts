import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async ({ params }) => {
  const { threadId } = params;

  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      category: true,
      posts: {
        include: { author: { include: { _count: { select: { reputations: true } } } } },
        orderBy: { publish_date: 'asc' },
      },
    },
  });

  if (!thread) {
    throw error(404, { message: 'Not found' });
  }

  return { thread };
};
