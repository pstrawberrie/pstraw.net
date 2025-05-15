<script>
  import SVG from "@components/SVG.svelte";
  let { itemData, featured = false } = $props();

  const id = itemData.id;
  const data = itemData.data ? itemData.data : itemData;

  const date = new Date(
    data?.updated ? "" + data.updated : "" + data.date,
  ).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
</script>

<a class={`card note${featured ? "featured" : ""}`} href={`/notes/${id}`}>
  <div class="top">
    <img src={`/images/notes/${id}.png`} alt="" loading="lazy" />
    <div class="details">
      <div class="title">{data.title}</div>
      <div class="info">
        {#each data.tags as t}
          <span>#{t}</span>
        {/each}
      </div>

      <div class="overview truncate-2">{data.description}</div>
    </div>
  </div>

  <div class="bottom">
    <div>
      <SVG name="note" /><i>|</i>
      <span>{itemData.updated ? "Updated" : "Written"} {date}</span>
    </div>
    <div></div>
  </div>
</a>

<style lang="scss">
  @use "@css/util";

  .card.note {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-shadow: 0 1px 2px #0004;
    border-radius: 8px;
    text-decoration: none;
    transform: scale(1);
    transition:
      transform 0.15s ease-out,
      box-shadow 0.18s ease-out;

    &::after {
      display: none;
    }

    &:hover {
      box-shadow:
        rgba(0, 0, 0, 0.3) 0px 19px 38px,
        rgba(0, 0, 0, 0.22) 0px 15px 12px;
      transform: translateY(-2px);
      z-index: 2;
    }

    img {
      align-self: center;
      min-width: 80px;

      @include util.mq(sm) {
        min-width: 100px;
      }
    }

    .top {
      position: relative;
      display: flex;
      flex-direction: column;
      padding: 1rem;
      gap: 1rem;
    }

    .details {
      position: relative;
      display: flex;
      flex-direction: column;
    }

    .title {
      font-weight: bold;
      font-size: 1.2rem;
      line-height: 1.2;
    }

    .info {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 5px;
      font-size: 0.75rem;
      opacity: 0.6;
      pointer-events: none;

      span {
        padding: 2px 4px;
        border: 1px solid var(--background-transparent-opposite-3);
        border-radius: 2px;
      }
    }

    .overview {
      margin-top: 1rem;
      font-size: 0.9rem;
      line-height: 1.1;
    }

    .bottom {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      font-weight: bold;
      border-top: 1px solid var(--background-transparent-opposite);

      i {
        opacity: 0.2;
        padding: 0 3px;
        font-style: normal;
        font-weight: normal;
      }

      :global(svg) {
        position: relative;
        top: -1px;
        width: 14px;
        fill: var(--font-color);
      }
    }
  }
</style>
