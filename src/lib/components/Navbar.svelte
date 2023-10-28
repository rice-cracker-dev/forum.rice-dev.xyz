<script lang="ts">
  import {
    Navbar,
    NavBrand,
    NavUl,
    NavLi,
    NavHamburger,
    Button,
    Dropdown,
    DropdownItem,
    Avatar,
    DropdownDivider,
  } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
</script>

<Navbar class="p-8">
  <NavBrand href="/" class="flex-1">
    <span class="text-xl font-semibold tracking-wide">RiceDev</span>
  </NavBrand>

  <div class="flex gap-4 md:order-2">
    <NavHamburger />
    {#if !$page.data.user}
      <Button href="/auth/login">Sign in</Button>
      <Button color="blue" href="/auth/register">Sign up</Button>
    {/if}

    {#if $page.data.user}
      <div>
        <Avatar src={undefined} class="cursor-pointer" />

        <Dropdown placement="bottom-end">
          <div slot="header" class="flex items-center gap-4 px-4 py-2">
            <Avatar src={$page.data.user.avatar_url ?? undefined} size="sm" />
            <div>
              <h1>{$page.data.user.username}</h1>
              <p class="text-primary-700 dark:text-primary-400">{$page.data.user.email}</p>
            </div>
          </div>
          <DropdownItem href="/profile" class="flex items-center gap-4">
            <Icon icon="ph:user" />
            Profile
          </DropdownItem>
          <DropdownItem class="flex items-center gap-4">
            <Icon icon="ph:gear" />
            Settings
          </DropdownItem>
          <DropdownItem class="flex items-center gap-4">
            <Icon icon="ph:sketch-logo" />
            Upgrade
          </DropdownItem>
          <DropdownDivider />
          <form method="POST">
            <DropdownItem
              class="flex items-center gap-4"
              slot="footer"
              formaction="/auth/logout"
              type="submit"
            >
              <Icon icon="ph:sign-out" />
              Logout
            </DropdownItem>
          </form>
        </Dropdown>
      </div>
    {/if}
  </div>

  <NavUl class="order-1 mx-8">
    <NavLi href="/">Home</NavLi>
  </NavUl>
</Navbar>
