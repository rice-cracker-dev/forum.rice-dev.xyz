<script lang="ts">
  import type { PageData } from './$types';
  import { generateText } from '@tiptap/core';
  import { A, Avatar, Card, Heading, P } from 'flowbite-svelte';
  import { jsonToContent } from '$lib/helper';
  import { RichTextEditorExtensions } from '$lib/components/RichTextEditor';
  import Icon from '@iconify/svelte';
  import RichTextViewer from '$lib/components/RichTextViewer.svelte';

  export let data: PageData;

  $: isOwner = data.user?.userId === data.userInfo.id;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 pt-32">
  <Card class="w-full max-w-7xl">
    <div class="flex gap-8">
      <Avatar src={data.userInfo.avatar_url ?? undefined} alt="avatar" size="lg" />

      <div class="flex-1 space-y-0">
        <Heading class="mb-1 text-xl font-semibold text-gray-900 dark:text-white">
          {data.userInfo.username}
        </Heading>
        <p>Reputations: {data.userInfo.reputations.length}</p>
        <p>Join date: {data.userInfo.join_date.toLocaleDateString()}</p>
      </div>
    </div>

    <div class="mt-8">
      <div class="flex items-center">
        <h1 class="flex-1 text-xl font-semibold text-gray-900 dark:text-white">Bio</h1>
        {#if isOwner}
          <a href="/profile/settings/profile#bio">
            <Icon icon="ph:note-pencil" />
          </a>
        {/if}
      </div>
      <hr class="border-white/10" />
      {#if data.userInfo.bio}
        <RichTextViewer content={jsonToContent(data.userInfo.bio)} />
      {:else}
        <p>No bio</p>
      {/if}
    </div>
  </Card>

  <div class="grid w-full max-w-7xl grid-cols-1 gap-8 md:grid-cols-2">
    <div class="flex flex-col gap-8">
      <h1 class="text-xl font-semibold">Threads</h1>

      <div class="flex flex-col items-stretch">
        {#if data.userInfo.posts.length === 0}
          <P class="opacity-50">User hasn't posted anything</P>
        {/if}

        {#each data.userInfo.threads as thread}
          <div class="border-l-2 border-gray-700 py-2 pl-4">
            <P opacity={0.5}>
              Posted on {thread.publish_date.toLocaleString()}
            </P>
            <A href="/threads/view/{thread.id}" class="line-clamp-2">{thread.title}</A>
          </div>
        {/each}
      </div>
    </div>

    <div class="flex flex-col gap-8">
      <h1 class="text-xl font-semibold">Posts</h1>

      <div class="flex flex-col items-stretch">
        {#if data.userInfo.posts.length === 0}
          <P class="opacity-50">User hasn't posted anything</P>
        {/if}
        {#each data.userInfo.posts as post}
          <div class="border-l-2 border-gray-700 py-2 pl-4">
            <P opacity={0.5}>
              Posted on {post.publish_date.toLocaleString()}
            </P>
            <A href="/threads/view/{post.thread_id}" class="line-clamp-3">
              {generateText(jsonToContent(post.content), RichTextEditorExtensions)}
            </A>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
