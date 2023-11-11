<script lang="ts">
  import { Prisma } from '@prisma/client';
  import { A, Avatar, Card, Heading, P } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import { jsonToContent } from '$lib/helper';
  import RichTextViewer from '$lib/components/RichTextViewer.svelte';

  const postWithAuthor = Prisma.validator<Prisma.PostDefaultArgs>()({
    include: { author: { include: { _count: { select: { reputations: true } } } } },
  });

  type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>;

  export let post: PostWithAuthor;
  export let hideEdit = false;
</script>

<Card padding="none" class="w-full max-w-7xl overflow-hidden">
  <div class="flex flex-col items-stretch p-4">
    <div class="flex items-center gap-8">
      <Avatar
        href={post.author && `/users/${post.author.id}`}
        src={post.author?.avatar_url ?? undefined}
        alt="avatar"
        size="lg"
      />

      <div class="flex-1 space-y-0">
        <Heading tag="h6">
          {post.author ? post.author.username : '[Deleted User]'}
        </Heading>
        {#if post.author}
          <P class="opacity-50">Reputations: {post.author._count.reputations}</P>
          <P class="opacity-50">Join date: {post.author.join_date.toLocaleDateString()}</P>
          <P class="opacity-50">Posted on {post.publish_date.toLocaleString()}</P>
        {/if}
      </div>
    </div>

    <RichTextViewer class="mt-8" content={jsonToContent(post.content)} />

    {#if $page.data.user && $page.data.user.userId === post.author_id && !hideEdit}
      <div class="mt-4 flex gap-4">
        <A href="/threads/view/{post.thread_id}/edit/{post.id}">Edit</A>
      </div>
    {/if}
  </div>

  {#if post.author?.signature}
    <div class="border-t border-gray-300 p-4 dark:border-gray-700">
      <RichTextViewer content={jsonToContent(post.author.signature)} />
    </div>
  {/if}
</Card>
