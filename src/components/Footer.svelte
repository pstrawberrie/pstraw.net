<script>
  import { SITE, FOOTER_LINKS, SITE_DATA } from "@constants";
  import { formatDate, getRelativeTime } from "@util";
  import SVG from "@components/SVG.svelte";
</script>

<footer class="contain">
  <div class="left">
    {#each FOOTER_LINKS as parent}
      <ul>
        <li class="title">{parent.heading}</li>
        {#each parent.links as link}
          <li><a href={link.path}>{link.title}</a></li>
        {/each}
      </ul>
    {/each}
  </div>
  <div class="right">
    <a href="/" class="logo">{SITE.TITLE}</a>
    <a class="github" href="https://github.com/pstrawberrie/pstraw.net"
      ><SVG name="github" /> View code on Github</a
    >
    <div class="build">
      Current Build: {formatDate(
        new Date(SITE_DATA.build_history[0]).toLocaleDateString()
      )}
      ({getRelativeTime(SITE_DATA.build_history[0])})
    </div>
  </div>
</footer>

<style lang="scss">
  @use "@css/util";

  footer {
    position: relative;
    display: flex;
    flex-direction: column-reverse;
    margin-top: 3rem;
    padding-top: 2rem;
    padding-bottom: 2rem;
    border-top: 2px solid var(--background-accent);
    background-color: var(--font-color-opposite);
    font-size: 1.1rem;

    @include util.mq(md) {
      flex-direction: row;
    }
  }

  li,
  a {
    font-size: 1.1rem;
  }

  .left {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    text-align: center;

    @include util.mq(md) {
      flex-direction: row;
      text-align: left;
    }

    .title {
      font-weight: bold;
      border-bottom: 2px solid var(--background-accent);
      margin-bottom: 0.5rem;
    }
  }

  .right {
    position: relative;
    display: flex;
    flex-direction: column;
    margin-bottom: 2rem;
    text-align: center;

    .logo {
      text-decoration: none;
      font-family: var(--ff-brand);
      padding-bottom: 0.5rem;
      margin-bottom: 0.5rem;
      font-size: 2rem;
      line-height: 1;
      border-bottom: 2px solid var(--background-accent);
      color: var(--c-primary);
      -webkit-text-stroke-width: 1px;
      -webkit-text-stroke-color: var(--font-color);
    }

    .github {
      display: flex;
      align-items: center;
      text-decoration: none;
      margin: auto;
      font-size: 0.95rem;
      font-weight: bold;

      &:after {
        font-weight: normal;
      }

      :global(svg) {
        position: relative;
        top: -1px;
        width: 1rem;
        margin-right: 4px;
      }

      @include util.mq(md) {
        margin: 0;
      }
    }

    .build {
      font-size: 0.9rem;
    }

    @include util.mq(md) {
      margin-left: auto;
      margin-bottom: 0;
      text-align: left;
    }
  }
</style>
