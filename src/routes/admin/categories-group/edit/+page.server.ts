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

    const formData = await request.formData();

    const id = formData.get('id') as string;
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const order = Number(formData.get('order'));
    const categories = formData.getAll('categories') as string[];

    if (strIsEmpty(id) || strIsEmpty(name) || strIsEmpty(description)) {
      return fail(400, { message: 'Must provide id, name and description.' });
    }

    if (Number.isNaN(order)) {
      return fail(400, { message: 'Order is not a valid number.' });
    }

    try {
      await prisma.categoryGroup.update({
        where: { id },
        data: { name, description, order, categories: { set: categories.map((o) => ({ id: o })) } },
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Failed to edit category group.' });
    }
  },
};
