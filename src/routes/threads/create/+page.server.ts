import type { Thread } from '@prisma/client';
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
  default: async ({ locals, request }) => {
    const { title, content } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;

    const session = await locals.auth.validate();

    if (!session) {
      return fail(403, { message: 'Not authorized' });
    }

    if (title.length < 10) {
      return fail(400, { message: 'Title must be at least 10 characters.' });
    }

    if (content.length < 10) {
      return fail(400, { message: 'Content must be at least 10 characters.' });
    }

    let thread: Thread;

    try {
      thread = await prisma.$transaction(async (trx) => {
        const thread = await trx.thread.create({
          data: { title, author_id: session.user.userId, category: 0 },
        });
        await trx.post.create({
          data: { content, author_id: session.user.userId, thread_id: thread.id, is_first: true },
        });

        return thread;
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Failed to create post.' });
    }

    throw redirect(302, `/threads/view/${thread.id}`);
  },
};