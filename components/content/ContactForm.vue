<script setup>
  let message = ref("");
  let email = ref("");
  let phone = ref("");
  let fullName = ref("");
  let replyMode = ref("");
</script>

<template>
  <div>
    <p><slot /></p>
    <form method="post" data-netlify="true">
      <div class="form-row">
        <label for="full-name">Your name</label>
        <input name="fullName" id="full-name" v-model="fullName" placeholder="eg.. John Smith" />
      </div>
      <div class="form-row">
        <label for="message">Your message</label>
        <textarea name="message" id="message" v-model="message" placeholder="Let me know what you want to chat about ..." />
      </div>
      <div class="form-row">
        <h5>
          How would you like a reply?
        </h5>
        <div class="radio-row">
          <input type="radio" name="replyMode" v-model="replyMode" id="reply-mode-email" value="email">
          <label for="reply-mode-email">
            Email
          </label>
        </div>
        <div class="radio-row">
          <input type="radio" name="replyMode" v-model="replyMode" id="reply-mode-phone" value="phone">
          <label for="reply-mode-phone">
            Phone
          </label>
        </div>
      </div>
      <div v-if="replyMode === 'phone'" class="form-row">
        <label for="phone">Your Phone Number</label>
        <input name="phone" id="phone" v-model="phone" placeholder="eg.. 0444 444 444" />
      </div>
      <div v-if="replyMode === 'email'" class="form-row">
        <label for="email">Your Email Address</label>
        <input name="email" id="email" type="email" v-model="email" placeholder="eg.. sample@sample.com" />
      </div>
      <div class="form-row">
        <input type="hidden" name="form-name" value="contact" />
        <button type="submit">
          Send Message
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped>
  .form-row {
    display: flex;
    flex-direction: column;
    margin-bottom: var(--p-2);
    padding-bottom: var(--p-2);
  }
  .form-row label {
    font-size: 0.9rem;
    font-weight: bold;
  }
  .form-row label {
    margin-bottom: var(--p-1);
  }
  input {
    border: 1px solid var(--color-light);
    border-radius: var(--p-1);
    padding: var(--p-1);
  }
  textarea {
    width: 100%;
    height: 200px;
    border: 1px solid var(--color-light);
    border-radius: var(--p-1);
    padding: var(--p-2);
  }
  button {
    border-radius: var(--p-1);
    padding: var(--p-1);
    font-weight: bold;
    border: 0;
    box-shadow: 2px 2px 0 var(--color-dark);
    background:var(--color-dark-accent);
    color: var(--color-light);
  }

</style>