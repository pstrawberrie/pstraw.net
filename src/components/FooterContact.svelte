<script>
  import { SERVER_URL } from "@env";
  import SVG from "@components/SVG.svelte";

  let contactFormButtonEl;
  let formEl;

  let active = $state(false);
  let errors = $state([]);

  let name = $state("");
  let email = $state("");
  let message = $state("");
  let naughty = $state("");

  function onFormSubmit(e) {
    e.preventDefault();
    validateForm();
  }

  function clearForm() {
    name = "";
    email = "";
    message = "";
  }

  function validateForm() {
    // check for empty message
    if (!message || message.trim() === "") {
      errors.push("Message is required");
    }

    // low-hanging fruit for bots
    if (naughty.length) errors.push("Hmmm...");

    // clear errors after a few seconds
    if (errors.length) {
      showErrors();
    } else {
      postForm();
    }
  }

  function showErrors() {
    formEl.classList.add("errors");
    setTimeout(() => {
      formEl.classList.remove("errors");
      errors = [];
    }, 5000);
  }

  async function postForm() {
    if (!active || naughty.length) return;

    // fetch
    const contactReq = await fetch(`${SERVER_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        naughty,
      }),
    }).catch((err) => {
      console.error("Error posting form: ", err);
      errors.push(`Error: ${err.message}`);
      showErrors();
    });

    const response = await contactReq;
    if (response.status !== 200) {
      errors.push("Error sending message - try again later");
      showErrors();
    } else {
      const json = await response.json();
      console.log(json);
      clearForm();
    }
  }
</script>

<svelte:document
  onkeydown={(e) => {
    if (e.key === "Escape" && active) {
      active = false;
    }
  }}
  onclick={(e) => {
    if (
      active &&
      !e.target.closest("#contact-form") &&
      e.target !== contactFormButtonEl
    ) {
      active = false;
    }
  }}
/>

<button
  class="btn"
  aria-expanded={active}
  aria-controls="contact-form"
  bind:this={contactFormButtonEl}
  onclick={() => (active = !active)}
>
  <SVG name="message" /> Contact
</button>
<div id="contact-form">
  <div class="title">
    <span class="text-gradient header-logo">What's Up?</span>
  </div>
  <form bind:this={formEl} onsubmit={onFormSubmit}>
    <fieldset>
      <label for="name">Name</label>
      <input
        bind:value={name}
        placeholder="Optional"
        type="text"
        id="name"
        name="name"
        tabindex={active ? "0" : "-1"}
      />
    </fieldset>
    <fieldset>
      <label for="email">Email</label>
      <input
        bind:value={email}
        placeholder="Optional"
        type="email"
        id="email"
        name="email"
        tabindex={active ? "0" : "-1"}
      />
    </fieldset>
    <fieldset>
      <label for="message">Message *</label>
      <textarea
        bind:value={message}
        placeholder="Required - enter an email if you'd like a response"
        id="message"
        name="message"
        tabindex={active ? "0" : "-1"}
      ></textarea>
    </fieldset>
    <input
      name="naughty"
      id="naughty"
      type="text"
      bind:value={naughty}
      tabindex="-1"
    />
    {#if errors.length}
      <div class="error">
        {#each errors as error}
          <i>{error}</i>
        {/each}
      </div>
    {/if}
    <input
      class="btn cta"
      type="submit"
      value="Send"
      tabindex={active ? "0" : "-1"}
      disabled={!message.length || errors.length}
    />
  </form>
</div>

<style lang="scss">
  @use "@css/util" as util;

  button.btn {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    :global(svg) {
      height: 20px;
      width: auto;
      fill: var(--c-text);
    }
  }

  #contact-form {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    bottom: 115%;
    left: 50%;
    width: 80vw;
    flex-wrap: nowrap;
    color: var(--c-text-secondary);
    border: 1px solid var(--c-text-tertiary);
    background-color: var(--c-background);
    box-shadow: 0 0 40px black;
    border-radius: 0.5rem;
    padding: 1.5rem;
    opacity: 0;
    transform: translate(-50%, 10px);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease;
    pointer-events: none;
    z-index: 10;

    @include util.mq(md) {
      width: 420px;
      left: auto;
      right: 0;
      transform: translate(0, 10px);
    }
  }

  button[aria-expanded="true"] + #contact-form {
    opacity: 1;
    transform: translate(-50%, 0);
    pointer-events: auto;

    @include util.mq(md) {
      transform: translate(0);
    }
  }

  .title {
    font-size: 1.25rem;
    font-family: var(--font-family-title);
    margin-bottom: 1rem;
  }

  form {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 1rem;
  }

  fieldset {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    transition: transform 0.3s ease;

    &:focus-within {
      transform: translateY(-2px);

      label {
        color: var(--c-quinary);
      }
    }
  }

  label {
    font-size: 0.9rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  input:not([type="submit"]),
  textarea {
    width: 100%;
    text-align: left;
    font-size: 0.9rem;
    padding: 0.25rem;
    border: 1px solid var(--c-card-border);
    border-radius: 0.25rem;
    transition: outline-color 0.3s ease;

    &::placeholder {
      opacity: 0.3;
    }

    &:focus-visible {
      outline-width: 1px;
    }
  }

  textarea {
    min-height: 100px;
  }

  input[type="submit"] {
    text-align: center;
    cursor: pointer;

    &:disabled {
      opacity: 0.3;
      cursor: not-allowed;

      &:hover {
        transform: none;
      }
    }
  }

  #naughty {
    height: 0;
    width: 0;
    padding: 0;
    border: 0;
    overflow: hidden;
  }

  .error {
    display: flex;
    flex-direction: column;
    gap: 0.33rem;
    font-size: 0.9rem;
    transition: opacity 0.3s ease;
    opacity: 1;

    i {
      position: relative;
      display: block;
      color: var(--c-text);
      text-align: center;
      font-weight: 500;
      padding: 0.5rem;
      border-radius: 0.25rem;
      border: 1px solid rgba(var(--state-error-rgb), 0.2);
      box-shadow: 0 0 10px rgba(var(--state-error-rgb), 0.05);
      overflow: hidden;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(var(--state-error-rgb), 0.1);
        transform-origin: left;
      }
    }
  }

  :global(form.errors .error i::before) {
    animation: err 5s linear;
  }

  @keyframes err {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
</style>
