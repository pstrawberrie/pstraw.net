<script>
  let { data } = $props();
</script>

<div class="callouts">
  {#each data as callout}
    <div class={`callout ${callout.type}`}>
      {#if callout.link}
        <a href={callout.link}>{callout.text}</a>
      {/if}
      {#if !callout.link}
        {callout.text}
      {/if}
    </div>
  {/each}
</div>

<style lang="scss">
  @use "@css/util";

  :global([client] + .callouts) {
    margin-top: 1rem;
  }

  .callouts {
    display: flex;
    justify-content: flex-end;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .callout {
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
    border: 1px solid var(--c-card-border);
    font-size: 0.9rem;
    color: var(--c-text-secondary);

    a {
      text-decoration: underline;
      color: var(--c-text-secondary);
      text-decoration-color: var(--c-text-muted);
    }

    &.success,
    &.green {
      border-color: var(--c-state-success);
      background-color: rgba(var(--state-success-rgb), 0.04);
      box-shadow: 0 0 10px rgba(var(--state-success-rgb), 0.15);
    }

    &.info,
    &.yellow {
      border-color: var(--c-state-info);
      background-color: rgba(var(--state-info-rgb), 0.04);
      box-shadow: 0 0 10px rgba(var(--state-info-rgb), 0.15);
    }

    &.error,
    &.red {
      border-color: var(--c-state-error);
      background-color: rgba(var(--state-error-rgb), 0.04);
      box-shadow: 0 0 10px rgba(var(--state-error-rgb), 0.15);
    }
  }
</style>
