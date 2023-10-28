import type { Actions, PageServerLoad } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { handleLoginRedirect } from '$lib/utils';

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();

  if (!session) {
    throw redirect(302, handleLoginRedirect(url));
  }
};

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const { title, content } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    const session = await locals.auth.validate();

    if (!session) {
      throw error(403, { message: 'Not authorized' });
    }

    let thread;

    try {
      thread = await prisma.thread.create({ data: { title, author_id: session.user.userId } });
      await prisma.post.create({
        data: { content, author_id: session.user.userId, thread_id: thread.id, is_first: true },
      });
    } catch (err) {
      console.error(err);
      throw error(400, { message: 'Failed to create post.' });
    }

    throw redirect(302, `/threads/view/${thread.id}`);
  },
};
