<script>
  import { SITE, FOOTER_LINKS, SITE_DATA } from "@constants";
  import { formatDate } from "@util";
  import SVG from "@components/SVG.svelte";
  import FooterContact from "@components/FooterContact.svelte";
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
      <div class="middle">
        <div class="contact">
          <FooterContact />
        </div>
      </div>
      <div class="right">
        <div class="externals">
          <a class="github" href="https://github.com/pstrawberrie/pstraw.net"
            ><span class="sr-only">View code on Github</span><SVG
              name="github"
            /></a
          >
        </div>
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
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--c-text-muted);

    @include util.mq(md) {
      flex-direction: row;
      flex-wrap: nowrap;
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

  .middle {
    position: relative;
    display: flex;
    margin: 1rem 0 1.5rem;

    .contact {
      position: relative;
    }

    @include util.mq(md) {
      margin: 0 0 0 auto;
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    font-size: 1rem;
    color: var(--c-text-muted);

    a {
      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 1rem;
      gap: 0.2rem;
      transition: transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);

        :global(svg path) {
          fill: var(--c-text);
        }
      }
    }

    :global(svg) {
      height: 2.5rem;
      width: auto;
    }

    :global(svg path) {
      fill: var(--c-text-muted);
    }
  }

  .logo {
    display: block;
    margin: 0 auto 0.5rem;

    @include util.mq(md) {
      margin: 0 auto 0.5rem 0;
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
