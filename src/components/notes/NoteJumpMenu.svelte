<script>
  let { title = "Jump to", links } = $props();

  let selectEl;
  function onSelect(e) {
    e.preventDefault();
    window.location.hash = selectEl.value.toLowerCase().replaceAll(" ", "-");
  }
</script>

<div class="note-jump-wrapper">
  <div class="note-jump-menu">
    <div class="title">{title}</div>
    <select
      name="note-jump"
      id="note-jump"
      bind:this={selectEl}
      onchange={onSelect}
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
    display: flex;
    justify-content: flex-end;
    top: calc(var(--nav-height) + 1rem);
    left: 0;
    z-index: 3;
  }

  .note-jump-menu {
    position: relative;
    display: inline-flex;
    align-items: center;
    padding: 0.75rem;
    gap: 0.5rem;
    background-color: var(--c-card-background);
    border: 1px solid var(--c-card-border);
    border-radius: 0.25rem;

    &::after {
      content: "▼";
      position: absolute;
      right: 1.2rem;
      top: 50%;
      transform: translateY(-50%);
      font-size: 0.6rem;
      color: var(--c-text);
      pointer-events: none;
    }
  }

  .title {
    font-size: 1rem;
    flex-shrink: 0;
  }

  select {
    position: relative;
    margin-right: auto;
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.25rem 1.5rem 0.25rem 0.5rem;
    width: 100%;
    text-align: left;
    background-color: var(--c-text-quaternary);
    border: 0;
    border-radius: 0.25rem;
    color: var(--c-text);

    option {
      background-color: var(--c-text-quaternary);
      color: var(--c-text);
    }
  }
</style>
