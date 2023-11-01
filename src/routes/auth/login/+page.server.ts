import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';
import { validateToken } from '$lib/server/captcha';
import { strIsEmpty } from '$lib/helper';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();

  if (session) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async ({ request, locals, url }) => {
    const redirectUrl = url.searchParams.get('redirect');

    const { email, password, captchaToken } = Object.fromEntries(
      await request.formData()
    ) as Record<string, string>;

    if (strIsEmpty(email) || strIsEmpty(password)) {
      return fail(400, { message: 'Must provide email and password.' });
    }

    const captchaValidated = await validateToken(captchaToken);

    if (!captchaValidated.success) {
      return fail(429, { message: 'Could not verify captcha.' });
    }

    try {
      const key = await auth.useKey('email', email, password);
      const session = await auth.createSession({ userId: key.userId, attributes: {} });

      locals.auth.setSession(session);
    } catch (err: any) {
      if (err.message === 'AUTH_INVALID_KEY_ID') {
        return fail(400, { message: 'Wrong email.' });
      }

      if (err.message === 'AUTH_INVALID_PASSWORD') {
        return fail(400, { message: 'Wrong password.' });
      }

      console.error(err);
      return fail(400, { message: 'Could not authenticate user.' });
    }

    if (redirectUrl) {
      throw redirect(302, `/${redirectUrl.slice(1)}`);
    }

    throw redirect(302, '/');
  },
};
