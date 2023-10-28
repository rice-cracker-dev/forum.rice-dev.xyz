import { error, redirect, type RequestHandler } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma';

export const POST: RequestHandler = async ({ locals, url }) => {
  const threadId = url.searchParams.get('id');

  if (!threadId) {
    throw error(400, { message: 'Missing id' });
  }

  const [session, thread] = await Promise.all([
    locals.auth.validate(),
    prisma.thread.findUnique({ where: { id: threadId } }),
  ]);

  if (!thread) {
    throw error(404, { message: 'Not found.' });
  }

  if (session?.user.userId !== thread?.author_id) {
    throw error(403, { message: 'Not authorized.' });
  }

  try {
    await prisma.thread.delete({ where: { id: thread.id } });
  } catch (err) {
    console.error(err);
    throw error(400, { message: 'Unexpected error.' });
  }

  throw redirect(302, '/');
};
