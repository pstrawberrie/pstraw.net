<script lang="ts">
  import { SERVER_URL, MEDIA_DATA, MOVIE_DATA, SHOW_DATA } from "@env";
  import SVG from "@components/SVG.svelte";
  import Loader from "@components/Loader.svelte";

  let {
    title = undefined,
    type = "all",
    year = "all",
    genre = "all",
    rating = "all",
    color = "quinary",
  } = $props();

  let yearOptions = $state([]);
  let genreOptions = $state([]);
  let ratingOptions = $state([]);

  let filterType = $state(type);
  let filterYear = $state(year);
  let filterGenre = $state(genre);
  let filterRating = $state(rating);

  let currentPage = $state(1);
  let loading = $state(false);
  let error = $state("");

  // Update Options
  function updateOptions(newOpts = undefined) {
    if (newOpts) {
      genreOptions = newOpts.genres;
      yearOptions = newOpts.years;
      ratingOptions = newOpts.ratings;
    } else {
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
  }

  // On Selection Changes
  function onFilterChange() {
    console.log(filterType, filterYear, filterGenre, filterRating);
    filter();
  }

  /**
   * Filter
   */
  async function filter() {
    // fetch
    loading = true;
    const filterReq = await fetch(`${SERVER_URL}/filter/media`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filter: {
          type: filterType.trim().toLowerCase(),
          year: filterYear.toString(),
          genre: filterGenre.trim(),
          rating: filterRating.trim(),
        },
        page: currentPage,
      }),
    }).catch((err) => {
      error = "Error filtering - try again later";
      loading = false;
    });

    const data = await filterReq.json();

    if (data.error) {
      error = data.error;
    } else {
      error = "";
      console.log(data);
    }

    loading = false;

    // totalResults = data.total;
    // totalPages = data.totalPages;
    // noResults = totalResults === 0;
    // lastQuery = noResults ? query : "";

    // minLengthMessage = false;
    // hasError = false;
    // loading = false;
    // exactMatches = data?.exactMatches || [];

    // if (currentPage > 1) {
    //   results = [...results, ...data.results];
    // } else {
    //   results = data.results;
    // }
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
        <select
          id="media-type"
          name="media-type"
          onchange={onFilterChange}
          bind:value={filterType}
        >
          <option value="all">All Media</option>
          <option value="movies">Movies</option>
          <option value="shows">Shows</option>
        </select>
      </div>

      <div class="select-wrap">
        <select
          id="media-genre"
          name="media-genre"
          onchange={onFilterChange}
          bind:value={filterGenre}
        >
          <option value="all">All Genres ({genreOptions.length})</option>

          {#each genreOptions as g}
            <option value={g}>{g}</option>
          {/each}
        </select>
      </div>

      <div class="select-wrap">
        <select
          id="media-year"
          name="media-year"
          onchange={onFilterChange}
          bind:value={filterYear}
        >
          <option value="all">All Years ({yearOptions.length})</option>

          {#each yearOptions as y}
            <option value={y}>{y}</option>
          {/each}
        </select>
      </div>

      <div class="select-wrap">
        <select
          id="media-rating"
          name="media-rating"
          onchange={onFilterChange}
          bind:value={filterRating}
        >
          <option value="all">All Ratings ({ratingOptions.length})</option>

          {#each ratingOptions as r}
            <option value={r}>{r}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
  <div class={`loading ${loading ? "active" : ""}`}>
    {#if loading}
      <Loader />
    {/if}
  </div>
  <div class={`error ${error.length ? "active" : ""}`}>
    {#if error}
      {error}
    {/if}
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
    overflow: hidden;
  }

  .loading,
  .error {
    position: absolute;
    display: flex;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    justify-content: center;
    padding-top: 20px;
    background: rgba(0, 0, 0, 0.95);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;

    &.active {
      opacity: 1;
      pointer-events: auto;
    }

    :global(.loader) {
      padding: 0;
      align-items: flex-start;
    }
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
    min-width: 150px;

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
