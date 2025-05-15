<!-- CREDIT: https://uiverse.io/adamgiebl/thin-lionfish-5 -->

<div class="loader">
  <div class="inner"></div>
</div>

<style>
  .loader {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .inner {
    border: 4px solid var(--font-color);
    border-left-color: transparent;
    width: 36px;
    height: 36px;
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
