<script lang="ts">
  let {
    title,
    link = undefined,
    subtitle = undefined,
    description = undefined,
    image = undefined,
  } = $props();
</script>

<!-- Content Render -->
{#snippet content()}
  <div class="top">
    <div class="title">
      {title}
    </div>
    {#if subtitle}
      <div class="subtitle">{subtitle}</div>
    {/if}
    {#if description}
      <div class="description">
        {description}
      </div>
    {/if}
  </div>
  <div class="bottom"></div>
{/snippet}

<!-- Card Wrappers (<a> or <div>) -->
{#if link}
  <a class="card generic-card" href={link}>{@render content()}</a>
{/if}
{#if !link}
  <div class="card generic-card">
    {@render content()}
  </div>
{/if}

<style lang="scss">
  @use "@css/util";

  .generic-card {
    flex-direction: column;
    background: var(--c-card-background);
    border: 1px solid var(--c-card-border);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--c-card-primary-highlight);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &::after {
      box-shadow: var(--c-card-primary-boxshadow);
    }

    &:hover::before {
      transform: scaleX(1);
    }
  }

  .top {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 0.5rem;
  }

  .title {
    font-size: 1.5rem;
    font-weight: bold;
    font-family: var(--font-family-title);
    text-align: center;
  }

  .subtitle {
    text-align: center;
    color: var(--c-text-secondary);
  }

  .description {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    margin-top: 0.5rem;
    font-size: 1rem;
    color: var(--c-text-muted);
    text-align: center;
    border-top: 1px solid var(--c-card-border);
    padding-top: 1rem;
    line-height: 1.4;
  }
</style>
