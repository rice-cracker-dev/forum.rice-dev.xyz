import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { validatePassword, validateUsername } from '$lib/helper';

export const actions: Actions = {
  changePassword: async ({ locals, request }) => {
    const session = await locals.auth.validate();

    if (!session) {
      return fail(403, { message: 'Unauthorized' });
    }

    const { changePassword } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    if (!validatePassword(changePassword)) {
      return fail(400, { message: 'Password must be over 8 characters' });
    }

    try {
      await auth.updateKeyPassword('email', session.user.email, changePassword);
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Failed to save user data.' });
    }
  },

  changeUsername: async ({ locals, request }) => {
    const session = await locals.auth.validate();

    if (!session) {
      return fail(403, { message: 'Unauthorized' });
    }

    const { changeUsername } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    if (!validateUsername(changeUsername)) {
      return fail(400, {
        message:
          'Username must be between 4-30 characters and must not contain special characters.',
      });
    }

    try {
      await auth.updateUserAttributes(session.user.userId, { username: changeUsername });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Failed to save user data.' });
    }
  },
};
