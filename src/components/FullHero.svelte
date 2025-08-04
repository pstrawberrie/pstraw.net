<script lang="ts">
  let {
    title,
    subtitle = undefined,
    image = undefined,
    buttons = [],
    feature = undefined,
  } = $props();
</script>

<div class="hero">
  <div class="container hero_content">
    <div class="hero_text">
      <h1>{title}</h1>
      {#if subtitle}
        <p>{subtitle}</p>
      {/if}
      {#if buttons.length > 0 && buttons[0].title && buttons[0].href}
        <div class="hero_buttons">
          {#each buttons as button}
            <a class="btn {button.class || ''}" href={button.href}
              >{button.title}</a
            >
          {/each}
        </div>
      {/if}
    </div>
    {#if image}
      <div class="hero_image">
        <img src={image} alt={title} />
      </div>
    {/if}
  </div>

  <div class="feature">
    {#if feature === "stars"}
      <div class="stars"></div>
      <div class="stars stars-2"></div>
      <style>
        .stars {
          position: absolute;
          width: 100%;
          height: 100%;
        }

        .stars::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 2px;
          background: transparent;
          border-radius: 50%;
          box-shadow:
            3vw 8vh 0px 0px #fff,
            12vw 12vh 0px 1px #fff,
            25vw 18vh 0px 0px #fff,
            42vw 25vh 0px 2px #fff,
            62vw 22vh 0px 0px #fff,
            75vw 38vh 0px 1px #fff,
            92vw 32vh 0px 2px #fff,
            18vw 45vh 0px 0px #fff,
            38vw 52vh 0px 0px #fff,
            55vw 58vh 0px 1px #fff,
            72vw 65vh 0px 0px #fff,
            85vw 72vh 0px 2px #fff,
            8vw 78vh 0px 0px #fff,
            28vw 85vh 0px 1px #fff,
            48vw 92vh 0px 1px #fff,
            68vw 98vh 0px 0px #fff,
            88vw 95vh 0px 2px #fff,
            95vw 15vh 0px 0px #fff,
            5vw 32vh 0px 0px #fff,
            22vw 65vh 0px 1px #fff,
            35vw 20vh 0px 0px #fff,
            58vw 45vh 0px 2px #fff,
            78vw 58vh 0px 0px #fff,
            95vw 82vh 0px 1px #fff,
            7vw 58vh 0px 1px #fff,
            27vw 95vh 0px 0px #fff,
            47vw 8vh 0px 2px #fff,
            67vw 85vh 0px 0px #fff,
            87vw 28vh 0px 1px #fff,
            12vw 72vh 0px 0px #fff;
          animation: twinkle 3s linear infinite;
        }

        .stars-2::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 2px;
          height: 2px;
          background: transparent;
          border-radius: 50%;
          box-shadow:
            15vw 15vh 0px 0px #fff,
            35vw 35vh 0px 2px #fff,
            57vw 20vh 0px 0px #fff,
            77vw 48vh 0px 1px #fff,
            98vw 28vh 0px 2px #fff,
            6vw 62vh 0px 0px #fff,
            27vw 82vh 0px 0px #fff,
            47vw 75vh 0px 1px #fff,
            69vw 92vh 0px 0px #fff,
            90vw 88vh 0px 2px #fff,
            96vw 62vh 0px 0px #fff,
            11vw 98vh 0px 0px #fff,
            32vw 3vh 0px 2px #fff,
            54vw 42vh 0px 0px #fff,
            74vw 10vh 0px 1px #fff,
            95vw 55vh 0px 0px #fff,
            98vw 45vh 0px 2px #fff,
            4vw 42vh 0px 0px #fff,
            24vw 62vh 0px 0px #fff,
            44vw 30vh 0px 1px #fff,
            64vw 78vh 0px 2px #fff,
            85vw 70vh 0px 0px #fff,
            94vw 98vh 0px 0px #fff,
            10vw 22vh 0px 1px #fff,
            30vw 75vh 0px 2px #fff,
            50vw 55vh 0px 0px #fff,
            70vw 33vh 0px 0px #fff;
          animation: twinkle 4s linear infinite;
        }

        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 1;
          }
        }
      </style>
    {/if}
  </div>
</div>

<style lang="scss">
  @use "@css/util";

  .hero {
    position: relative;
    display: flex;
    align-items: center;
    min-height: 100vh;
    background: var(--full-hero-gradient);
    padding: var(--space-page-v) 0;
    overflow: hidden;
  }

  .hero_content {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--space-page-v);
    text-align: center;
    z-index: 1;

    @include util.mq(md) {
      grid-template-columns: 1fr 0.75fr;
      text-align: left;
    }
  }

  .hero_text {
    display: flex;
    flex-direction: column;
    gap: var(--space-page-h);
  }

  .hero_buttons {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

    @include util.mq(sm) {
      flex-direction: row;
    }

    @include util.mq(md) {
      justify-content: flex-start;
    }
  }

  h1 {
    font-family: var(--font-family-title);
    font-weight: 600;
    text-shadow: var(--full-hero-text-shadow);
  }

  p {
    font-size: var(--full-hero-text-size);
    font-weight: 500;
    color: var(--c-text-secondary);
  }

  img {
    position: relative;
    top: -10px;
    max-width: 70%;
    animation: float 6s ease-in-out infinite;
    z-index: 2;

    @keyframes float {
      0%,
      100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-18px);
      }
    }

    @include util.mq(md) {
      max-width: 100%;
    }
  }

  .feature {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
  }
</style>
