<script lang="ts">
  import { generateHTML, type JSONContent } from '@tiptap/core';
  import { RichTextEditorExtensions } from './RichTextEditor';

  let className = '';
  export let content: JSONContent | null;
  export { className as class };
</script>

{#if content && globalThis.window}
  <div class="prose max-w-none dark:prose-invert {className}">
    <!-- eslint-disable-next-line -->
    {@html generateHTML(content, RichTextEditorExtensions)}
  </div>
{/if}
