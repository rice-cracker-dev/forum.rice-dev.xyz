import type { LayoutServerLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: LayoutServerLoad = async ({ locals }) => {
  const session = await locals.auth.validate();

  if (!session) {
    throw error(403, { message: 'Unauthorized.' });
  }

  return { user: session.user };
};
