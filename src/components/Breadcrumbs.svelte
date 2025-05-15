<script>
  // breadcrumbs by gideon maina
  // https://medium.com/@gmainapro/creating-breadcrumbs-in-astro-4c7280d599fa
  let { currentPage } = $props();
  const s = currentPage.split("/");

  function getBreadcrumbs() {
    if (currentPage.endsWith("/")) s.pop();

    let breadcrumbs = [];

    while (s.length > 2) {
      s.pop();
      breadcrumbs.push(s.join("/"));
    }
    return breadcrumbs;
  }

  const currentTitle =
    s[s.length - 1].length < 4 ? `Page ${s[s.length - 1]}` : s[s.length - 1];
  const breadcrumbs = getBreadcrumbs().reverse();
</script>

{#if breadcrumbs.length}
  <div class="breadcrumbs">
    <ul>
      {#each breadcrumbs as b, i}
        <li>
          <a href={b}>{b.split("/").pop()}</a>
        </li>
        {#if i === breadcrumbs.length - 1}<li>
            <span>{currentTitle}</span>
          </li>{/if}
      {/each}
    </ul>
  </div>
{/if}

<style lang="scss">
  @use "@css/util";

  .breadcrumbs {
    position: relative;
    display: none;
    background-color: var(--background);
    padding: 0 0.7rem;

    @include util.mq(sm) {
      display: block;
    }
  }

  ul {
    font-size: 0.75rem;
    line-height: 1;
    position: relative;
    display: flex;
    margin: auto;
    height: 100%;
    align-items: center;
    gap: 1rem;
  }

  a,
  span {
    position: relative;
    display: block;
    font-size: 0.75rem;
    line-height: 1;
    text-transform: uppercase;
    text-decoration: none;
  }

  a {
    &::after {
      position: absolute;
      display: block;
      top: 0;
      right: -0.7rem;
      content: "\002F";
      line-height: 1;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    padding-left: 0.1rem;
    pointer-events: none;
    opacity: 0.5;
  }
</style>
