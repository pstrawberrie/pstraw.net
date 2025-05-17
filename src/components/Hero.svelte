<script>
  let { text, subtext, bgcolor, color } = $props();
</script>

<div
  class="hero"
  style={`background-color: ${bgcolor ? bgcolor : "transparent"}; color: ${color ? color : "var(--c-black;"};`}
>
  <div class="contain">
    <div class="text h1">{text}</div>
    <div class="subtext p">{subtext}</div>
  </div>
  <slot />
</div>

<style lang="scss">
  .hero {
    padding-top: 0.8em;
    padding-bottom: 0.6em;
    margin-bottom: 1rem;
    text-align: center;
  }

  .subtext {
    line-height: 1.2;
  }

  :global(.page-menu) {
    margin-top: 1rem;
  }
</style>
