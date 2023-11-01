<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { Alert, Button, Input, Label, MultiSelect, Select } from 'flowbite-svelte';

  export let data: PageData;
  export let form: ActionData;

  let selectedCategoryGroupId: string | null;

  $: items = data.categoryGroups.map((o) => ({ value: o.id, name: o.name }));
  $: categoryItems = data.categories.map((o) => ({ value: o.id, name: o.name }));
  $: selectedCategoryGroup = data.categoryGroups.find((o) => o.id === selectedCategoryGroupId);
</script>

<form method="POST" class="flex max-w-xl flex-col gap-8">
  {#if form}
    <Alert color="red" border>{form.message}</Alert>
  {/if}

  <div>
    <Label for="id" class="mb-2">Group</Label>
    <Select
      id="id"
      name="id"
      {items}
      placeholder="Select a group."
      bind:value={selectedCategoryGroupId}
      required
    />
  </div>

  {#if selectedCategoryGroup}
    <div>
      <Label for="name" class="mb-2">Name</Label>
      <Input id="name" name="name" value={selectedCategoryGroup.name} required />
    </div>

    <div>
      <Label for="description" class="mb-2">Description</Label>
      <Input
        id="description"
        name="description"
        value={selectedCategoryGroup.description}
        required
      />
    </div>

    <div>
      <Label for="order" class="mb-2">Order</Label>
      <Input id="order" name="order" type="number" value={selectedCategoryGroup.order} required />
    </div>

    <div>
      <Label for="name" class="mb-2">Categories</Label>
      <MultiSelect
        id="categories"
        name="categories"
        items={categoryItems}
        value={selectedCategoryGroup.categories
          .filter((o) => data.categories.find((e) => e.id === o.id))
          .map((o) => o.id)}
      />
    </div>
  {/if}

  <div>
    <Button type="submit">Edit</Button>
  </div>
</form>
