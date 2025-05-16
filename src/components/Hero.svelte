<script>
  let { text, subtext, bgcolor, color } = $props();
</script>

<div
  class="hero contain"
  style={`background-color: ${bgcolor ? bgcolor : "transparent"}; color: ${color ? color : "var(--c-black;"};`}
>
  <div class="top">
    <div class="text h1">{text}</div>
    <div class="subtext p">{subtext}</div>
    <slot />
  </div>
</div>

<style lang="scss">
  .hero {
    padding-top: 0.8em;
    padding-bottom: 0.6em;
    margin-bottom: 2rem;
    text-align: center;
  }

  .subtext {
    line-height: 1;
  }

  :global(.subtext + .page-menu) {
    margin-top: 1rem;
  }
</style>
