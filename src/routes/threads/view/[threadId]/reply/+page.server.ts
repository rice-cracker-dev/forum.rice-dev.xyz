import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { handleLoginRedirect } from '$lib/utils';
import { prisma } from '$lib/server/prisma';
import { validateCategoryPermission } from '$lib/helper';
import { validateToken } from '$lib/server/captcha';

export const load: PageServerLoad = async ({ locals, url, parent }) => {
  const session = await locals.auth.validate();
  const { thread } = await parent();

  if (
    !session ||
    !validateCategoryPermission(
      session.user,
      thread.category.is_admin_only,
      thread.category.is_premium_only
    )
  ) {
    throw redirect(302, handleLoginRedirect(url));
  }
};

export const actions: Actions = {
  default: async ({ locals, request, params }) => {
    const { threadId } = params;
    const formData = await request.formData();
    const content = formData.get('content') as string;
    const captchaToken = formData.get('captchaToken') as string;

    if (!content || content.length < 10) {
      return fail(400, { message: 'Must be at least 10 characters.' });
    }

    const session = await locals.auth.validate();

    try {
      const thread = await prisma.thread.findUnique({
        where: { id: threadId },
        include: { category: true },
      });

      if (!thread) {
        return fail(400, { message: 'Failed to fetch thread.' });
      }

      if (
        !session ||
        !validateCategoryPermission(
          session.user,
          thread.category.is_admin_only,
          thread.category.is_admin_only
        )
      ) {
        return fail(403, { message: 'Not authorized.' });
      }

      const captchaValidated = await validateToken(captchaToken);

      if (!captchaValidated.success) {
        return fail(429, { message: 'Could not verify captcha.' });
      }

      await prisma.thread.update({
        where: { id: threadId },
        data: {
          posts: { create: { content, author_id: session.user.userId } },
          updated_date: new Date(Date.now()),
        },
      });
    } catch (err) {
      console.error(err);
      return fail(400, { message: 'Unexpected error.' });
    }

    throw redirect(302, `/threads/view/${threadId}`);
  },
};
