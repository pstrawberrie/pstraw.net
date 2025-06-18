<script>
  let { title = "Jump to Section", links } = $props();

  let selectEl;
  function onSelect() {
    window.location.hash = selectEl.value.toLowerCase().replaceAll(" ", "-");
  }
</script>

<div class="note-jump-wrapper">
  <div class="note-jump-menu">
    <h2>{title}:</h2>
    <select
      name="note-jump"
      id="note-jump"
      bind:this={selectEl}
      onchange={(e) => onSelect()}
    >
      {#each links as l}
        <option>{l.title}</option>
      {/each}
    </select>
  </div>
</div>

<style lang="scss">
  @use "@css/util";

  .note-jump-wrapper {
    position: sticky;
    display: block;
    top: var(--nav-height);
    margin-bottom: 2rem;
    z-index: 3;
    max-width: 90%;
  }

  :global(.callout + [client] .note-jump-wrapper) {
    margin-top: 1rem;
  }

  .note-jump-menu {
    position: relative;
    display: inline-block;
    padding: 0.45rem;
    background-color: var(--c-tertiary-t2);
    border: 5px solid var(--c-tertiary-s1);
    color: var(--c-black);
  }

  h2 {
    font-size: 1.1rem;
    text-decoration: none;
    text-transform: uppercase;
    margin-bottom: 0.25rem;
  }

  select {
    margin-right: auto;
    font-size: 1.1rem;
    padding: 0.1em 0.25em;
    width: 100%;
    font-weight: bold;

    &:focus-visible {
      background-color: var(--c-tertiary-t2);
      color: var(--c-black);
    }
  }
</style>
