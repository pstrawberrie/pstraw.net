<script>
  let { test } = $props();
</script>

<div id="activity-hero">
  <div class="inner">Activity Hero</div>
</div>

<style lang="scss">
  #activity-hero {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 100vh;
    background: var(--full-hero-gradient);
    padding: var(--nav-height) 0;
    overflow: hidden;
  }

  .inner {
    position: relative;
  }
</style>
