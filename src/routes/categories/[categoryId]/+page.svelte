<script lang="ts">
  import type { PageData } from './$types';
  import {
    A,
    Button,
    ButtonGroup,
    Heading,
    P,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
  } from 'flowbite-svelte';
  import { goto } from '$app/navigation';
  import { validateCategoryPermission } from '$lib/helper';

  export let data: PageData;

  $: currentPage = data.page;
  $: totalPages = Math.ceil(data.category._count.threads / data.take);
  $: previous = () => {
    if (currentPage <= 0) {
      return;
    }

    goto(`/categories/${data.category.id}?page=${currentPage - 1}`);
  };
  $: next = () => {
    if (currentPage >= totalPages - 1) {
      return;
    }

    goto(`/categories/${data.category.id}?page=${currentPage + 1}`);
  };
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <div class="flex items-center gap-4">
      <Heading tag="h6" class="flex-1">Threads</Heading>
      {#if validateCategoryPermission(data.user, data.category.is_admin_only, data.category.is_premium_only)}
        <Button href="/threads/create?category={data.category.id}" color="primary">
          Create thread
        </Button>
      {/if}
    </div>

    <Table>
      <TableHead defaultRow={false}>
        <tr>
          <TableHeadCell colspan="4" class="normal-case">
            <Heading tag="h6">{data.category.name}</Heading>
            <P size="sm" opacity={0.5}>{data.category.description}</P>
          </TableHeadCell>
        </tr>
        <tr>
          <TableHeadCell class="w-1/2">Threads</TableHeadCell>
          <TableHeadCell class="text-center">Replies</TableHeadCell>
          <TableHeadCell class="text-center">Views</TableHeadCell>
          <TableHeadCell>Published date</TableHeadCell>
        </tr>
      </TableHead>
      <TableBody>
        {#if data.category.threads.length === 0}
          <TableBodyRow>
            <TableBodyCell>such emptiness</TableBodyCell>
            <TableBodyCell />
            <TableBodyCell />
            <TableBodyCell />
          </TableBodyRow>
        {/if}
        {#each data.category.threads as thread}
          <TableBodyRow>
            <TableBodyCell>
              <A href="/threads/view/{thread.id}">{thread.title}</A>
              <p class="font-normal text-gray-700 dark:text-white/50">
                By <A href="/users/{thread.author_id}">{thread.author.username}</A>
              </p>
            </TableBodyCell>
            <TableBodyCell class="text-center">{thread._count.posts - 1}</TableBodyCell>
            <TableBodyCell class="text-center">{thread.views}</TableBodyCell>
            <TableBodyCell>
              {thread.publish_date.toLocaleTimeString()} - {thread.publish_date.toLocaleDateString()}
            </TableBodyCell>
          </TableBodyRow>
        {/each}
      </TableBody>
    </Table>

    <ButtonGroup>
      <Button on:click={previous} color="light">Prev</Button>
      <Button on:click={next} color="light">Next</Button>
    </ButtonGroup>
  </div>
</div>
