<script>
  import { SERVER_URL } from "@env";
  import { debounce } from "lodash-es";
  import Loader from "@components/Loader.svelte";
  import SVG from "@components/SVG.svelte";
  import TMDBCard from "@components/TMDBCard.svelte";
  import NoteCard from "@components/NoteCard.svelte";

  /**
   * Setup
   */
  // Elements
  let inputEl;

  // State
  let active = $state(false);
  let loading = $state(false);

  let currentPage = $state(1);
  let query = $state("");
  let lastQuery = $state("");

  let results = $state([]);
  let noResults = $state(false);
  let exactMatches = $state([]);

  let totalResults = $state(0);
  let totalPages = $state(0);

  let minLengthMessage = $state(false);
  let hasError = $state(false);
  let errorMessage = "Search Error";

  /**
   * Search
   */
  async function search() {
    if (query.trim() !== "" && query.length <= 1) {
      minLengthMessage = true;
      return;
    }
    if (query.trim() !== "" && query.length > 1) {
      // fetch
      loading = true;
      const searchReq = await fetch(`${SERVER_URL}/search`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query,
          page: currentPage,
        }),
      }).catch((err) => {
        hasError = true;
        loading = false;
      });

      const data = await searchReq.json();

      totalResults = data.total;
      totalPages = data.totalPages;
      noResults = totalResults === 0;
      lastQuery = noResults ? query : "";

      minLengthMessage = false;
      hasError = false;
      loading = false;
      exactMatches = data?.exactMatches || [];

      if (currentPage > 1) {
        results = [...results, ...data.results];
      } else {
        results = data.results;
      }
    } else {
      loading = false;
    }
  }

  /**
   * Utility Funcs
   */
  // Clear Func
  function clear() {
    if (`${query}`.trim() !== "") {
      query = "";
      results = [];
      currentPage = 1;
      hasError = false;
      noResults = false;
      loading = false;
      minLengthMessage = false;
    }
  }

  // Toggle Funcs
  function toggleActive() {
    active = !active;
    if (active) {
      inputEl.focus();
      document.body.classList.add("fixed");
    } else {
      document.body.classList.remove("fixed");
      clear();
    }
  }

  export function toggle() {
    toggleActive();
  }
</script>

<svelte:document
  onkeydown={(e) => {
    if (e.key === "Escape" && active) toggleActive();
  }}
/>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<div
  role="dialog"
  class={`global-search ${active ? "active" : ""}`}
  tabindex={active ? undefined : "-1"}
  onclick={(e) => {
    if (active && !e.target.closest(".wrapper")) toggleActive();
  }}
