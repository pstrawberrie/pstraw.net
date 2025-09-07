<script>
  import { SERVER_URL } from "@env";
  import Loader from "@components/Loader.svelte";

  let servers = $state({});
  let loading = $state(true);

  /**
   * Search
   */
  async function getServers() {
    try {
      // fetch
      loading = true;
      const searchReq = await fetch(`${SERVER_URL}/game-servers`).catch(
        (err) => {
          console.log(err);
          loading = false;
        },
      );

      const data = await searchReq.json();
      servers = data;
      loading = false;
    } catch (err) {
      console.log(err);
      loading = false;
    }
  }

  $effect(() => {
    getServers();
  });
</script>

<div class="game-servers">
  {#if loading}
    <Loader />
  {/if}
  {#if !loading}
    {#each Object.entries(servers) as [key, value]}
      <div class="server">
        <img
          src={`/images/site/${value.icon}`}
          alt=""
          class={value.error ? "offline" : "online"}
          title={value.error
            ? `${key} offline`
            : `${key} - ${value.numplayers} online`}
        />
        {#if value.error}
          <span>Down</span>
        {/if}
        {#if !value.error}
          <span>
            {value.numplayers}/{value.maxplayers}
          </span>
        {/if}
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @use "@css/util";

  .game-servers {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 1rem;

    @include util.mq(md) {
      justify-content: flex-start;
    }
  }

  .server {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    font-family: var(--font-family-mono);
    font-size: 0.7rem;
    font-weight: bold;
  }

  img {
    width: 32px;
    height: 32px;

    &.offline {
      opacity: 0.42;
      filter: sepia(100%) hue-rotate(330deg);
    }
  }
</style>
