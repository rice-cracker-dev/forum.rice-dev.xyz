<script lang="ts">
  import type { PageData } from './$types';
  import { Button, Heading, P } from 'flowbite-svelte';
  import Post from '$lib/components/Post.svelte';
  import { validateCategoryPermission } from '$lib/helper';

  export let data: PageData;
</script>

<div class="flex w-full flex-col items-center gap-16 px-4 py-32">
  <div class="flex w-full max-w-7xl flex-col gap-8">
    <div class="flex items-center gap-4">
      <div class="flex-1 space-y-1">
        <Heading tag="h3">
          {data.thread.title}
        </Heading>
        <P class="opacity-50">
          Published on {data.thread.publish_date.toLocaleDateString()}
        </P>
      </div>

      {#if validateCategoryPermission(data.user, data.thread.category.is_admin_only, data.thread.category.is_premium_only)}
        <Button type="button" color="primary" href="/threads/view/{data.thread.id}/reply">
          Reply
        </Button>
      {/if}
    </div>

    <div class="flex flex-col gap-8">
      {#each data.thread.posts as post}
        <Post {post} />
      {/each}
    </div>
  </div>
</div>
