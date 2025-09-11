const data = {
  name: form.name.value,
  email: form.email.value,
  message: form.message.value,
  "g-recaptcha-response": grecaptcha.getResponse()
}

const response = await fetch("https://megalibertacontactform.chrisperolla.workers.dev/send-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
})

const result = await response.json()
console.log("Worker response:", result)

