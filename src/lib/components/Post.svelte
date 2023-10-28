<script lang="ts">
  import { Prisma } from '@prisma/client';
  import { Avatar, Card } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Markdown from 'svelte-exmarkdown';

  const postWithAuthor = Prisma.validator<Prisma.PostDefaultArgs>()({
    include: { author: { include: { reputations: true } } },
  });

  type PostWithAuthor = Prisma.PostGetPayload<typeof postWithAuthor>;

  export let post: PostWithAuthor;
  export let hideEdit = false;
</script>

<Card class="w-full max-w-7xl">
  <div class="flex items-center gap-8">
    <Avatar
      href="/users/{post.author.id}"
      src={post.author.avatar_url ?? undefined}
      alt="avatar"
      size="lg"
    />

    <div class="flex-1 space-y-0">
      <h1 class="mb-1 text-xl font-semibold text-primary-900 dark:text-primary-200">
        {post.author.username}
      </h1>
      <p>Reputations: {post.author.reputations.length}</p>
      <p>Join date: {post.author.join_date.toLocaleDateString()}</p>
      <p>Posted on {post.publish_date.toLocaleString()}</p>
    </div>
  </div>

  <div class="prose mt-8 !max-w-none dark:prose-invert">
    <Markdown md={post.content} />
  </div>

  {#if $page.data.user && $page.data.user.userId === post.author_id && !hideEdit}
    <div class="mt-4 flex gap-4">
      <a href="/threads/view/{post.thread_id}/edit/{post.id}" class="link">Edit</a>
      <a href="/threads/view/{post.thread_id}/edit/{post.id}" class="link">Delete</a>
    </div>
  {/if}
</Card>
