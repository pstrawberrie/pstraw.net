<script lang="ts">
  import { SERVER_URL, MEDIA_DATA, MOVIE_DATA, SHOW_DATA } from "@env";
  import SVG from "@components/SVG.svelte";
  import Loader from "@components/Loader.svelte";
  import TmdbCard from "@components/TMDBCard.svelte";

  let { title = undefined, type = "all", color = "quinary" } = $props();

  let typeOptions = $state([]);
  let yearOptions = $state([]);
  let genreOptions = $state([]);
  let ratingOptions = $state([]);

  let filterType = $state(type);
  let filterYear = $state("all");
  let filterGenre = $state("all");
  let filterRating = $state("all");

  let loading = $state(false);
  let isNewFilter = $state(true);
  let error = $state("");

  let results = $state([]);
  let totalResults = $state(0);
  let currentPage = $state(1);
  let totalPages = $state(1);

  // Update Options
  function updateOptions(newOpts = undefined) {
    if (newOpts) {
      typeOptions = newOpts.types;
      genreOptions = newOpts.genres;
      yearOptions = newOpts.years;
      ratingOptions = newOpts.ratings;
    } else {
      if (filterType === "all") {
        typeOptions = ["movies", "shows"];
        genreOptions = MEDIA_DATA.genres;
        yearOptions = MEDIA_DATA.years;
        ratingOptions = MEDIA_DATA.ratings;
      }

      if (filterType === "movies") {
        typeOptions = [];
        genreOptions = MOVIE_DATA.genres;
        yearOptions = MOVIE_DATA.years;
        ratingOptions = MOVIE_DATA.ratings;
      }

      if (filterType === "shows") {
        typeOptions = [];
        genreOptions = SHOW_DATA.genres;
        yearOptions = SHOW_DATA.years;
        ratingOptions = SHOW_DATA.ratings;
      }
    }
  }

  // On Selection Changes
  // @TODO: error when next page is loaded and then filter is changed
  function onFilterChange() {
    if (currentPage > 1) {
      isNewFilter = true;
      currentPage = 1;
    }

    filter();
  }

  // Update Filter Results
  function removeStatic() {
    const staticEl = document.querySelector(".filter-static-content");
    if (staticEl) staticEl.remove();
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
      updateOptions(undefined);
    } else {
      removeStatic();
      updateOptions(data.filterOptions);

      error = "";
      totalResults = data.total;
      totalPages = data.totalPages;

      if (currentPage > 1 && !isNewFilter) {
        results = [...results, ...data.results];
      } else {
        results = data.results;
      }
    }

    loading = false;
    isNewFilter = false;
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
        <span class="sr-only">{title}</span>
      {/if}
    </div>
    <div class="filters">
      {#if type === "all"}
        <div class="select-wrap">
          <select
            id="media-type"
            name="media-type"
            onchange={onFilterChange}
            bind:value={filterType}
          >
            <option value="all">
              {#if filterType === "all"}All Types ({typeOptions.length}){/if}
              {#if filterType !== "all"}Reset Types{/if}
            </option>
            {#each typeOptions as t}
              <option value={t}>{t}</option>
            {/each}
          </select>
        </div>
      {/if}

      <div class="select-wrap">
        <select
          id="media-genre"
          name="media-genre"
          onchange={onFilterChange}
          bind:value={filterGenre}
        >
          <option value="all">
            {#if filterGenre === "all"}All Genres ({genreOptions.length}){/if}
            {#if filterGenre !== "all"}Reset Genre{/if}
          </option>

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
          <option value="all">
            {#if filterYear === "all"}All Years ({yearOptions.length}){/if}
            {#if filterYear !== "all"}Reset Years{/if}
          </option>
          {#each yearOptions as y}
            <option value={y.toString()}>{y}</option>
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
          <option value="all">
            {#if filterRating === "all"}All Ratings ({ratingOptions.length}){/if}
            {#if filterRating !== "all"}Reset Ratings{/if}
          </option>

          {#each ratingOptions as r}
            <option value={r}>{r}</option>
          {/each}
        </select>
      </div>
    </div>
    <button
      class="reset"
      title="Reset All"
      onclick={() => window.location.reload()}
      ><SVG name="reset" /> <span class="sr-only">Reset Filter</span></button
    >
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
{#if results.length}
  <div class="grid-default">
    {#each results as r (r.id)}
      <TmdbCard itemData={r} />
    {/each}
  </div>
  <div class="grid-cta">
    {#if currentPage < totalPages}
      <div class="load-more">
        <button
          class="btn"
          onclick={() => {
            currentPage++;
            filter();
          }}>Load More ({currentPage + 1}/{totalPages})</button
        >
      </div>
    {/if}
    {#if currentPage === totalPages}
      <div class="load-more">
        End of Results - Loaded {totalPages}/{totalPages} Pages
      </div>
    {/if}
  </div>
{/if}

<style lang="scss">
  @use "@css/util";

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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 1rem;
    padding: 1rem 1.5rem;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border: 1px solid var(--c-card-border);
    border-top: 0;
    background: var(--c-button-background-hover);
    overflow: hidden;

    @include util.mq(md) {
      flex-direction: row;
      width: auto;
    }
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
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    gap: 0.75rem;
    transition: transform 0.3s ease;
    overflow: hidden;

    @include util.mq(md) {
      flex-direction: row;
      width: auto;
    }
  }

  select {
    padding: 0.3rem 1.25rem 0.3rem 0.69rem;
    background: var(--c-card-content-background);
    border-radius: 0.25rem;
    border: 1px solid rgba(var(--background-accent-rgb), 0.25);
    line-height: 1;
    font-weight: 500;
    min-width: 150px;
    width: 100%;
    text-transform: capitalize;

    option {
      color: black;
    }

    &:focus-visible {
      outline: 0;
      background-color: var(--c-quinary);
      color: black;
    }

    @include util.mq(md) {
      width: auto;
    }
  }

  .select-wrap {
    position: relative;
    width: 100%;

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

    @include util.mq(sm) {
      width: 60%;
    }

    @include util.mq(md) {
      width: auto;
    }
  }

  .reset {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 500;
    color: var(--c-tertiary);
    transition: color 0.3s ease;

    :global(svg) {
      width: 1rem;
      height: 1rem;
    }

    &:hover {
      color: var(--c-text-secondary);
    }
  }
</style>
