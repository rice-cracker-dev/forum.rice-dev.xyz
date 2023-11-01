<script lang="ts">
  import type { ActionData } from './$types';
  import { Alert, Button, Card, Heading, Input, Label, P, Span } from 'flowbite-svelte';
  import { Turnstile } from 'svelte-turnstile';
  import { PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';

  export let form: ActionData;
</script>

<div class="flex w-full justify-center py-32">
  <Card class="min-w-[24rem]">
    <form method="POST" class="flex flex-col gap-4">
      {#if form}
        <Alert color="red" border>{form.message}</Alert>
      {/if}
      <div>
        <Heading tag="h6" class="font-semibold">Sign in</Heading>
        <P opacity={0.5}>Sign in to access our forum!</P>
      </div>
      <Label class="space-y-2">
        <Span>Email</Span>
        <Input id="email" name="email" type="text" required />
      </Label>
      <Label class="space-y-2">
        <Span>Password</Span>
        <Input id="password" name="password" type="password" required />
      </Label>
      <div class="self-center">
        <Turnstile siteKey={PUBLIC_TURNSTILE_SITE_KEY} formsField="captchaToken" />
      </div>
      <Button type="submit" color="primary">Sign in</Button>
    </form>
  </Card>
</div>
