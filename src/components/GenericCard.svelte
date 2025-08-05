<script lang="ts">
  let { title, subtitle = undefined, image = undefined } = $props();
</script>

<div class="card generic-card">
  <div class="top">
    <div class="title"></div>
    <div class="subtitle"></div>
  </div>
  <div class="bottom"></div>
</div>

<style lang="scss">
  @use "@css/util";
</style>
