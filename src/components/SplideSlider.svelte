<script>
  import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
  import Splide from "@splidejs/splide";

  let sliderEl;

  $effect(() => {
    // must be loaded inside effect
    new Splide(sliderEl, {
      type: "loop",
      drag: "free",
      perPage: 6,
      focus: 0,
      breakpoints: {
        500: {
          perPage: 2,
        },
        680: {
          perPage: 3,
        },
        850: {
          perPage: 4,
        },
        1100: {
          perPage: 5,
        },
      },
    }).mount();
  });
</script>

<section class="splide" bind:this={sliderEl}>
  <div class="splide__track">
    <ul class="splide__list">
      <li class="splide__slide">Slide 01</li>
      <li class="splide__slide">Slide 02</li>
      <li class="splide__slide">Slide 03</li>
      <li class="splide__slide">Slide 04</li>
      <li class="splide__slide">Slide 05</li>
      <li class="splide__slide">Slide 06</li>
      <li class="splide__slide">Slide 07</li>
      <li class="splide__slide">Slide 08</li>
      <li class="splide__slide">Slide 09</li>
      <li class="splide__slide">Slide 10</li>
    </ul>
  </div>
</section>
