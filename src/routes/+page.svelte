<script lang="ts">
  import type { PageData } from './$types';
  import {
    Button,
    Heading,
    A,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from 'flowbite-svelte';

  export let data: PageData;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <div class="flex items-center gap-4">
      <Heading tag="h6" class="flex-1">Categories</Heading>
      {#if data.user?.is_admin}
        <Button href="/admin/categories/create" color="light">Create category</Button>
        <Button href="/admin/categories-group/create" color="light">Create group</Button>
      {/if}
    </div>

    {#each data.categoryGroups as categoryGroup}
      <Table>
        <caption
          class="mb-4 text-left text-lg font-semibold tracking-wide text-gray-900 dark:text-white"
        >
          {categoryGroup.name}
          <p class="text-sm font-normal text-gray-700 dark:text-white/50">
            {categoryGroup.description}
          </p>
        </caption>
        <TableHead>
          <TableHeadCell class="w-1/2">Category</TableHeadCell>
          <TableHeadCell>Last thread</TableHeadCell>
        </TableHead>

        <TableBody class="divide-y">
          {#each categoryGroup.categories as category}
            <TableBodyRow>
              <TableBodyCell>
                <div>
                  <A href="/categories/{category.id}">{category.name}</A>
                  <p class="line-clamp-1 font-normal text-gray-700 dark:text-white/50">
                    {category.description}
                  </p>
                </div>
              </TableBodyCell>
              <TableBodyCell>
                <div>
                  {#if category.last_thread}
                    <A href="/threads/view/{category.last_thread.id}">
                      {category.last_thread.title}
                    </A>
                    <p class="font-normal text-gray-700 dark:text-white/50">
                      By <A href="/users/{category.last_thread.author_id}">
                        {category.last_thread.author.username}
                      </A>
                    </p>
                  {:else}
                    <p class="text-gray-900 dark:text-white">N/A</p>
                  {/if}
                </div>
              </TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    {/each}
  </div>
</div>
