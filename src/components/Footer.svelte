<script>
  import { SITE, FOOTER_LINKS, SITE_DATA } from "@constants";
  import { formatDate } from "@util";
  import SVG from "@components/SVG.svelte";
</script>

<footer>
  <div class="container">
    <div class="top">
      <div class="left">
        <a href="/" class="logo text-gradient">{SITE.TITLE}</a>
        <p>
          {SITE.DESCRIPTION}
        </p>
      </div>
      <div class="right">
        <a class="github" href="https://github.com/pstrawberrie/pstraw.net"
          ><SVG name="github" /> View code on Github</a
        >
      </div>
    </div>
    <div class="bottom">
      <p>
        &copy; {new Date().getFullYear()}
        {SITE.TITLE} • v2 <em>Chill Space</em> • Synced on {formatDate(
          new Date(SITE_DATA.build_history[0]).toLocaleDateString()
        )}
      </p>
    </div>
  </div>
</footer>

<!-- {#each FOOTER_LINKS as parent}
  <ul>
    <li class="title">{parent.heading}</li>
    {#each parent.links as link}
      <li><a href={link.path}>{link.title}</a></li>
    {/each}
  </ul>
{/each} -->

<style lang="scss">
  @use "@css/util";
  footer {
    position: relative;
    background: linear-gradient(135deg, var(--c-background) 0%, black 100%);
    border-top: 1px solid rgba(var(--background-accent-rgb), 0.2);
    margin-top: var(--space-page-v);
    padding: 3rem 0 1rem;
  }

  .top {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--c-text-muted);

    @include util.mq(md) {
      grid-template-columns: 1fr auto;
      gap: 2rem;
      text-align: left;
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;

    p {
      font-size: 1rem;

      @include util.mq(md) {
        max-width: 300px;
      }
    }
  }

  .logo {
    display: block;
    margin-bottom: 0.5rem;

    @include util.mq(md) {
      margin-right: auto;
    }
  }

  .bottom {
    padding-top: 2rem;
    border-top: 1px solid rgba(var(--background-accent-rgb), 0.2);
    color: var(--c-text-muted);
    text-align: center;

    p {
      font-size: 0.875rem;
    }
  }
</style>
