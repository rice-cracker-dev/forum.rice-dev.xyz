<script lang="ts">
  import type { JSONContent } from '@tiptap/core';
  import RichTextEditor from '$lib/components/RichTextEditor.svelte';
  import RichTextViewer from '$lib/components/RichTextViewer.svelte';

  let json: JSONContent | null = null;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <RichTextEditor on:update={(e) => (json = e.detail.editor.getJSON())} />

    <div>
      <p>html</p>
      {#if json}
        <p>{JSON.stringify(json)}</p>
        <RichTextViewer content={json} />
      {/if}
    </div>
  </div>
</div>
