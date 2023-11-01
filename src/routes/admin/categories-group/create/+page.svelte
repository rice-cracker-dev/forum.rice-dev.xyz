<script lang="ts">
  import type { ActionData } from './$types';
  import { Alert, Button, Input, Label } from 'flowbite-svelte';

  export let form: ActionData;
</script>

<form method="POST" class="flex max-w-xl flex-col gap-8">
  {#if form}
    <Alert color="red" border>{form.message}</Alert>
  {/if}

  <div>
    <Label for="name" class="mb-2">Name</Label>
    <Input id="name" name="name" required />
  </div>

  <div>
    <Label for="description" class="mb-2">Description</Label>
    <Input id="description" name="description" required />
  </div>

  <div>
    <Button type="submit">Create</Button>
  </div>
</form>
