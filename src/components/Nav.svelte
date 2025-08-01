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
            navEl.classList.remove("sticky");
          } else {
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
      logoEl.focus();
    }
  }}
  onclick={(e) => {
    if (isOpen && e.target !== hamburgerEl) {
      isOpen = false;
    }
  }}
/>

<div class="nav-ghost" bind:this={navGhostEl}></div>
<nav class="container" bind:this={navEl}>
  <div class="nav_content">
    <div class="nav_left">
      <a href="/" class="logo text-gradient" bind:this={logoEl}>{SITE.TITLE}</a>
    </div>
    <div class="nav_right">
      <button class="search" title="Search" onclick={toggleSearch}>
        <SVG name="search" />
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
              >{l.title}
            </a>
          </li>
        {/each}
        <li class="bottom"></li>
      </ul>
    </div>
  </div>
</nav>
<GlobalSearch bind:this={searchbarEl} />

<style lang="scss">
  nav {
    --nav-gap: 1rem;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  }

  .nav_content {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid transparent;
    border-radius: 2rem;
    transition: 0.15s ease;
    padding: 0.48rem 0;
  }

  :global(nav.sticky .nav_content) {
    background-color: rgba(0, 0, 0, 0.85);
    border-color: rgba(var(--background-accent-rgb), 0.25);
    backdrop-filter: blur(10px);
    transform: translateY(8px);
    padding: 0 1.5rem;
  }

  .nav_right {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    gap: var(--nav-gap);
  }

  :global(#hamburger, .search) {
    display: flex;
    align-items: center;
  }

  :global(#hamburger svg) {
    height: 30px;
    width: auto;
    fill: var(--c-text-secondary);
  }

  :global(.search svg) {
    height: 22px;
    width: auto;
  }

  :global(.search svg path) {
    fill: var(--c-text-secondary);
  }

  ul {
    position: relative;
    display: flex;
    flex-wrap: nowrap;
    gap: var(--nav-gap);
  }

  ul a {
    display: inline-block;
    font-size: 1rem;
    font-weight: 500;
    color: var(--c-text-secondary);
    transition: 0.3s ease;
    padding: 0.69rem 0;

    &:hover {
      color: var(--c-text);
    }
  }
</style>