>
  <div class="wrapper">
    <div class="searchbar">
      <div class="searchbar-left">
        <SVG name="search" />
        <input
          type="text"
          placeholder="Search Media and Notes..."
          id="global-search-input"
          tabindex={active ? "0" : "-1"}
          bind:this={inputEl}
          bind:value={query}
          onkeyup={debounce((e) => search(), 300)}
        />
      </div>
      <button
        class="close"
        onclick={toggleActive}
        tabindex={active ? "0" : "-1"}>&times;</button
      >
    </div>
    <div class="search-body">
      {#if loading}
        <Loader />
      {/if}
      {#if !hasError && !results.length && !noResults}
        <div class="info empty">
          <SVG name="search" />
          <div class="info-title">Search pstraw.net</div>
          <p>Find movies, shows, and notes by title</p>
          {#if minLengthMessage}
            <i>Search term must be at least 2 characters</i>
          {/if}
        </div>
      {/if}

      {#if hasError}
        <div class="info error">
          <div class="info-title">Error Searching</div>
          <i>{errorMessage}</i>
        </div>
      {/if}
      {#if noResults && query.length > 1 && query !== ""}
        <div class="info no-results">
          <SVG name="search" />
          <div class="info-title">No Results Found</div>
          Your search for "{query.trim()}" didn't return any results.
        </div>
      {/if}
      {#if results.length}
        {#if exactMatches.length}
          <div class="status">
            {exactMatches.length}
            <strong>exact match</strong>{exactMatches.length > 1 ? "es" : ""} found
          </div>
          <div
            class={`results exact ${exactMatches.length === 1 ? "single" : ""}`}
          >
            {#each exactMatches as m (m.id)}
              {#if m.collection === "movies" || m.collection === "shows"}
                <TMDBCard itemData={m} exact={true} />
              {/if}
              {#if m.collection === "notes"}
                <NoteCard itemData={m} exact={true} />
              {/if}
            {/each}
          </div>
        {/if}

        <div class="status">
          {#if query.length > 1 && exactMatches.length !== results.length}
            {totalResults} result{totalResults > 1 ? "s" : ""} found for
            <strong>"{query}"</strong>
          {/if}
        </div>
        <div class={`results ${results.length === 1 ? "single" : ""}`}>
          {#if loading}
            <Loader />
          {/if}

          {#if exactMatches.length < results.length}
            {#each results as r (r.id)}
              {#if r.collection === "movies" || r.collection === "shows"}<TMDBCard
                  itemData={r}
                />{/if}
              {#if r.collection === "notes"}<NoteCard itemData={r} />{/if}
            {/each}
          {/if}
        </div>
        {#if results.length && currentPage < totalPages}
          <div class="load-more">
            <button
              class="btn"
              onclick={() => {
                currentPage++;
                search();
              }}>Load Page {currentPage + 1}/{totalPages}</button
            >
          </div>
        {/if}
        {#if results.length && currentPage === totalPages}
          <div class="load-more">
            Results complete: loaded {totalPages}/{totalPages} pages
          </div>
        {/if}
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
  @use "@css/util";

  .global-search {
    --search-padding: 1.5rem;

    position: fixed;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
    padding: var(--space-page-v) var(--space-page-h);
    color: var(--c-text-secondary);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    transform: translateY(-10px);

    z-index: 110;
    pointer-events: none;

    &.active {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
  }

  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    background: var(--c-card-background);
    border: 1px solid var(--c-card-border);
    border-radius: 1rem;

    @include util.mq(md) {
      max-width: 70vw;
    }
  }

  .searchbar {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    max-height: 20vh;
    gap: 1rem;
    padding: var(--search-padding);
    border-bottom: 1px solid var(--c-card-border);
  }

  .searchbar-left {
    position: relative;
    flex: 1;
  }

  :global(.searchbar-left svg) {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    height: 1.25rem;
    width: auto;
  }

  :global(.searchbar-left svg path) {
    fill: var(--c-text-muted);
  }

  .searchbar input {
    width: 100%;
    font-size: 1.125rem;
    padding: 1rem 1rem 1rem 3.5rem;
    color: var(--c-text);
    border-radius: 0.5rem;

    &::placeholder {
      color: var(--c-text-muted);
    }
  }

  .close {
    position: relative;
    padding: 0.5rem;
    background-color: transparent;
    font-size: 2rem;
    color: var(--c-text-muted);
    line-height: 1;
    border-radius: 0.25rem;
    transition: 0.2s ease;

    &:hover,
    &:focus {
      background-color: var(--c-card-content-background);
      color: var(--c-text);
    }
  }

  .search-body {
    position: relative;
    display: flex;
    flex-direction: column;
    max-height: 70vh;
    overflow-y: auto;
    padding: var(--search-padding);
  }

  .status {
    padding: 0 0 1.5rem;
    font-size: 1rem;
    color: var(--c-text-secondary);
    text-align: center;
  }

  .info {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 1rem;
    font-size: 1rem;
    gap: 0.5rem;
    color: var(--c-text-secondary);

    i {
      position: relative;
      display: block;
      color: var(--c-quinary);
      font-size: 1.1rem;
    }

    :global(svg) {
      width: 4rem;
      height: auto;
      fill: var(--c-text-muted);
      margin-bottom: 0.5rem;
    }

    :global(svg path) {
      fill: var(--c-text-muted);
    }
  }

  .no-results {
    :global(svg) {
      opacity: 0.15;
    }
  }

  .info-title {
    font-size: 1.25rem;
    font-family: var(--font-family-title);
    color: var(--c-text);
  }

  .results {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    &.single {
      grid-template-columns: 1fr;
    }

    &.exact {
      margin-bottom: 2rem;
    }

    @include util.mq(md) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .load-more {
    position: relative;
    display: flex;
    justify-content: center;
    padding: 3rem 1rem 1.5rem;
    font-size: 1rem;
    color: var(--c-text-muted);
  }
</style>
