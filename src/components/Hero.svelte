<script>
  let { text, subtext, bgcolor, color } = $props();
</script>

<div
  class="hero"
  style={`background-color: ${bgcolor ? bgcolor : "transparent"}; color: ${color ? color : "var(--font-color)"};`}
>
  <div class="contain">
    <h1 class="text">{text}</h1>
    <div class="subtext p">{subtext}</div>
  </div>
  <slot />
</div>

<style lang="scss">
  @use "@css/util";

  .hero {
    padding-top: 0.8em;
    padding-bottom: 0.6em;
    margin-bottom: 1rem;
    text-align: center;
  }

  .text {
    text-decoration: underline;
  }

  .subtext {
    text-transform: uppercase;
    font-size: 0.88rem;
    margin-top: 0.2rem;

    @include util.mq(sm) {
      font-size: 1rem;
    }
  }

  :global(.page-menu) {
    margin-top: 1rem;
  }
</style>
