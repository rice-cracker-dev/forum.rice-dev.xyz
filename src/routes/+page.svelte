<script lang="ts">
  import type { PageData } from './$types';
  import {
    Button,
    Heading,
    P,
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

    <div class="flex flex-col gap-8">
      {#each data.categoryGroups as categoryGroup}
        <Table>
          <TableHead defaultRow={false}>
            <tr>
              <TableHeadCell colspan="4" class="normal-case">
                <Heading tag="h6">{categoryGroup.name}</Heading>
                <P size="sm" opacity={0.5}>{categoryGroup.description}</P>
              </TableHeadCell>
            </tr>
            <tr>
              <TableHeadCell>Categories</TableHeadCell>
              <TableHeadCell>Threads</TableHeadCell>
              <TableHeadCell>Last thread</TableHeadCell>
            </tr>
          </TableHead>
          <TableBody>
            {#each categoryGroup.categories as category}
              <TableBodyRow>
                <TableBodyCell class="w-2/3">
                  <A href="/categories/{category.id}">
                    {category.name}
                  </A>
                  <P size="sm" class="opacity-50">{category.description}</P>
                </TableBodyCell>
                <TableBodyCell>{category._count.threads}</TableBodyCell>
                <TableBodyCell>
                  {#if category.last_thread}
                    <a href="/threads/view/{category.last_thread.id}" class="line-clamp-1">
                      {category.last_thread.title}
                    </a>
                    <P size="sm" class="line-clamp-1 text-gray-900 dark:text-white/50">
                      By <A href="/users/{category.last_thread.author_id}">
                        {category.last_thread.author.username}
                      </A>
                    </P>
                  {:else}
                    <P>N/A</P>
                  {/if}
                </TableBodyCell>
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      {/each}
    </div>
  </div>
</div>
