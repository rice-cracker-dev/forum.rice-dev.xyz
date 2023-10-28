<script lang="ts">
  import type { PageData } from './$types';
  import { Button } from 'flowbite-svelte';

  export let data: PageData;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 pt-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <div class="flex items-center gap-4">
      <h1 class="flex-1 text-xl font-semibold">Threads</h1>
      <Button href="/threads/create" color="blue">Create</Button>
    </div>

    <div class="flex flex-col">
      {#if data.threads.length === 0}
        <p class="italic text-primary-700 dark:text-primary-400">such emptiness</p>
      {/if}

      {#each data.threads as thread}
        <div class="border-l-2 border-gray-700 pl-4">
          <a href="/threads/view/{thread.id}" class="link">{thread.title}</a>
          <p class="text-primary-700 dark:text-primary-400">
            <span>By {thread.author.username}</span>
            <span>&#x2022;</span>
            <span>Posted on {thread.publish_date.toLocaleString()}</span>
          </p>
        </div>
      {/each}
    </div>
  </div>
</div>
