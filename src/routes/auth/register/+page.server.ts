import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { strIsEmail } from '$lib/helper';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();

  if (session) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const { username, password, email } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    // validation
    if (!/^[a-zA-Z0-9]{4,30}$/.test(username) || !strIsEmail(email) || password.length < 8) {
      return fail(400, { message: 'Invalid data.' });
    }

    try {
      await auth.createUser({
        key: {
          providerId: 'email',
          providerUserId: email.toLowerCase(),
          password, // hashed automatically
        },
        attributes: {
          username,
          bio: null,
          email: email.toLowerCase(),
          email_verified: false,
          avatar_url: null,
          signature: null,
        },
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Could not register user ' });
    }

    throw redirect(302, '/auth/login');
  },
};
