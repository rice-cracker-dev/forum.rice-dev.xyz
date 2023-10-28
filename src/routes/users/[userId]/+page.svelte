<script lang="ts">
  import type { PageData } from './$types';
  import { Avatar, Button, Card, Input, Label } from 'flowbite-svelte';
  import { strIsEmpty } from '$lib/helper';
  import Icon from '@iconify/svelte';
  import Markdown from 'svelte-exmarkdown';

  export let data: PageData;

  $: isOwner = data.user?.userId === data.userInfo.id;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 pt-32">
  <Card class="w-full max-w-7xl">
    <div class="flex gap-8">
      <Avatar src={data.userInfo.avatar_url ?? undefined} alt="avatar" size="lg" />

      <div class="flex-1 space-y-0">
        <h1 class="mb-1 text-xl font-semibold text-primary-900 dark:text-primary-200">
          {data.userInfo.username}
        </h1>
        <p>Reputations: {data.userInfo.reputations.length}</p>
        <p>Join date: {data.userInfo.join_date.toLocaleDateString()}</p>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex items-center">
        <h1 class="flex-1 text-xl font-semibold text-primary-900 dark:text-primary-200">Bio</h1>
        {#if isOwner}
          <a href="/profile/settings#bio">
            <Icon icon="ph:note-pencil" />
          </a>
        {/if}
      </div>
      <hr class="border-white/10" />
      <p class="mt-2">{strIsEmpty(data.userInfo.bio) ? 'No bio.' : data.userInfo.bio}</p>
    </div>
  </Card>

  <div class="flex w-full max-w-7xl gap-8">
    <div class="flex flex-1 flex-col gap-8">
      <h1 class="text-xl font-semibold">Threads</h1>

      <div class="flex flex-col items-stretch gap-4">
        {#if data.userInfo.posts.length === 0}
          <p class="text-primary-700 dark:text-primary-400">User hasn't posted anything</p>
        {/if}

        {#each data.userInfo.threads as thread}
          <div class="border-l-2 border-gray-700 pl-4">
            <p class="text-primary-700 dark:text-primary-400">
              Posted on {thread.publish_date.toLocaleString()}
            </p>
            <a href="/threads/view/{thread.id}" class="link">{thread.title}</a>
          </div>
        {/each}
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-8">
      <h1 class="text-xl font-semibold">Posts</h1>

      <div class="flex flex-col items-stretch gap-4">
        {#if data.userInfo.posts.length === 0}
          <p class="text-primary-700 dark:text-primary-400">User hasn't posted anything</p>
        {/if}
        {#each data.userInfo.posts as post}
          <div class="border-l-2 border-gray-700 pl-4">
            <p class="text-primary-700 dark:text-primary-400">
              Posted on {post.publish_date.toLocaleString()}
            </p>
            <a href="/threads/view/{post.thread.id}" class="link line-clamp-3">
              <Markdown md={post.content} />
            </a>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
