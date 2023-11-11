<script lang="ts">
  import { onMount, onDestroy, createEventDispatcher } from 'svelte';
  import { type Content, Editor } from '@tiptap/core';
  import { Button, Dropdown, Input, Label, Spinner } from 'flowbite-svelte';
  import { fly } from 'svelte/transition';
  import { RichTextEditorInitialOptions, Colors } from '$lib/components/RichTextEditor';
  import Icon from '@iconify/svelte';
  import './RichTextEditor.scss';

  let element: HTMLElement;
  let editor: Editor;
  let isCodeBlockDropdownOpened = false;
  let isImageDropdownOpened = false;
  let isColorDropdownOpened = false;
  let isLinkDropdownOpened = false;

  export let initialContent: Content | null = null;
  export let editable = true;

  const onCodeBlockSubmit = (e: SubmitEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const language = formData.get('language') as string;

    editor.chain().focus().setCodeBlock({ language }).run();

    isCodeBlockDropdownOpened = false;
  };

  const onImageSubmit = (e: SubmitEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const title = formData.get('title') as string;
    const alt = formData.get('alt') as string;
    const src = formData.get('src') as string;

    editor.chain().focus().setImage({ title, alt, src }).run();

    isCodeBlockDropdownOpened = false;
  };

  const onLinkSubmit = (e: SubmitEvent) => {
    const formData = new FormData(e.target as HTMLFormElement);
    const link = formData.get('link') as string;

    editor.chain().focus().setLink({ href: link, target: '_blank' }).run();

    isLinkDropdownOpened = false;
  };

  const dispatcher = createEventDispatcher<{
    update: { editor: Editor };
  }>();

  onMount(() => {
    editor = new Editor({
      ...RichTextEditorInitialOptions,
      element,
      editable,
      content: initialContent,
      onTransaction: () => {
        // force re-render so `editor.isActive` works as expected
        editor = editor;
      },
      onUpdate: ({ editor }) => {
        dispatcher('update', { editor });
      },
    });
  });

  onDestroy(() => {
    if (editor) {
      editor.destroy();
    }
  });
</script>

<div
  class="overflow-hidden rounded-lg border border-gray-300 bg-gray-50 text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
