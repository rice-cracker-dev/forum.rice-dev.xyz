<script lang="ts">
  import { Button, ButtonGroup } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';

  const settingsLinks: { url: string; title: string; icon: string }[] = [
    { url: '/profile/settings/profile', title: 'Profile', icon: 'ph:user' },
    { url: '/profile/settings/account', title: 'Account', icon: 'ph:user' },
  ];
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <ButtonGroup>
      {#each settingsLinks as link}
        <Button
          color={$page.url.pathname.startsWith(link.url) ? 'primary' : 'light'}
          class="gap-4"
          href={link.url}
        >
          <Icon icon={link.icon} />
          {link.title}
        </Button>
      {/each}
    </ButtonGroup>

    <slot />
  </div>
</div>
