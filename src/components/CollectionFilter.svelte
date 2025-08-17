<script lang="ts">
  import { SERVER_URL } from "@env";

  let { title = "Filter", filterFields = [] } = $props();

  let currentFilter = $state(null);
  let previousFilter = $state(null);
  let result = $state([]);

  function onFilterChange(e) {
    console.log(e.target.value);
  }
</script>

<div class="collection-filter">
  <div class="title">{title}</div>
  <div class="filters"></div>
  {#each filterFields as f}
    {#if f.type === "select"}
      <select id={f.name} name={f.name} onchange={onFilterChange}>
        {#each f.options as o}
          <option value={o}>{o}</option>
        {/each}
      </select>
    {/if}
  {/each}
</div>
