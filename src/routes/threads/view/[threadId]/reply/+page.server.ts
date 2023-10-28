import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/utils';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();

  if (!session) {
    throw redirect(302, handleLoginRedirect(url));
  }
};

export const actions: Actions = {
  default: async ({ locals, request, params }) => {
    const { threadId } = params;
    const { content } = Object.fromEntries(await request.formData()) as Record<string, string>;

    if (!content || content.length < 10) {
      return fail(400, { message: 'Must be at least 10 characters.' });
    }

    const session = await locals.auth.validate();

    if (!session) {
      return fail(403, { message: 'Not authorized.' });
    }

    try {
      await prisma.post.create({
        data: { content, thread_id: threadId, author_id: session.user.userId },
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Unexpected error.' });
    }

    throw redirect(302, `/threads/view/${threadId}`);
  },
};
