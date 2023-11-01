import type { Actions, PageServerLoad } from './$types';
import { error, fail, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';
import { validateToken } from '$lib/server/captcha';

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
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const captchaToken = formData.get('captchaToken') as string;

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

    if (post.is_first && title.length < 10) {
      return fail(400, { message: 'Title must be at least 10 characters.' });
    }

    if (!content || content.length < 10) {
      return fail(400, { message: 'Content must be at least 10 characters.' });
    }

    const captchaValidated = await validateToken(captchaToken);

    if (!captchaValidated.success) {
      return fail(429, { message: 'Could not verify captcha.' });
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
      if (post.is_first) {
        await prisma.thread.delete({ where: { id: threadId } });
      } else {
        await prisma.post.delete({ where: { id: postId } });
      }
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Unexpected error.' });
    }

    if (post.is_first) {
      throw redirect(302, '/');
    }

    throw redirect(302, `/threads/view/${threadId}`);
  },
};
