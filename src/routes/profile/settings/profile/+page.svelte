<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { Alert, Button, Label, Textarea } from 'flowbite-svelte';

  export let data: PageData;
  export let form: ActionData;
</script>

<form class="flex flex-col gap-8" method="POST">
  {#if form}
    <Alert color="red" border>{form.message}</Alert>
  {/if}
  <div>
    <Label for="bio" class="mb-2">Bio</Label>
    <Textarea id="bio" name="bio" rows={10} value={data.userData.bio ?? ''} />
  </div>
  <div>
    <Label for="signature" class="mb-2">Signature</Label>
    <Textarea id="signature" name="signature" rows={10} value={data.userData.signature ?? ''} />
  </div>
  <div class="flex flex-row-reverse gap-4">
    <Button type="submit" color="blue">Save</Button>
  </div>
</form>