>
  {#if editable && editor}
    <div
      in:fly={{ y: '-110%', duration: 250 }}
      class="flex items-stretch overflow-x-auto border-b border-gray-300 bg-gray-100 dark:border-gray-600 dark:bg-gray-700"
    >
      <div class="flex items-center gap-2 p-2">
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square"
          disabled={!editor.can().undo()}
          on:click={() => editor.chain().focus().undo().run()}
        >
          <Icon icon="ph:arrow-u-up-left" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square"
          disabled={!editor.can().redo()}
          on:click={() => editor.chain().focus().redo().run()}
        >
          <Icon icon="ph:arrow-u-up-right" />
        </Button>
      </div>
      <div class="border-l border-gray-300 dark:border-gray-600" />
      <div class="flex items-center gap-2 p-2">
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('bold') && 'active'}"
          on:click={() => editor.chain().focus().toggleBold().run()}
        >
          <Icon icon="ph:text-b" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('italic') && 'active'}"
          on:click={() => editor.chain().focus().toggleItalic().run()}
        >
          <Icon icon="ph:text-italic" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('underline') && 'active'}"
          on:click={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Icon icon="ph:text-underline" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('strike') && 'active'}"
          on:click={() => editor.chain().focus().toggleStrike().run()}
        >
          <Icon icon="ph:text-strikethrough" />
        </Button>
      </div>
      <div class="border-l border-gray-300 dark:border-gray-600" />
      <div class="flex items-center gap-2 p-2">
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive({ textAlign: 'left' }) && 'active'}"
          on:click={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <Icon icon="ph:text-align-left" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive({ textAlign: 'center' }) && 'active'}"
          on:click={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <Icon icon="ph:text-align-center" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive({ textAlign: 'right' }) && 'active'}"
          on:click={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <Icon icon="ph:text-align-right" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive({ textAlign: 'justify' }) && 'active'}"
          on:click={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <Icon icon="ph:text-align-justify" />
        </Button>
      </div>
      <div class="border-l border-gray-300 dark:border-gray-600" />
      <div class="flex items-center gap-2 p-2">
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('heading', { level: 1 }) && 'active'}"
          on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        >
          <Icon icon="ph:text-h-one" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('heading', { level: 2 }) && 'active'}"
          on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        >
          <Icon icon="ph:text-h-two" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('heading', { level: 3 }) && 'active'}"
          on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        >
          <Icon icon="ph:text-h-three" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('paragraph') && 'active'}"
          on:click={() => editor.chain().focus().setParagraph().run()}
        >
          <Icon icon="ph:paragraph" />
        </Button>
        <div>
          <Button
            size="xl"
            color="none"
            class="toolbar-btn aspect-square {editor.isActive('codeBlock') && 'active'}"
          >
            <Icon icon="ph:code-block" />
          </Button>

          <Dropdown placement="bottom-start" bind:open={isCodeBlockDropdownOpened}>
            {#key isCodeBlockDropdownOpened}
              <form
                class="flex flex-col items-stretch gap-2 p-2"
                on:submit|preventDefault={onCodeBlockSubmit}
              >
                <div>
                  <Label for="language" class="mb-2">Language</Label>
                  <Input
                    id="language"
                    name="language"
                    placeholder="Language"
                    value={editor.getAttributes('codeBlock').language}
                  />
                </div>
                <div class="flex items-center gap-2">
                  <Button type="submit" class="flex-1">Submit</Button>
                  {#if editor.isActive('codeBlock')}
                    <Button
                      type="button"
                      color="red"
                      class="flex-1"
                      on:click={() => {
                        editor.commands.toggleCodeBlock();
                        isLinkDropdownOpened = false;
                      }}
                    >
                      Remove
                    </Button>
                  {/if}
                </div>
              </form>
            {/key}
          </Dropdown>
        </div>
      </div>
      <div class="border-l border-gray-300 dark:border-gray-600" />
      <div class="flex items-center gap-2 p-2">
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('blockquote') && 'active'}"
          on:click={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Icon icon="ph:quotes" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square"
          on:click={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Icon icon="ph:arrows-out-line-vertical" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('bulletList') && 'active'}"
          on:click={() => editor.chain().focus().toggleBulletList().run()}
        >
          <Icon icon="ph:list-bullets" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('orderedList') && 'active'}"
          on:click={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <Icon icon="ph:list-numbers" />
        </Button>
        <Button
          size="xl"
          color="none"
          class="toolbar-btn aspect-square {editor.isActive('code') && 'active'}"
          on:click={() => editor.chain().focus().toggleCode().run()}
        >
          <Icon icon="ph:code" />
        </Button>
        <!--      <Button-->
        <!--        size="xl"-->
        <!--        color="none"-->
        <!--        class="toolbar-btn aspect-square {editor.isActive('code') && 'active'}"-->
        <!--        on:click={() => editor.chain().focus().toggleCode().run()}-->
        <!--      >-->
        <!--        <Icon icon="ph:code" />-->
        <!--      </Button>-->
        <div>
          <Button
            size="xl"
            color="none"
            class="toolbar-btn aspect-square {editor.isActive('image') && 'active'}"
          >
            <Icon icon="ph:image" />
          </Button>

          <Dropdown placement="bottom-start" bind:open={isImageDropdownOpened}>
            {#key isImageDropdownOpened}
              <form
                class="flex flex-col items-stretch gap-2 p-2"
                on:submit|preventDefault={onImageSubmit}
              >
                <div>
                  <Label for="title" class="mb-2">Title</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="Title"
                    value={editor.getAttributes('image').title}
                  />
                </div>
                <div>
                  <Label for="alt" class="mb-2">Alt</Label>
                  <Input
                    id="alt"
                    name="alt"
                    placeholder="Alt text"
                    value={editor.getAttributes('image').alt}
                  />
                </div>
                <div>
                  <Label for="src" class="mb-2">Url</Label>
                  <Input
                    id="src"
                    name="src"
                    placeholder="Image"
                    value={editor.getAttributes('image').src}
                    required
                  />
                </div>
                <div class="flex items-center gap-2">
                  <Button type="submit" class="flex-1">Submit</Button>
                </div>
              </form>
            {/key}
          </Dropdown>
        </div>
        <div>
          <Button
            size="xl"
            color="none"
            class="toolbar-btn aspect-square {editor.isActive('link') && 'active'}"
            on:click={() => (isLinkDropdownOpened = true)}
          >
            <Icon icon="ph:link" />
          </Button>

          <Dropdown placement="bottom-start" bind:open={isLinkDropdownOpened}>
            {#key isLinkDropdownOpened}
              <form
                class="flex flex-col items-stretch gap-2 p-2"
                on:submit|preventDefault={onLinkSubmit}
              >
                <div>
                  <Label for="link" class="mb-2">Link</Label>
                  <Input
                    id="link"
                    name="link"
                    placeholder="Link"
                    value={editor.getAttributes('link').href}
                  />
                </div>
                <div class="flex items-center gap-2">
                  <Button type="submit" class="flex-1">Submit</Button>
                  <Button
                    type="button"
                    color="red"
                    class="flex-1"
                    on:click={() => {
                      editor.commands.unsetLink();
                      isLinkDropdownOpened = false;
                    }}
                  >
                    Remove
                  </Button>
                </div>
              </form>
            {/key}
          </Dropdown>
        </div>
        <div>
          <Button
            size="xl"
            color="none"
            class="toolbar-btn relative aspect-square"
            style="background: {editor.getAttributes('textStyle').color}"
            on:click={() => (isColorDropdownOpened = true)}
          >
            <Icon icon="ph:paint-brush" />
          </Button>

          <Dropdown placement="bottom-start" bind:open={isColorDropdownOpened}>
            <div class="flex flex-col items-stretch gap-2 p-2">
              <div class="grid grid-cols-9 gap-2">
                {#each Colors as color}
                  <Button
                    class="aspect-square h-4 w-4 rounded p-0"
                    color="none"
                    style="background: {color};"
                    on:click={() => editor.chain().focus().setColor(color).run()}
                  />
                {/each}
              </div>

              <Button
                size="xs"
                color="dark"
                on:click={() => editor.chain().focus().unsetColor().run()}
              >
                Remove color
              </Button>
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  {/if}

  {#if !editor}
    <div out:fly={{ y: '110%', duration: 250 }} class="p-2 text-center">
      <Spinner size="6" />
    </div>
  {/if}

  <div bind:this={element} />
</div>
