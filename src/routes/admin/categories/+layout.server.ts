import type { Category } from '@prisma/client';
import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async () => {
  const categories: Category[] = await prisma.category.findMany({ orderBy: { order: 'asc' } });

  return { categories };
};
