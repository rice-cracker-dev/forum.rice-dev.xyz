import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const session = await locals.auth.validate();

    if (!session) {
      return fail(403, { message: 'Unauthorized' });
    }

    const formData = await request.formData();
    const ids = formData.getAll('ids') as string[];

    if (!ids || ids.length === 0) {
      return fail(400, { message: 'Must provide id.' });
    }

    try {
      await prisma.category.deleteMany({ where: { id: { in: ids } } });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Failed to delete category.' });
    }
  },
};
