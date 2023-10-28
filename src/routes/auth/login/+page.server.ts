import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();

  if (session) {
    throw redirect(302, '/');
  }
};

export const actions: Actions = {
  default: async ({ request, locals, url }) => {
    const redirectUrl = url.searchParams.get('redirect');

    const { email, password } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    try {
      const key = await auth.useKey('email', email, password);
      const session = await auth.createSession({ userId: key.userId, attributes: {} });

      locals.auth.setSession(session);
    } catch (err) {
      console.error(err);
      throw error(400, { message: 'Could not authenticate user.' });
    }

    if (redirectUrl) {
      throw redirect(302, `/${redirectUrl.slice(1)}`)
    }

    throw redirect(302, '/');
  },
};
