<script>
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

<a class={`card note-card ${featured ? "featured" : ""}`} href={`/notes/${id}`}>
  <div class="top">
    <div class="date">{data.updated ? "Updated" : "Written"} {date}</div>
  </div>
  <h3 class="title">{data.title}</h3>
  <p class="description">{data.description}</p>
  <div class="tags">
    {#each data.tags as t}
      <div class="tag">#{t}</div>
    {/each}
  </div>
</a>

<style lang="scss">
  @use "@css/util";

  .note-card {
    flex-direction: column;
    border-color: var(--c-card-border);
    background-color: var(--c-card-background);
    backdrop-filter: blur(10px);

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 1px;
      background: linear-gradient(
        135deg,
        rgba(0, 0, 0, 0) 0%,
        var(--c-primary) 10%,
        var(--c-secondary) 50%,
        var(--c-primary) 90%,
        rgba(0, 0, 0, 0) 100%
      );
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &::after {
      box-shadow: 0 20px 60px rgba(var(--secondary-rgb), 0.2);
    }

    &:hover {
      &::before {
        transform: scaleX(1);
      }
    }

    &.featured {
      border-color: rgba(var(--primary-rgb), 0.11);
      background: linear-gradient(
        135deg,
        rgba(var(--primary-rgb), 0.075),
        rgba(var(--secondary-rgb), 0.075)
      );

      @include util.mq(md) {
        grid-column: span 2;
      }
    }
  }

  .top {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    font-size: 0.875rem;
  }

  .date {
    font-family: var(--font-family-mono);
    color: var(--c-text-muted);
  }

  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }

  .description {
    font-size: 1rem;
    color: var(--c-text-secondary);
    padding-bottom: 0.5rem;
  }

  .tags {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    flex-wrap: wrap;

    @include util.mq(md) {
      justify-content: flex-start;
    }
  }

  .tag {
    background-color: var(--c-card-content-background);
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    font-size: 0.75rem;
    font-weight: 500;
    color: var(--c-card-content-background-text);
  }
</style>
