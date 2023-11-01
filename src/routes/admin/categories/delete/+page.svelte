<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { Alert, Button, Label, MultiSelect } from 'flowbite-svelte';

  export let data: PageData;
  export let form: ActionData;

  $: items = data.categories.map((o) => ({ value: o.id, name: o.name }));
</script>

<form method="POST" class="flex max-w-xl flex-col gap-8">
  {#if form}
    <Alert color="red" border>{form.message}</Alert>
  {/if}

  <div>
    <Label for="ids" class="mb-2">Category</Label>
    <MultiSelect id="ids" name="ids" {items} required placeholder="Select a category." />
  </div>

  <div>
    <Button type="submit" color="red">Delete</Button>
  </div>
</form>
