import type { PageServerLoad, Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { strIsEmail, validatePassword, validateUsername } from '$lib/helper';
import { validateToken } from '$lib/server/captcha';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();

  if (session) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async ({ request }) => {
    const { username, password, email, captchaToken } = Object.fromEntries(
      await request.formData()
    ) as Record<string, string>;

    // validation
    if (!validateUsername(username) || !strIsEmail(email) || !validatePassword(password)) {
      return fail(400, { message: 'Invalid data.' });
    }

    const captchaValidated = await validateToken(captchaToken);

    if (!captchaValidated.success) {
      return fail(429, { message: 'Could not verify captcha.' });
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
          email: email.toLowerCase(),
          email_verified: false,
          is_premium: false,
          is_admin: false,
          reputations_count: 0,
          bio: null,
          avatar_url: null,
          signature: null,
        },
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'User already exists' });
    }

    throw redirect(302, '/auth/login');
  },
};
