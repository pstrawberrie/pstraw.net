<script lang="ts">
  import { SERVER_URL, MEDIA_DATA, MOVIE_DATA, SHOW_DATA } from "@env";
  import SVG from "@components/SVG.svelte";

  let { title = undefined, type = "all", color = "quinary" } = $props();

  let filterType = $state(type);
  let yearOptions = $state([]);
  let genreOptions = $state([]);
  let ratingOptions = $state([]);

  let currentFilter = $state(null);
  let previousFilter = $state(null);
  let result = $state([]);

  // Initial Option Setup
  function updateOptions() {
    if (filterType === "all") {
      genreOptions = MEDIA_DATA.genres;
      yearOptions = MEDIA_DATA.years;
      ratingOptions = MEDIA_DATA.ratings;
    }

    if (filterType === "movies") {
      genreOptions = MOVIE_DATA.genres;
      yearOptions = MOVIE_DATA.years;
      ratingOptions = MOVIE_DATA.ratings;
    }

    if (filterType === "shows") {
      genreOptions = SHOW_DATA.genres;
      yearOptions = SHOW_DATA.years;
      ratingOptions = SHOW_DATA.ratings;
    }
  }

  // On Selection Changes
  function onMediaTypeChange(e) {
    filterType = e.target.value;
    updateOptions();
  }

  function onMediaYearChange(e) {
    console.log(e.target.value);
  }

  function onMediaGenreChange(e) {
    console.log(e.target.value);
  }

  function onMediaRatingChange(e) {
    console.log(e.target.value);
  }

  $effect(() => {
    // update options on initial load
    updateOptions();
  });
</script>

<div class="media-filter" style={`--filter-color: var(--c-${color})`}>
  <div class="inner">
    <div class="title">
      <SVG name="filter" />
      {#if title}
        <span>{title}</span>
      {/if}
    </div>
    <div class="filters">
      <div class="select-wrap">
        <select id="media-type" name="media-type" onchange={onMediaTypeChange}>
          <option value="all">All Media</option>
          <option value="movies">Movies</option>
          <option value="shows">Shows</option>
        </select>
      </div>

      <div class="select-wrap">
        <select
          id="media-genre"
          name="media-genre"
          onchange={onMediaGenreChange}
        >
          <option value="all">All Genres</option>

          {#each genreOptions as g}
            <option value={g}>{g}</option>
          {/each}
        </select>
      </div>

      <div class="select-wrap">
        <select id="media-year" name="media-year" onchange={onMediaYearChange}>
          <option value="all">All Years</option>

          {#each yearOptions as y}
            <option value={y}>{y}</option>
          {/each}
        </select>
      </div>

      <div class="select-wrap">
        <select
          id="media-rating"
          name="media-rating"
          onchange={onMediaRatingChange}
        >
          <option value="all">All Ratings</option>

          {#each MEDIA_DATA.ratings as r}
            <option value={r}>{r}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .media-filter {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 0 0 3rem;
    font-size: 0.9rem;
    color: var(--c-text-secondary);
  }

  .inner {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 1px solid var(--c-card-border);
    border-top: 0;
    background: var(--c-button-background-hover);
  }

  .title {
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      display: inline-block;
      margin-left: 0.5rem;
    }

    :global(svg) {
      width: 1rem;
      height: 1rem;
      fill: var(--filter-color);
    }
  }

  .filters {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 0.75rem;
  }

  select {
    padding: 0.3rem 1.25rem 0.3rem 0.69rem;
    background: var(--c-card-content-background);
    border-radius: 0.25rem;
    border: 1px solid rgba(var(--background-accent-rgb), 0.25);
    line-height: 1;
    font-weight: 500;

    option {
      color: black;
    }
  }

  .select-wrap {
    position: relative;

    &::after {
      content: "▼";
      font-size: 0.5rem;
      position: absolute;
      right: 0;
      top: 50%;
      transform: translate(-8px, -50%);
      color: var(--c-text-muted);
      pointer-events: none;
    }
  }
</style>
