<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { Alert, Button, Heading, Input } from 'flowbite-svelte';
  import { Turnstile } from 'svelte-turnstile';
  import { enhance } from '$app/forms';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { jsonToContent } from '$lib/helper';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';

  export let data: PageData;
  export let form: ActionData;

  let title = data.thread.title;
  let content = jsonToContent(data.post.content);
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <form
    method="POST"
    class="flex w-full max-w-7xl flex-col gap-4"
    use:enhance={({ formData }) => {
      formData.set('content', JSON.stringify(content));
    }}
  >
    <Heading tag="h6">
      Edit {data.post.is_first ? 'thread' : 'post'}
    </Heading>
    {#if form}
      <Alert color="red" border>{form.message}</Alert>
    {/if}
    {#if data.post.is_first}
      <Input bind:value={title} id="title" name="title" placeholder="Title" />
    {/if}
    <RichTextEditor
      initialContent={content}
      on:update={(e) => (content = e.detail.editor.getJSON())}
    />
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
</div>
