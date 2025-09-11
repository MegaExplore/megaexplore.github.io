const response = await fetch("https://megalibertacontactform.chrisperolla.workers.dev//send-email", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: "Test User",
    email: "test@example.com",
    message: "Hello World!",
    "g-recaptcha-response": "dummy-token"
  })
})

console.log(await response.json())

