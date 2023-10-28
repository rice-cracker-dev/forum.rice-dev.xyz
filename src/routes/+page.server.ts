import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async () => {
  const threads = await prisma.thread.findMany({
    orderBy: { publish_date: 'desc' },
    include: { author: true },
  });

  return { threads };
};
