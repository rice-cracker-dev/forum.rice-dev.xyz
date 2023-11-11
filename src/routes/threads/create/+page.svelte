<script lang="ts">
  import type { PageData, ActionData } from './$types';
  import type { JSONContent } from '@tiptap/core';
  import { Alert, Button, Heading, Input, Select } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import { enhance } from '$app/forms';
  import { validateCategoryPermission } from '$lib/helper';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';

  export let data: PageData;
  export let form: ActionData;

  let title = '';
  let content: JSONContent | null = null;

  $: items = data.categories
    .filter((o) => validateCategoryPermission(data.user, o.is_admin_only, o.is_premium_only))
    .map((o) => ({ value: o.id, name: o.name }));
  $: category = $page.url.searchParams.get('category') || null;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <form
    method="POST"
    class="flex w-full max-w-7xl flex-col gap-4"
    use:enhance={({ formData }) => {
      formData.set('content', JSON.stringify(content));
    }}
  >
    <Heading tag="h4">New thread</Heading>
    {#if form}
      <Alert color="red" border>{form.message}</Alert>
    {/if}
    <Select
      id="category"
      name="category"
      {items}
      value={category}
      placeholder="Choose a category."
      required
    />
    <Input bind:value={title} id="title" name="title" placeholder="Title" required />
    <RichTextEditor
      initialContent={content}
      on:update={(e) => (content = e.detail.editor.getJSON())}
    />
    <div class="flex flex-row-reverse gap-4">
      <Button type="submit" role="button" color="primary">Post</Button>
      <Button
        type="button"
        role="button"
        color="light"
        href="/{category && `categories/${category}`}"
      >
        Cancel
      </Button>
    </div>
  </form>
</div>
