<script lang="ts">
  let { title, subtitle = undefined, color = undefined, children } = $props();
  const colorClass = color ? "text-gradient header-" + color : "";
</script>

<div class="hero">
  <div class="container">
    <div class="hero_text">
      <h1><span class={colorClass}>{title}</span></h1>
      <p>{subtitle}</p>
    </div>
  </div>
  {@render children?.()}
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
    margin-bottom: 0.35rem;
    line-height: 1.1;
  }

  p {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    font-weight: 500;
    font-size: 1.25rem;
    color: var(--c-text-secondary);
  }
</style>
