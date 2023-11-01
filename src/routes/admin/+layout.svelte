<script lang="ts">
  import { Button, ButtonGroup } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  const links: {
    url: string;
    title: string;
    icon?: string;
  }[] = [
    { url: '/admin/categories/', title: 'Categories' },
    { url: '/admin/categories-group/', title: 'Groups' },
  ];
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <ButtonGroup>
      {#each links as link}
        <Button
          href={link.url}
          class="gap-4"
          color={$page.url.pathname.startsWith(link.url) ? 'primary' : 'light'}
        >
          {#if link.icon}
            <Icon icon={link.icon} />
          {/if}
          {link.title}
        </Button>
      {/each}
    </ButtonGroup>

    <slot />
  </div>
</div>
