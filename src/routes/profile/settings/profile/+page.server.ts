import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const session = await locals.auth.validate();

    if (!session) {
      return fail(403, { message: 'Unauthorized' });
    }

    const { bio, signature } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    try {
      await prisma.user.update({ where: { id: session.user.userId }, data: { bio, signature } });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Failed to save user data.' });
    }
  },
};
