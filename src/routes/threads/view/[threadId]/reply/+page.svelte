<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import type { JSONContent } from '@tiptap/core';
  import { Alert, Button, Heading, P } from 'flowbite-svelte';
  import { enhance } from '$app/forms';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { Turnstile } from 'svelte-turnstile';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';
  import Post from '$lib/components/Post.svelte';

  export let data: PageData;
  export let form: ActionData;

  let content: JSONContent = [];

  $: threadPost = data.thread.posts[0];
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <div class="flex items-center gap-4">
      <div class="flex-1 space-y-1">
        <Heading tag="h6">
          Reply to {data.thread.title}
        </Heading>
        <P class="opacity-50">
          Published on {data.thread.publish_date.toLocaleDateString()}
        </P>
      </div>
    </div>

    <div class="flex flex-col gap-8">
      <Post post={threadPost} hideEdit />
    </div>

    <form
      method="POST"
      class="flex flex-col gap-4"
      use:enhance={({ formData }) => {
        formData.set('content', JSON.stringify(content));
      }}
    >
      <Heading tag="h6">Reply content</Heading>
      {#if form}
        <Alert color="red" border>{form.message}</Alert>
      {/if}
      <RichTextEditor
        initialContent={content}
        on:update={(e) => (content = e.detail.editor.getJSON())}
      />

      <div class="self-end">
        <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} formsField="captchaToken" />
      </div>

      <div class="flex flex-row-reverse gap-4">
        <Button type="submit" color="primary">Reply</Button>
        <Button type="button" href="/threads/view/{data.thread.id}" color="light">Cancel</Button>
      </div>
    </form>
  </div>
</div>
