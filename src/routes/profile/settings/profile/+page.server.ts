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
    const bio = formData.get('bio') as string;
    const signature = formData.get('signature') as string;

    try {
      await prisma.user.update({
        where: { id: session.user.userId },
        data: { bio: JSON.parse(bio), signature: JSON.parse(signature) },
      });
    } catch (err) {
      console.error(err);
      return fail(400, { success: false, message: 'Failed to save user data.' });
    }

    return { success: true, message: 'Successfully applied settings' };
  },
};
