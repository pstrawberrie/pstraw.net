<script>
  import { SERVER_URL } from "@constants";
  import { debounce } from "lodash-es";
  import Loader from "@components/Loader.svelte";
  import TMDBCard from "@components/TMDBCard.svelte";
  import NoteCard from "@components/NoteCard.svelte";

  /**
   * Setup
   */
  // Elements
  let dialogEl;
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

  let hasError = $state(false);
  let errorMessage = "Search Error";

  /**
   * Search
   */
  async function search() {
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
      hasError = false;
      noResults = false;
      loading = false;
    }
  }

  // Toggle Funcs
  function toggleActive() {
    active = !active;
    if (active) {
      dialogEl.showModal();
      inputEl.focus();
      document.body.classList.add("fixed");
    } else {
      dialogEl.close();
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

<dialog
  class="global-search"
  bind:this={dialogEl}
  onclick={(e) => {
    if (active && !e.target.closest(".wrapper")) toggleActive();
  }}
>
  <div class="wrapper">
    <div class="searchbar">
      <input
        type="text"
        placeholder="Enter a title..."
        id="global-search-input"
        tabindex={active ? undefined : "-1"}
        bind:this={inputEl}
        bind:value={query}
        onkeyup={debounce((e) => search(), 500)}
      />
      <button
        class="clear"
        disabled={query.trim() !== "" && query.length > 1 ? undefined : "true"}
        onclick={clear}>&times;</button
      >
    </div>
    {#if loading}
      <Loader />
    {/if}
    {#if !hasError && !results.length && (query.length < 2 || query.trim() === "")}
      <div class="info">Search all Movies, Shows, and Notes by title</div>
    {/if}
    {#if hasError}
      <div class="error">{errorMessage}</div>
    {/if}

    {#if results.length}
      <div class="status">
        {#if query.length > 1}
          {totalResults} result{totalResults > 1 ? "s" : ""} found for "{query}"{totalPages >
          1
            ? " (" + totalPages + " pages)"
            : ""}
        {/if}
        {#if query.length < 2}
          Search term must be at least 2 characters
        {/if}
      </div>
      <div class="results">
        {#each results as r (r.id)}
          {#if r.collection === "movies" || r.collection === "shows"}<TMDBCard
              itemData={r}
            />{/if}
          {#if r.collection === "notes"}<NoteCard itemData={r} />{/if}
        {/each}
      </div>
      {#if results.length && currentPage < totalPages}
        <div class="load-more">
          <button
            onclick={() => {
              currentPage++;
              search();
            }}
            >Load {currentPage + 1 === totalPages ? "Final" : "Next"} Page ({currentPage +
              1} / {totalPages})</button
          >
        </div>
      {/if}
    {/if}
    {#if noResults && query.length > 1 && query !== ""}
      <div class="no-results">
        No Results for {query}
      </div>
    {/if}
  </div>
</dialog>

<style lang="scss">
  @use "@css/util";

  :global(body.fixed dialog .wrapper) {
    opacity: 1;
  }

  .results {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    @include util.mq(sm) {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
