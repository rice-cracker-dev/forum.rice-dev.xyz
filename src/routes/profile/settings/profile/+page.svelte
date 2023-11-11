<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { type JSONContent, generateText } from '@tiptap/core';
  import { Alert, Button, Label } from 'flowbite-svelte';
  import { enhance } from '$app/forms';
  import { jsonToContent, strIsEmpty } from '$lib/helper';
  import { RichTextEditorExtensions } from '$lib/components/RichTextEditor';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';

  export let data: PageData;
  export let form: ActionData;

  let bio: JSONContent = jsonToContent(data.user.bio);
  let signature: JSONContent = jsonToContent(data.user.signature);
</script>

<form
  class="flex flex-col gap-8"
  method="POST"
  use:enhance={({ formData }) => {
    if (bio && !strIsEmpty(generateText(bio, RichTextEditorExtensions))) {
      formData.set('bio', JSON.stringify(bio));
    }
    if (signature && !strIsEmpty(generateText(signature, RichTextEditorExtensions))) {
      formData.set('signature', JSON.stringify(signature));
    }
  }}
>
  {#if form}
    <Alert color={form.success ? 'green' : 'red'} border>{form.message}</Alert>
  {/if}
  <div>
    <Label for="bio" class="mb-2">Bio</Label>
    <RichTextEditor initialContent={bio} on:update={(e) => (bio = e.detail.editor.getJSON())} />
  </div>
  <div>
    <Label for="signature" class="mb-2">Signature</Label>
    <RichTextEditor
      initialContent={signature}
      on:update={(e) => (signature = e.detail.editor.getJSON())}
    />
  </div>
  <div class="flex flex-row-reverse gap-4">
    <Button type="submit" color="primary">Save</Button>
  </div>
</form>
