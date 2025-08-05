<script lang="ts">
  import { SITE, NAV_LINKS } from "@constants";
  import type { SvelteComponent } from "svelte";
  import SVG from "@components/SVG.svelte";
  import GlobalSearch from "@components/GlobalSearch.svelte";

  let { currentPage, noBreadcrumbs } = $props();
  let navEl: HTMLElement;
  let navGhostEl: HTMLElement;
  let hamburgerEl: HTMLElement;
  let logoEl: HTMLElement;
  let isOpen = $state(false);

  // Global Search Toggle
  let searchbarEl: SvelteComponent;
  function toggleSearch() {
    searchbarEl?.toggle();
  }

  // onMount
  $effect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.classList.remove("sticky");
            navEl.classList.remove("sticky");
          } else {
            document.body.classList.add("sticky");
            navEl.classList.add("sticky");
          }
        });
      },
      { root: null, threshold: 0 }
    );

    observer.observe(navGhostEl);
  });
</script>

<svelte:document
  onkeydown={(e) => {
    if (e.key === "Escape" && isOpen) {
      isOpen = false;
    }
  }}
  onclick={(e) => {
    if (isOpen && e.target !== hamburgerEl) {
      isOpen = false;
    }
  }}
/>

<div class="nav-ghost" bind:this={navGhostEl}></div>
<nav bind:this={navEl}>
  <div class="nav_content container">
    <div class="nav_left">
      <a href="/" class="logo text-gradient" bind:this={logoEl}>{SITE.TITLE}</a>
    </div>
    <div class="nav_right">
      <button class="search" title="Search" onclick={toggleSearch}>
        <SVG name="search" /><span>Search</span>
      </button>
      <button
        id="hamburger"
        title="Menu"
        aria-label="toggle visual navigation or continue tabbing"
        aria-controls="float-menu"
        aria-expanded={isOpen}
        bind:this={hamburgerEl}
        onclick={() => (isOpen = !isOpen)}
        onfocus={() => (isOpen ? (isOpen = false) : null)}
      >
        <SVG name="hamburger" />
      </button>
      <ul id="nav-menu">
        <li class="mobile text-gradient">Where To?</li>
        {#each NAV_LINKS as l, i}
          {@const active =
            currentPage === l.path ||
            currentPage.split("/")[1] === l.path.split("/")[1]}
          <li>
            <a
              href={l.path}
              class:active
              onclick={() => {
                if (!active) isOpen = false;
              }}
              onfocus={() => (isOpen = true)}
              onblur={() => {
                i + 1 === NAV_LINKS.length ? (isOpen = false) : null;
              }}
              >{l.title}<i>&nbsp;→</i>
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</nav>
<GlobalSearch bind:this={searchbarEl} />

<style lang="scss">
  @use "@css/util";

  nav {
    --nav-gap: 1rem;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: var(--nav-height);
    padding: 0.5rem 0;
    z-index: 100;
    transition: 0.15s ease;

    a {
      text-decoration: none;
    }
  }

  .nav_content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  :global(nav.sticky) {
    background-color: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(10px);
  }

  .nav_right {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--nav-gap);
  }

  #hamburger,
  .search {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: 1px solid var(--c-button-border);
    background-color: transparent;
    border-radius: 0.25rem;
    width: 2rem;
    min-height: 2rem;
    font-size: 0.9rem;
    color: var(--c-text-secondary);
    transition: 0.3s ease;

    &:hover,
    &[aria-expanded="true"] {
      background-color: var(--c-button-background-hover);
      border-color: var(--c-text-tertiary);
      color: var(--c-text-tertiary);
      transform: translateY(-1px);
    }

    span {
      display: none;
    }

    @include util.mq(sm) {
      span {
        display: inline;
      }
    }
  }

  #hamburger {
    @include util.mq(md) {
      display: none;
    }
  }

  .search {
    width: auto;
    padding: 0 0.5rem;
  }

  :global(svg),
  :global(svg path) {
    pointer-events: none;
    transition: 0.3s ease;
  }

  :global(#hamburger svg) {
    height: 24px;
    width: auto;
    fill: var(--c-text-secondary);
  }

  :global(.search svg) {
    position: relative;
    height: 18px;
    width: auto;
    left: -1px;

    @include util.mq(sm) {
      margin-right: 0.5rem;
    }
  }

  :global(.search svg path) {
    fill: var(--c-text-secondary);
  }

  :global(#hamburger:hover svg, .search:hover svg path) {
    fill: var(--c-text-tertiary);
  }

  ul {
    position: absolute;
    display: flex;
    flex-direction: column;
    top: calc(var(--nav-height) - 0.5rem);
    right: 0;
    flex-wrap: nowrap;
    min-width: 250px;
    border: 1px solid var(--c-text-tertiary);
    background-color: var(--c-background);
    border-radius: 0.5rem;
    padding: 0.25rem 0;
    opacity: 0;
    transform: translateY(-10px);
    pointer-events: none;
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;

    @include util.mq(md) {
      position: relative;
      flex-direction: row;
      top: auto;
      right: auto;
      min-width: auto;
      gap: var(--nav-gap);
      padding: 1rem 1rem 1rem 0;
      background: transparent;
      border: 0;
      opacity: 1;
      transform: none;
      pointer-events: auto;
    }
  }

  #hamburger[aria-expanded="true"] + ul {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  ul li.mobile {
    display: block;
    text-align: center;
    font-family: var(--font-family-title);
    font-size: 1.25rem;
    padding: 0.69rem 1.5rem;
    background-image: var(--c-text-gradient-default);

    @include util.mq(md) {
      display: none;
    }
  }
  ul a {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    color: var(--c-text-secondary);
    transition: 0.3s ease;
    padding: 1rem 1.5rem;
    border-top: 1px solid var(--c-card-border);

    &:hover {
      color: var(--c-text-tertiary);

      &::after {
        transform: scaleX(1);
      }
    }

    @include util.mq(md) {
      padding: 0.69rem 0;
      border: 0;
      font-size: 1rem;
      font-weight: 500;

      i {
        display: none;
      }

      &::after {
        content: "";
        position: absolute;
        bottom: 0.45rem;
        left: 0;
        width: 100%;
        height: 2px;
        transform: scaleX(0);
        background: var(--c-text-gradient-decoration);
        transform-origin: left;
        transition: transform 0.3s ease;
      }
    }
  }
</style>
