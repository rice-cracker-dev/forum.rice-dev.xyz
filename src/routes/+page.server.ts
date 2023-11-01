import type { PageServerLoad } from './$types';
import type { Prisma } from '@prisma/client';
import { prisma } from '$lib/server/prisma';

// Extract function for typing
const getCategoryGroups = async () =>
  await prisma.categoryGroup.findMany({
    include: {
      categories: {
        include: {
          last_thread: { include: { author: true } },
          _count: { select: { threads: true } },
        },

        orderBy: { order: 'asc' },
      },
    },

    orderBy: { order: 'asc' },
  });

export const load: PageServerLoad = async () => {
  const categoryGroups: Prisma.PromiseReturnType<typeof getCategoryGroups> =
    await getCategoryGroups();

  return { categoryGroups };
};
