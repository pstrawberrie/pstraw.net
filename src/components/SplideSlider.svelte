<script>
  import "@splidejs/splide/css";
  import Splide from "@splidejs/splide";

  let sliderEl;

  $effect(() => {
    // must be loaded inside effect
    new Splide(sliderEl, {
      type: "loop",
      gap: "20vw",
      focus: "center",
    }).mount();
  });
</script>

<section
  class="splide"
  aria-label="Splide Basic HTML Example"
  bind:this={sliderEl}
>
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 01</li>
      <li class="splide__slide">Slide 02</li>
      <li class="splide__slide">Slide 03</li>
    </ul>
  </div>
</section>

<style>
  .splide {
    background: #f0f;
  }
</style>
