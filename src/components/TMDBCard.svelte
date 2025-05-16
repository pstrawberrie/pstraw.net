<script>
  import { minutesToHours } from "@util";
  import SVG from "@components/SVG.svelte";
  let { itemData } = $props();
  const id = itemData.id;
  const data = itemData.data ? itemData.data : itemData;
  const isMovie = itemData.collection === "movies";
  const tmdbUrl = `https://www.themoviedb.org/${isMovie ? "movie" : "tv"}/${id}`;

  // CreatedAt Date
  const createdAtDate = new Date(data.createdAt).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  // Runtime
  const episodeRuntimeArr = isMovie ? null : JSON.parse(data.episode_run_time);
  const runtime = isMovie
    ? minutesToHours(data.runtime)
    : minutesToHours(
        parseInt(episodeRuntimeArr[episodeRuntimeArr.length - 1], 10),
      );
</script>

<a
  class="card tmdb"
  href={tmdbUrl}
  data-movie-id={isMovie ? id : undefined}
  data-show-id={isMovie ? undefined : id}
>
  <div class="top">
    <img src={`/images/tmdb/${id}.webp`} alt="" loading="lazy" />
    <div class="details">
      <div class="title">{data.title}</div>
      <div class="info">
        {#each JSON.parse(data.genres) as g}
          <span>{g.name}</span>
        {/each}
      </div>

      <div class="overview truncate-3">{data.overview}</div>
    </div>
  </div>

  <div class="bottom">
    <div>
      <SVG name={isMovie ? "movie" : "tv"} /> &nbsp;{isMovie ? "Movie" : "Show"}
      <i>|</i>
      <span
        ><b
          >{new Date(
            isMovie ? data.release_date : data.first_air_date,
          ).getFullYear()}</b
        ></span
      >
      <i>|</i>
      {data.original_language.toUpperCase()}
    </div>

    <div>
      {#if runtime.length > 1}{runtime}{/if}
      {#if data.rating !== "Unknown" && runtime.length > 1}<i>|</i>{/if}
      {#if data.rating !== "Unknown"}<span>{data.rating}</span>{/if}
    </div>
  </div>
</a>

<style lang="scss">
  @use "@css/util";

  .card.tmdb {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    background-color: var(--font-color-opposite);
    border: 1px solid var(--c-tertiary-s2);
    border-radius: 0.15rem;
    box-shadow: 0 1px 2px #0000;
    transform: scale(1);
    transition:
      transform 0.15s ease-out,
      box-shadow 0.18s ease-out;

    &::after {
      display: none;
    }

    &:hover {
      // box-shadow: 0px 5px 17px 4px rgba(0, 0, 0, 0.61);
      transform: translateY(-2px);
      z-index: 2;
    }

    img {
      align-self: center;
      min-width: 80px;

      @include util.mq(sm) {
        min-width: 100px;
      }
    }

    .top {
      position: relative;
      display: flex;
      flex-wrap: nowrap;
      height: 100%;
      padding: 0.7rem;
      gap: 1rem;
    }

    .details {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .title {
      font-weight: bold;
      font-size: 1.2rem;
      line-height: 1.2;
    }

    .info {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 5px;
      font-size: 0.75rem;
      opacity: 0.6;
      pointer-events: none;

      span {
        padding: 2px 4px;
        border: 1px solid var(--c-tertiary-s2);
        border-radius: 2px;
      }
    }

    .overview {
      margin-top: 1rem;
      font-size: 0.9rem;
      line-height: 1.1;
    }

    .bottom {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding: 0.5rem 0.7rem 0.3rem 0.7rem;
      font-size: 0.8rem;
      font-weight: bold;
      border-top: 3px solid var(--content-subtle);

      i {
        position: relative;
        opacity: 0.4;
        margin: 0 3px;
        font-style: normal;
      }

      :global(svg) {
        position: relative;
        top: -2px;
        width: 14px;
        fill: var(--font-color);
      }
    }
  }
</style>
