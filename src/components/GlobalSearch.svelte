<script>
  import { SERVER_URL } from "@constants";
  import { debounce } from "lodash-es";
  import { onMount } from "svelte";
  import Loader from "@components/Loader.svelte";
  import TMDBCard from "@components/TMDBCard.svelte";
  import NoteCard from "@components/NoteCard.svelte";
  import FriendCard from "@components/FriendCard.svelte";

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
  let history = $state([]);
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
      history = data.searchHistory;
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

  // On Mount
  onMount(async () => {
    const historyReq = await fetch(`${SERVER_URL}/search-history`).catch(
      (err) => {
        hasError = true;
        loading = false;
      }
    );

    const searchHistory = await historyReq.json();
    history =
      typeof searchHistory === "string"
        ? JSON.parse(searchHistory)
        : searchHistory;
  });
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
        placeholder="Search by Title..."
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
    {#if history.length && !hasError && !results.length && (query.length < 2 || query.trim() === "")}
      <div class="recent">
        <span>Recent searches</span>
        <div class="inner">
          {#each history as h}
            <button
              onclick={() => {
                query = h.query;
                search();
              }}>{h.query} ({h.results})</button
            >
          {/each}
        </div>
      </div>
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
          {#if r.collection === "friends"}<FriendCard itemData={r} />{/if}
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

  dialog {
    width: 100%;
    height: 100%;
    border: 0;
    margin: auto;
    background-color: transparent;
    color: var(--font-color);
    overflow: hidden;

    &[open] {
      align-items: flex-start;
    }

    &::backdrop {
      display: none;
    }

    &:focus,
    &:focus-visible {
      outline: 0;
    }

    .wrapper {
      position: relative;
      width: 100%;
      max-width: 700px;
      max-height: 90%;
      margin: 4rem auto 0;
      padding-bottom: 1rem;
      background-color: var(--font-color-opposite);
      border: 2px solid var(--c-quaternary);
      border-radius: 12px;
      overflow-y: auto;
      backdrop-filter: blur(2px);

      opacity: 0;
      transition: opacity 0.2s ease-in-out;

      > div {
        padding-left: 1rem;
        padding-right: 1rem;
      }
    }

    .searchbar {
      position: sticky;
      top: 0;
      display: flex;
      flex-wrap: nowrap;
      padding: 1rem;
      margin-bottom: 5px;
      z-index: 3;
      background-color: var(--font-color-opposite);

      input {
        width: 100%;
        color: var(--font-color);
        border: 0;
        border-bottom: 1px solid var(--c-quaternary-s1);
        background-color: var(--font-color-opposite);
        font-size: 1.2rem;

        &:focus-visible {
          outline: 0;
        }
      }

      .clear {
        position: absolute;
        right: 0;
        top: 0;
        height: 100%;
        padding: 0 1.6rem 0.15rem;
        font-size: 2rem;

        opacity: 1;
        transition:
          color 0.15s,
          opacity 0.15s;

        &:hover {
          opacity: 0.8;
        }

        &[disabled] {
          opacity: 0;
          pointer-events: none;
        }
      }
    }

    :global(.loader) {
      margin-top: 1.6rem;
    }

    .recent {
      font-weight: bold;

      span {
        display: block;
        margin-bottom: 0.7rem;
      }

      .inner {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
        font-size: 0.9rem;
        font-weight: normal;
      }

      button {
        padding: 3px 6px;
        background-color: var(--content-transparent);
        border: 2px solid var(--background);
        border-radius: 2px;
        text-transform: capitalize;

        &:hover {
          background-color: var(--background);
          border-color: var(--background-accent2);
        }
      }
    }

    .status {
      margin-bottom: 1rem;
      text-align: center;
      text-transform: uppercase;
      font-size: 1rem;
    }

    .results {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;

      @include util.mq(sm) {
        grid-template-columns: 1fr 1fr;
      }

      :global(.card.friend img) {
        max-width: 100%;
        max-height: 80px;
        object-fit: cover;
      }

      :global(.card.friend .title) {
        font-weight: bold;
        font-size: 1.2rem;
        line-height: 1.2;
      }

      :global(.card.friend .overview) {
        margin-top: 1rem;
        font-size: 0.9rem;
        line-height: 1.1;
      }
    }

    .load-more {
      display: flex;
      justify-content: center;
      margin-top: 1rem;

      button {
        font-size: 1rem;
        text-transform: uppercase;
        font-weight: bold;
        padding: 0.5rem 2rem;
        border-radius: 0.15rem;
        border: 2px solid var(--font-color);

        &:hover {
          color: var(--c-black);
          background-color: var(--c-quaternary);
        }
      }
    }
  }
</style>
