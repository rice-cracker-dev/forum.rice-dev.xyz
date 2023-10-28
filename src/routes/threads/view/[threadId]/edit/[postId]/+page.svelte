<script lang="ts">
  import type { PageData } from './$types';
  import { Button, Input, Textarea } from 'flowbite-svelte';
  import Markdown from 'svelte-exmarkdown';

  export let data: PageData;

  let title = data.thread.title;
  let content = data.post.content;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <form method="POST" class="flex w-full max-w-7xl flex-col gap-4">
    <h1 class="text-xl font-semibold text-primary-900 dark:text-primary-200">
      Edit {data.post.is_first ? 'thread' : 'post'}
    </h1>
    {#if data.post.is_first}
      <Input bind:value={title} id="title" name="title" placeholder="Title" />
    {/if}
    <Textarea bind:value={content} id="content" name="content" rows={20} placeholder="Content" />
    <div class="flex flex-row-reverse gap-4">
      <Button type="submit" role="button" color="blue" formaction="?/edit">Edit</Button>
      <Button type="submit" role="button" color="red" formaction="?/delete">
        Delete {data.post.is_first ? 'thread' : 'post'}
      </Button>
      <Button type="button" role="button" href="/threads/view/{data.post.thread_id}">Cancel</Button>
    </div>
  </form>

  <div class="flex w-full max-w-7xl flex-col gap-4">
    <h1 class="text-xl font-semibold text-primary-900 dark:text-primary-200">Preview</h1>
    <div class="prose dark:prose-invert">
      <Markdown md={content} />
    </div>
  </div>
</div>
