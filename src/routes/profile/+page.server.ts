import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/utils';

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();

  if (!session) {
    throw redirect(302, handleLoginRedirect(url));
  }

  throw redirect(302, `/users/${session.user.userId}`);
};
