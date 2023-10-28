<script lang="ts">
  import Navbar from '$lib/components/Navbar.svelte';

  import '@fontsource-variable/outfit';
  import '../app.css';
</script>

<main>
  <Navbar />
  <slot />
</main>
