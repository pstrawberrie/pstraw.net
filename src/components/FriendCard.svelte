<script>
  import SVG from "@components/SVG.svelte";
  let { itemData } = $props();

  const id = itemData.id;
  const data = itemData.data ? itemData.data : itemData;
</script>

<a class="card friend" href={`/friends/${id}`}>
  <img src={`/images/friends/${data.images[0]}`} alt="" />
  <div class="top">
    <div class="details">
      <div class="title">{data.title}</div>
      <div class="info">
        {#each data.tags as t}
          <span>{t}</span>
        {/each}
      </div>

      <div class="overview truncate-2">{data.description}</div>
    </div>
  </div>

  <div class="bottom">
    <div>
      <SVG name="friend" /> Friend
    </div>
  </div>
</a>

<style lang="scss">
  @use "@css/util";

  .card.friend {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    background-color: var(--font-color-opposite);
    border: 2px solid var(--background-accent);
    border-radius: 0.15rem;
    transition: transform 0.15s ease-out;

    &::after {
      display: none;
    }

    &:hover {
      transform: translateY(-2px);
      z-index: 2;
    }

    .top {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 0.7rem;
    }

    .details {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .title {
      font-weight: bold;
      font-size: 1.75rem;
      line-height: 1.2;
    }

    .info {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 5px;
      font-size: 0.75rem;
      opacity: 0.75;
      pointer-events: none;

      span {
        padding: 2px 4px;
        border: 1px solid var(--background-accent);
        border-radius: 2px;
      }
    }

    .overview {
      margin-top: 1rem;
      line-height: 1.1;
    }

    .bottom {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding: 0.5rem 0.7rem;
      font-size: 0.8rem;
      font-weight: bold;
      border-top: 2px solid var(--background-accent);

      :global(svg) {
        position: relative;
        top: -1px;
        width: 14px;
        fill: var(--font-color);
      }
    }
  }
</style>
