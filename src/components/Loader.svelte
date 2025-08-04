<!-- CREDIT: https://uiverse.io/adamgiebl/thin-lionfish-5 -->

<div class="loader">
  <div class="inner"></div>
</div>

<style>
  .loader {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .inner {
    width: 32px;
    height: 32px;
    border: 2px solid var(--c-card-border);
    border-top: 2px solid var(--c-text-tertiary);
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
</style>
