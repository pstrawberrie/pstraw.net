<script>
  let { url } = $props();
  const isYT = url.includes("youtube.com");
  const isSpotify = url.includes("open.spotify.com");
  // @TODO: THIRD PARTIES ARE SHIT ASS - FIGURE OUT BETTER METHOD
  // SPOTIFY SHARE LINK
  // https://open.spotify.com/track/0NPkaQcG0lTv1KBtlgpMFy?si=87b85e75362d4b9e
</script>

{#if isYT}
  <iframe
    title=""
    style="border-radius:12px"
    src={`http://www.youtube-nocookie.com/embed/${url.replace("https://www.youtube.com/watch?v=", "")}/`}
    frameborder="0"
    allowfullscreen
  ></iframe>
{/if}

{#if isSpotify}
  <iframe
    title=""
    style="border-radius:12px"
    src={`https://open.spotify.com/embed/track/${url.replace("https://open.spotify.com/track/", "")}`}
    width="100%"
    height="352"
    frameBorder="0"
    allowfullscreen=""
    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
    loading="lazy"
  ></iframe>
{/if}
