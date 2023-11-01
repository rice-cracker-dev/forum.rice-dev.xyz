<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { Alert, Button, Checkbox, Input, Label, Select } from 'flowbite-svelte';

  export let data: PageData;
  export let form: ActionData;

  let selectedCategoryId: string | null;

  $: items = data.categories.map((o) => ({ value: o.id, name: o.name }));
  $: selectedCategory = data.categories.find((o) => o.id === selectedCategoryId);
</script>

<form method="POST" class="flex max-w-xl flex-col gap-8">
  {#if form}
    <Alert color="red" border>{form.message}</Alert>
  {/if}

  <div>
    <Label for="id" class="mb-2">Category</Label>
    <Select
      id="id"
      name="id"
      {items}
      placeholder="Select a category."
      bind:value={selectedCategoryId}
      required
    />
  </div>

  {#if selectedCategory}
    <div>
      <Label for="name" class="mb-2">Name</Label>
      <Input id="name" name="name" value={selectedCategory.name} required />
    </div>

    <div>
      <Label for="description" class="mb-2">Description</Label>
      <Input id="description" name="description" value={selectedCategory.description} required />
    </div>

    <div>
      <Label for="order" class="mb-2">Order</Label>
      <Input id="order" name="order" type="number" value={selectedCategory.order} required />
    </div>

    <div>
      <Checkbox
        id="premiumOnly"
        name="premiumOnly"
        class="mb-2"
        checked={selectedCategory.is_premium_only}
      >
        Premium only
      </Checkbox>
      <Checkbox id="adminOnly" name="adminOnly" checked={selectedCategory.is_admin_only}>
        Admin only
      </Checkbox>
    </div>
  {/if}

  <div>
    <Button type="submit">Edit</Button>
  </div>
</form>
