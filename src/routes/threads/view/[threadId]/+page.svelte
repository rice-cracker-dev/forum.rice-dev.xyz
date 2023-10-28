<script lang="ts">
  import type { PageData } from './$types';
  import { Avatar, Card } from 'flowbite-svelte';
  import Markdown from 'svelte-exmarkdown';

  export let data: PageData;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 pt-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <div class="space-y-1">
      <h1 class="text-3xl font-semibold text-primary-900 dark:text-primary-200">
        {data.thread.title}
      </h1>
      <p class="flex gap-2 text-primary-700 dark:text-primary-400">
        Published on {data.thread.publish_date.toLocaleDateString()}

        <a href="/threads/edit-thread" class="link">Edit</a>
        <a href="/threads/edit-thread" class="link">Delete</a>
      </p>
    </div>

    <div class="flex flex-col gap-8">
      {#each data.thread.posts as post}
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

          <div class="prose mt-8 dark:prose-invert">
            <Markdown md={post.content} />
          </div>
        </Card>
      {/each}
    </div>
  </div>
</div>
