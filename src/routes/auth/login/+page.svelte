<script>
  import { Button, Card, Input, Label } from 'flowbite-svelte';
</script>

<div class="flex w-full justify-center pt-32">
  <Card class="min-w-[24rem]">
    <form method="POST" class="flex flex-col gap-4">
      <div>
        <h1 class="font-semibold">Sign in</h1>
        <p class="opacity-50">Sign in to access our forum!</p>
      </div>
      <Label class="space-y-2">
        <span>Email</span>
        <Input id="email" name="email" type="text" required />
      </Label>
      <Label class="space-y-2">
        <span>Password</span>
        <Input id="password" name="password" type="password" required />
      </Label>
      <Button type="submit" color="blue">Sign in</Button>
    </form>
  </Card>
</div>
