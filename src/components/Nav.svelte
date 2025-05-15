<script lang="ts">
  import { SITE, NAV_LINKS } from "@constants";
  import type { SvelteComponent } from "svelte";
  import SVG from "@components/SVG.svelte";
  import GlobalSearch from "@components/GlobalSearch.svelte";

  let { currentPage, noBreadcrumbs } = $props();
  let hamburgerEl: HTMLElement;
  let logoEl: HTMLElement;
  let isOpen = $state(false);

  // Theme Switching
  // theme is set up through a small script in BaseLayout.astro
  // we just update the class + localStorage value here
  function themeClick() {
    const htmlEl = document.documentElement;
    const newTheme = htmlEl.classList.contains("theme-dark") ? "light" : "dark";
    localStorage.setItem("theme", newTheme);

    htmlEl.classList.remove("theme-dark", "theme-light");
    htmlEl.classList.add(`theme-${newTheme}`);
  }

  // Global Search Toggle
  let searchbarEl: SvelteComponent;
  function toggleSearch() {
    searchbarEl?.toggle();
  }
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

<nav>
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
  <ul id="popout-menu">
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
    <li class="bottom">bottom is here</li>
  </ul>
  <a href="/" class="logo" bind:this={logoEl}>{SITE.LOGO_TITLE}</a>
  <div class="right">
    <button class="search" title="Search" onclick={toggleSearch}>
      <SVG name="search" />
    </button>
    <button class="theme" title="Switch Theme" onclick={themeClick}>
      <SVG name="sun" />
      <SVG name="moon" />
    </button>
  </div>
</nav>
<GlobalSearch bind:this={searchbarEl} />

<style lang="scss">
  @use "@css/util";

  nav {
    position: sticky;
    display: flex;
    top: 0;
    width: 100%;
    height: var(--nav-height);
    padding: 0 var(--site-padding);
    background-color: var(--c-quaternary);
    @include util.zindex(nav);
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  .logo {
    position: relative;
    top: 2px;
    padding-left: 6px;
    font-family: var(--ff-brand);
    color: var(--c-primary);
    font-size: 3rem;
    line-height: 1;
    -webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: var(--c-black);
  }

  .right {
    position: relative;
    display: flex;
    align-items: center;
    margin-left: auto;
    gap: 12px;
  }

  button {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #hamburger {
    left: -3px;

    :global(svg) {
      width: 35px;
      height: 35px;
      fill: var(--c-black);
      pointer-events: none;
    }
  }

  :global(svg.show-dark, svg.show-light) {
    width: 24px;
    height: 24px;
  }

  :global(svg.show-dark path, svg.show-light path) {
    fill: var(--c-black);
  }

  :global(.search svg) {
    position: relative;
    top: 1px;
    width: 24px;
    height: 24px;
  }

  :global(.search svg path) {
    fill: var(--c-black);
  }

  // Popout Menu
  #popout-menu {
    position: fixed;
    display: flex;
    flex-direction: column;
    left: 0;
    top: var(--nav-height);
    width: 100%;
    height: calc(100% - var(--nav-height));
    color: var(--c-black);
    background-color: var(--c-quaternary);
    border-top: 1px solid var(--background);
    opacity: 0;
    transform: translateX(-25px);
    transform-origin: left;
    transition:
      transform 0.2s ease-in-out,
      opacity 0.2s ease-in-out;
    pointer-events: none;
    overflow-y: auto;
    z-index: 2;

    @include util.mq(sm) {
      width: 300px;
    }

    li {
      list-style-type: none;
    }

    a {
      display: block;
      padding: 6px var(--site-padding);
      border-bottom: 1px solid var(--c-quaternary-s1);

      &:hover {
        background-color: var(--c-quaternary-t1);
      }
    }

    .bottom {
      margin-top: auto;
      padding: 0 var(--site-padding);
    }
  }

  #hamburger[aria-expanded="true"] + #popout-menu {
    opacity: 1;
    transform: translateX(0);
    pointer-events: all;
  }
</style>
