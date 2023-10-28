<script>
  import { Button, Card, Input, Label } from 'flowbite-svelte';
  import { strIsEmail } from '$lib/helper';

  let username = '';
  let email = '';
  let password = '';

  $: isUsernameValid = /^[a-zA-Z0-9]{4,30}$/.test(username);
  $: isEmailValid = strIsEmail(email.toLowerCase());
  $: isPasswordValid = password.length >= 8
  $: isValid = isUsernameValid && isEmailValid && isPasswordValid;
</script>

<div class="flex w-full justify-center pt-32">
  <Card class="min-w-[24rem]">
    <form method="POST" class="flex flex-col gap-4">
      <div>
        <h1 class="font-semibold">Sign up</h1>
        <p class="opacity-50">Sign up to access our forum!</p>
      </div>
      <Label class="space-y-2">
        <span>Username</span>
        <Input id="username" name="username" type="text" bind:value={username} color={isUsernameValid ? 'green' : 'red'} required />
      </Label>
      <Label class="space-y-2">
        <span>Email</span>
        <Input id="email" name="email" type="text" bind:value={email} color={isEmailValid ? 'green' : 'red'} required />
      </Label>
      <Label class="space-y-2">
        <span>Password</span>
        <Input id="password" name="password" type="password" bind:value={password} color={isPasswordValid ? 'green' : 'red'} required />
      </Label>
      <Button type="submit" color="blue" disabled={!isValid}>Register</Button>
    </form>
  </Card>
</div>
