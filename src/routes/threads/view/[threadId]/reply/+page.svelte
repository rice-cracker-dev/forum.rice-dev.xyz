<script lang="ts">
  import type { PageData } from './$types';
  import Post from '$lib/components/Post.svelte';
  import { Button, Textarea } from 'flowbite-svelte';

  export let data: PageData;

  $: threadPost = data.thread.posts[0];
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <div class="flex items-center gap-4">
      <div class="flex-1 space-y-1">
        <h1 class="text-3xl font-semibold text-primary-900 dark:text-primary-200">
          Reply to {data.thread.title}
        </h1>
        <p class="flex gap-2 text-primary-700 dark:text-primary-400">
          Published on {data.thread.publish_date.toLocaleDateString()}
        </p>
      </div>
    </div>

    <div class="flex flex-col gap-8">
      <Post post={threadPost} hideEdit />
    </div>

    <form method="POST" class="flex flex-col gap-4">
      <h1 class="text-xl font-semibold text-primary-900 dark:text-primary-200">Reply content</h1>
      <Textarea id="content" name="content" rows={20} />
      <div class="flex flex-row-reverse gap-4">
        <Button type="submit" color="blue">Reply</Button>
        <Button type="button" href="/threads/view/{data.thread.id}">Cancel</Button>
      </div>
    </form>
  </div>
</div>
