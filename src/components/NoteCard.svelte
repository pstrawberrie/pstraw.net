<script>
  import SVG from "@components/SVG.svelte";
  let { itemData, featured = false } = $props();

  const id = itemData.id;
  const data = itemData.data ? itemData.data : itemData;

  const date = new Date(
    data?.updated ? "" + data.updated : "" + data.date
  ).toLocaleString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
</script>

<a class={`card note${featured ? "featured" : ""}`} href={`/notes/${id}`}>
  <img src={`/images/notes/${id}.jpg`} alt="" />
  <div class="top">
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
      <span>{data.updated ? "Updated" : "Written"} {date}</span>
    </div>
  </div>
</a>

<style lang="scss">
  @use "@css/util";

  .card.note {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-decoration: none;
    background-color: var(--font-color-opposite);
    border: 2px solid var(--background-accent);
    border-radius: 0.15rem;

    &::after {
      display: none;
    }

    .top {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      padding: 1rem;
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
      padding: 0.5rem 1rem;
      font-size: 0.8rem;
      font-weight: bold;
      border-top: 2px solid var(--background-accent);

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
