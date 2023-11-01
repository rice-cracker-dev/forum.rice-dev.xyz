<script lang="ts">
  import type { ActionData } from './$types';
  import { Alert, Button, Card, Heading, Input, Label, P, Span } from 'flowbite-svelte';
  import { strIsEmail } from '$lib/helper';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
  import { Turnstile } from 'svelte-turnstile';

  export let form: ActionData;

  let username = '';
  let email = '';
  let password = '';

  $: isUsernameValid = /^[a-zA-Z0-9]{4,30}$/.test(username);
  $: isEmailValid = strIsEmail(email.toLowerCase());
  $: isPasswordValid = password.length >= 8;
  $: isValid = isUsernameValid && isEmailValid && isPasswordValid;
</script>

<div class="flex w-full justify-center py-32">
  <Card class="min-w-[24rem]">
    <form method="POST" class="flex flex-col gap-4">
      {#if form}
        <Alert color="red" border>{form.message}</Alert>
      {/if}
      <div>
        <Heading tag="h6">Sign up</Heading>
        <P opacity={0.5}>Sign up to access our forum!</P>
      </div>
      <Label class="space-y-2">
        <Span>Username</Span>
        <Input
          id="username"
          name="username"
          type="text"
          bind:value={username}
          color={isUsernameValid ? 'green' : 'red'}
          required
        />
      </Label>
      <Label class="space-y-2">
        <Span>Email</Span>
        <Input
          id="email"
          name="email"
          type="text"
          bind:value={email}
          color={isEmailValid ? 'green' : 'red'}
          required
        />
      </Label>
      <Label class="space-y-2">
        <Span>Password</Span>
        <Input
          id="password"
          name="password"
          type="password"
          bind:value={password}
          color={isPasswordValid ? 'green' : 'red'}
          required
        />
      </Label>
      <div class="self-center">
        <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} formsField="captchaToken" />
      </div>
      <Button type="submit" color="primary" disabled={!isValid}>Register</Button>
    </form>
  </Card>
</div>
