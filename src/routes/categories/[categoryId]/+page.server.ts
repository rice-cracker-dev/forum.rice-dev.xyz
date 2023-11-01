import type { PageServerLoad } from './$types';
import type { Prisma } from '@prisma/client';
import { prisma } from '$lib/server/prisma';
import { error } from '@sveltejs/kit';

// Extract function for typing
const getCategory = async (
  id: string,
  { take, skip }: { take: number; skip: number } = { take: 10, skip: 0 }
) =>
  await prisma.category.findUnique({
    where: { id },
    include: {
      threads: {
        orderBy: { updated_date: 'desc' },
        include: { author: true, _count: { select: { posts: true } } },
        take,
        skip,
      },
      _count: { select: { threads: true } },
    },
  });

export const load: PageServerLoad = async ({ url, params }) => {
  const { categoryId } = params;
  const take = 20;
  let page = Number(url.searchParams.get('page'));

  if (Number.isNaN(page)) {
    page = 0;
  }

  let category: Prisma.PromiseReturnType<typeof getCategory>;

  try {
    category = await getCategory(categoryId, { take, skip: page * take });
  } catch (err) {
    console.error(err);
    throw error(404, { message: 'Not found.' });
  }

  return { category: category!, take, page };
};
