<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import { Alert, Button, Input, Label } from 'flowbite-svelte';

  export let data: PageData;
  export let form: ActionData;
</script>

<form class="flex flex-col gap-8" method="POST">
  {#if form}
    <Alert color="red" border>{form.message}</Alert>
  {/if}
  <div class="flex flex-col gap-2">
    <Label for="changePassword">Change password</Label>
    <Input id="changePassword" name="changePassword" type="password" rows={10} value="" />
    <div class="flex flex-row-reverse gap-4">
      <Button type="submit" formaction="?/changePassword" color="primary">Save</Button>
    </div>
  </div>
  <div class="flex flex-col gap-2">
    <Label for="changeUsername">Change username</Label>
    <Input id="changeUsername" name="changeUsername" rows={10} value={data.user.username} />
    <div class="flex flex-row-reverse gap-4">
      <Button type="submit" formaction="?/changeUsername" color="primary">Save</Button>
    </div>
  </div>
</form>
