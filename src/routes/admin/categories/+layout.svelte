<script lang="ts">
  import { Button, ButtonGroup } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  const links: {
    url: string;
    title: string;
    icon: string;
  }[] = [
    { url: '/admin/categories/create', title: 'Create', icon: 'ph:plus-square' },
    { url: '/admin/categories/edit', title: 'Edit', icon: 'ph:pencil' },
    { url: '/admin/categories/delete', title: 'Delete', icon: 'ph:trash' },
  ];
</script>

<ButtonGroup>
  {#each links as link}
    <Button
      href={link.url}
      class="gap-4"
      color={$page.url.pathname.startsWith(link.url) ? 'primary' : 'light'}
    >
      <Icon icon={link.icon} />
      {link.title}
    </Button>
  {/each}
</ButtonGroup>

<slot />
