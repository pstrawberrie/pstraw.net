<script>
  import { minutesToHours, getRelativeTime } from "@util";
  import SVG from "@components/SVG.svelte";
  let { itemData, exact = undefined, displayLastWatched = false } = $props();
  const id = itemData.id;
  const data = itemData.data ? itemData.data : itemData;
  const isMovie = itemData.collection === "movies";
  const tmdbUrl = `https://www.themoviedb.org/${isMovie ? "movie" : "tv"}/${id}`;

  // Runtime
  const episodeRuntimeArr = isMovie ? null : JSON.parse(data.episode_run_time);
  const runtime = isMovie
    ? minutesToHours(data.runtime)
    : minutesToHours(
        parseInt(episodeRuntimeArr[episodeRuntimeArr.length - 1], 10),
      );

  // Recently Watched Time
  const lastWatchedRelative = getRelativeTime(
    data?.updatedAt || data.createdAt,
  );
</script>

<a
  class="card tmdb-card"
  data-exact={exact}
  href={tmdbUrl}
  data-movie-id={isMovie ? id : undefined}
  data-show-id={isMovie ? undefined : id}
>
  <div class="top">
    <div class="poster">
      <img src={`/images/tmdb/${id}.webp`} alt="" loading="lazy" />
    </div>
    <div class="info">
      <h3 class="title">
        {data.title}
        {#if displayLastWatched}
          <span class="last-watched">Watched {lastWatchedRelative}</span>
        {/if}
      </h3>
      <div class="genres">
        {#each JSON.parse(data.genres) as g}
          <span class="genre" data-test={data.genres}>{g.name}</span>
        {/each}
      </div>
      <p class="overview">{data.overview}</p>
    </div>
  </div>

  <div class="bottom">
    <div class="left">
      <div class="type">
        <SVG name={isMovie ? "movie" : "tv"} /> &nbsp;{isMovie
          ? "Movie"
          : "Show"}
      </div>
      <div class="year">
        {new Date(
          isMovie ? data.release_date : data.first_air_date,
        ).getFullYear()}
      </div>
      <div class="language">
        {data.original_language.toUpperCase()}
      </div>
    </div>

    {#if runtime.length > 1 || data.rating !== "Unknown"}
      <div class="right">
        {#if runtime.length > 1}
          <div class="length">
            {runtime}
          </div>
        {/if}

        {#if data.rating !== "Unknown"}
          <div class="rating">
            <span>{data.rating}</span>
          </div>
        {/if}
      </div>
    {/if}
  </div>
</a>

<style lang="scss">
  @use "@css/util";

  .tmdb-card {
    position: relative;
    flex-direction: column;
    gap: 1rem;
    border-color: var(--c-card-border);
    background-color: var(--c-card-background);
    backdrop-filter: blur(10px);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: var(--c-card-tertiary-highlight);
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &::after {
      box-shadow: var(--c-card-tertiary-boxshadow);
    }

    &:hover {
      img {
        transform: scale(1.05);
      }

      &::before {
        transform: scaleX(1);
      }
    }

    &[data-exact] {
      border-color: var(--c-tertiary);
    }
  }

  .top {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    text-align: center;

    @include util.mq(md) {
      flex-direction: row;
      text-align: left;
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .poster {
    position: relative;
    width: 150px;
    height: 225px;
    flex-shrink: 0;
    margin: 0 auto;
    border-radius: 0.375rem;
    overflow: hidden;

    @include util.mq(md) {
      width: 120px;
      height: 180px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .overview {
    display: -webkit-box;
    color: var(--c-text-secondary);
    line-height: 1.4;
    font-size: 0.9rem;
    margin: 0;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    line-clamp: 5;
    -webkit-line-clamp: 4;
    overflow: hidden;
  }

  .genres {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    @include util.mq(md) {
      justify-content: flex-start;
    }
  }

  .genre {
    background-color: var(--c-card-content-background);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    font-family: var(--font-family-mono);
    color: var(--c-card-content-background-text);
  }

  .title {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    font-size: 1.25rem;
    font-weight: bold;

    span {
      font-size: 0.7rem;
      color: var(--c-text-tertiary);
    }
  }

  .bottom {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding-top: 0.5rem;
    border-top: 1px solid var(--c-card-separator);
    margin-top: auto;
    font-size: 0.8rem;
    font-family: var(--font-family-mono);
    color: var(--c-text-muted);

    .left,
    .right {
      display: flex;
      gap: 0.75rem;
    }
  }

  .type {
    position: relative;
    display: flex;
    align-items: center;
    color: var(--c-tertiary);

    :global(svg) {
      position: relative;
      height: 12px;
      width: auto;
      fill: var(--c-tertiary);
    }
  }

  .language {
    text-transform: uppercase;
  }
</style>
