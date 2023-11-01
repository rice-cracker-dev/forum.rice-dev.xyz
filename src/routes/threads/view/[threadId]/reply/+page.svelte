<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import Post from '$lib/components/Post.svelte';
  import { Alert, Button, Heading, P, Textarea } from 'flowbite-svelte';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { Turnstile } from 'svelte-turnstile';

  export let data: PageData;
  export let form: ActionData;

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

    <form method="POST" class="flex flex-col gap-4">
      <Heading tag="h6">Reply content</Heading>
      {#if form}
        <Alert color="red" border>{form.message}</Alert>
      {/if}
      <Textarea id="content" name="content" rows={20} />

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
