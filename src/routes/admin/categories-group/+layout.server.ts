import type { LayoutServerLoad } from './$types';
import { prisma } from '$lib/server/prisma';

export const load: LayoutServerLoad = async () => {
  const [categories, categoryGroups] = await Promise.all([
    prisma.category.findMany({ orderBy: { order: 'asc' } }),
    prisma.categoryGroup.findMany({ include: { categories: true }, orderBy: { order: 'asc' } }),
  ]);

  return { categories, categoryGroups };
};
