import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { strIsEmpty } from '$lib/helper';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const session = await locals.auth.validate();

    if (!session) {
      return fail(403, { message: 'Unauthorized' });
    }

    const { name, description } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    if (strIsEmpty(name) || strIsEmpty(description)) {
      return fail(400, { message: 'Must provide name and description.' });
    }

    try {
      await prisma.category.create({ data: { name, description } });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Failed to create category.' });
    }
  },
};
