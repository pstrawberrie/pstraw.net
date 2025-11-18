<script>
  import "@splidejs/splide/dist/css/themes/splide-skyblue.min.css";
  import Splide from "@splidejs/splide";

  const { data } = $props();

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
      {#each data as d, i}
        {#if i < 14}
          <li class="splide__slide">
            <div class="media-slide">
              <img src={`/images/tmdb/${d.id}.webp`} alt="" loading="lazy" />
            </div>
          </li>
        {/if}
      {/each}
    </ul>
  </div>
</section>

<style lang="scss">
  .media-slide {
    // width: 75px;

    img {
      max-width: 100%;
      height: auto;
    }
  }
</style>
