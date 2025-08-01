<script lang="ts">
  let { title, subtitle = undefined, links = [] } = $props();
</script>

<div class="hero">
  <div class="container">
    <div class="hero_text">
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </div>
  </div>
  <slot />
</div>

<style lang="scss">
  @use "@css/util";

  .hero {
    padding-top: var(--space-box-v);
    padding-bottom: var(--space-page-v);
    background: var(--hero-gradient);
    border-bottom: 1px solid rgba(var(--background-accent-rgb), 0.15);
    text-align: center;
  }

  h1 {
    font-size: var(--font-size-h1-sm);
    line-height: var(--line-height-h1-sm);
    margin-bottom: 1rem;
  }

  p {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 500;
    color: var(--c-text-secondary);
  }
</style>
