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
    Heading,
    P,
    Span,
  } from 'flowbite-svelte';
  import { page } from '$app/stores';
  import Icon from '@iconify/svelte';
</script>

<Navbar class="p-8">
  <NavBrand href="/" class="flex-1">
    <Heading tag="h5">RiceDev</Heading>
  </NavBrand>

  <div class="flex gap-4 md:order-2">
    <NavHamburger />
    {#if !$page.data.user}
      <Button href="/auth/login" color="light">Sign in</Button>
      <Button href="/auth/register">Sign up</Button>
    {/if}

    {#if $page.data.user}
      <div>
        <Avatar src={undefined} class="cursor-pointer" />

        <Dropdown placement="bottom-end">
          <div slot="header" class="flex items-center gap-4 px-4 py-2">
            <Avatar src={$page.data.user.avatar_url ?? undefined} size="sm" />
            <div>
              <P opacity={0.9}>
                {$page.data.user.username}
                <Span class="font-normal opacity-50">
                  ({$page.data.user.is_admin
                    ? 'Admin'
                    : $page.data.user.is_premium
                    ? 'Premium'
                    : 'Member'})
                </Span>
              </P>
              <P class="text-primary-700 dark:text-primary-400">{$page.data.user.email}</P>
            </div>
          </div>
          <DropdownItem href="/profile" class="flex items-center gap-4">
            <Icon icon="ph:user" />
            Profile
          </DropdownItem>
          <DropdownItem href="/profile/settings" class="flex items-center gap-4">
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
