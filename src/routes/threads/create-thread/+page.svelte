<script lang="ts">
  import { Button, Input, Textarea } from 'flowbite-svelte';
  import Markdown from 'svelte-exmarkdown';

  let title = '';
  let content = '';
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <form method="POST" class="flex w-full max-w-7xl flex-col gap-4">
    <h1 class="text-xl font-semibold text-primary-900 dark:text-primary-200">New thread</h1>
    <Input bind:value={title} id="title" name="title" placeholder="Title" />
    <Textarea bind:value={content} id="content" name="content" rows={20} placeholder="Content" />
    <Button type="submit" role="button">Post</Button>
  </form>

  <div class="flex w-full max-w-7xl flex-col gap-4">
    <h1 class="text-xl font-semibold text-primary-900 dark:text-primary-200">Preview</h1>
    <div class="prose dark:prose-invert">
      <Markdown md={content} />
    </div>
  </div>
</div>
