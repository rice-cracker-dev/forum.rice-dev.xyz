<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { Alert, Button, Heading, Input, Textarea } from 'flowbite-svelte';
  import Markdown from 'svelte-exmarkdown';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { Turnstile } from 'svelte-turnstile';

  export let data: PageData;
  export let form: ActionData;

  let title = data.thread.title;
  let content = data.post.content;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <form method="POST" class="flex w-full max-w-7xl flex-col gap-4">
    <Heading tag="h6">
      Edit {data.post.is_first ? 'thread' : 'post'}
    </Heading>
    {#if form}
      <Alert color="red" border>{form.message}</Alert>
    {/if}
    {#if data.post.is_first}
      <Input bind:value={title} id="title" name="title" placeholder="Title" />
    {/if}
    <Textarea bind:value={content} id="content" name="content" rows={20} placeholder="Content" />
    <div class="self-end">
      <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} formsField="captchaToken" />
    </div>
    <div class="flex flex-row-reverse gap-4">
      <Button type="submit" role="button" color="primary" formaction="?/edit">Edit</Button>
      <Button type="submit" role="button" color="red" formaction="?/delete">
        Delete {data.post.is_first ? 'thread' : 'post'}
      </Button>
      <Button type="button" role="button" href="/threads/view/{data.post.thread_id}" color="light">
        Cancel
      </Button>
    </div>
  </form>

  <div class="flex w-full max-w-7xl flex-col gap-4">
    <Heading tag="h6">Preview</Heading>
    <div class="prose dark:prose-invert">
      <Markdown md={content} />
    </div>
  </div>
</div>
