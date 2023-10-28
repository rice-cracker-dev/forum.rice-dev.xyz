import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const load: PageServerLoad = async ({ locals, params }) => {
  const { postId } = params;
  const [session, post] = await Promise.all([
    locals.auth.validate(),
    prisma.post.findUnique({ where: { id: postId } }),
  ]);

  if (!post) {
    throw error(404, { message: 'Not found.' });
  }

  if (session?.user.userId !== post.author_id) {
    throw error(403, { message: 'Unauthorized.' });
  }

  return { post: post! };
};

export const actions: Actions = {
  edit: async ({ locals, params, request }) => {
    const { postId, threadId } = params;
    const { title, content } = Object.fromEntries(await request.formData()) as Record<
      string,
      string
    >;
    const [session, post] = await Promise.all([
      locals.auth.validate(),
      prisma.post.findUnique({ where: { id: postId } }),
    ]);

    if (!post) {
      throw error(404, { message: 'Not found.' });
    }

    if (session?.user.userId !== post.author_id) {
      throw error(403, { message: 'Unauthorized.' });
    }

    try {
      await prisma.$transaction(async (trx) => {
        await trx.post.update({ where: { id: postId }, data: { content } });

        if (post.is_first) {
          await trx.thread.update({ where: { id: threadId }, data: { title } });
        }
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Unexpected error.' });
    }

    throw redirect(302, `/threads/view/${threadId}`);
  },

  delete: async ({ params, locals }) => {
    const { postId, threadId } = params;
    const [session, post] = await Promise.all([
      locals.auth.validate(),
      prisma.post.findUnique({ where: { id: postId } }),
    ]);

    if (!post) {
      throw error(404, { message: 'Not found.' });
    }

    if (session?.user.userId !== post.author_id) {
      throw error(403, { message: 'Unauthorized.' });
    }

    try {
      await prisma.post.delete({ where: { id: postId } });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Unexpected error.' });
    }

    throw redirect(302, `/threads/view/${threadId}`);
  },
};
