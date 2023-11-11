import type { Thread } from '@prisma/client';
import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/utils';
import { prisma } from '$lib/server/prisma';
import { validateCategoryPermission } from '$lib/helper';
import { generateText, type JSONContent } from '@tiptap/core';
import { RichTextEditorExtensions } from '$lib/components/RichTextEditor';

export const load: PageServerLoad = async ({ locals, url }) => {
  const session = await locals.auth.validate();

  if (!session) {
    throw redirect(302, handleLoginRedirect(url));
  }

  const categories = await prisma.category.findMany();

  return { categories };
};

export const actions: Actions = {
  default: async ({ locals, request }) => {
    const formData = await request.formData();
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const categoryId = formData.get('category') as string;

    const session = await locals.auth.validate();

    if (!session) {
      return fail(403, { message: 'Not authorized' });
    }

    if (title.length < 10) {
      return fail(400, { message: 'Title must be at least 10 characters.' });
    }

    if (generateText(JSON.parse(content) as JSONContent, RichTextEditorExtensions).length < 10) {
      return fail(400, { message: 'Content must be at least 10 characters.' });
    }

    if (!categoryId) {
      return fail(400, { message: 'A category must be selected.' });
    }

    let thread: Thread;

    try {
      const category = await prisma.category.findUnique({ where: { id: categoryId } });

      if (!category) {
        return fail(400, { message: 'Failed to fetch category.' });
      }

      if (
        !validateCategoryPermission(session.user, category.is_admin_only, category.is_admin_only)
      ) {
        return fail(403, { message: 'Unauthorized.' });
      }

      thread = await prisma.$transaction(async (trx) => {
        const thread = await trx.thread.create({
          data: {
            title,
            author_id: session.user.userId,
            category_id: categoryId,
            posts: {
              create: {
                content: JSON.parse(content),
                author_id: session.user.userId,
                is_first: true,
              },
            },
          },
        });
        await trx.category.update({
          where: { id: categoryId },
          data: { last_thread: { connect: { id: thread.id } } },
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
