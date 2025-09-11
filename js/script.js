const response = await fetch("https://megalibertacontactform.chrisperolla.workers.dev/send-email", {
  method: "POST",                // Must be POST
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
    "g-recaptcha-response": grecaptcha.getResponse()
  })
});

