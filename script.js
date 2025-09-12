
const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = form.name.value;
  const email = form.email.value;
  const message = form.message.value;

  // Get Turnstile token
  const token = document.querySelector('[name="cf-turnstile-response"]').value;

  try {
    const res = await fetch("https://megalibertacontactform.chrisperolla.workers.dev/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message, token }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Message sent successfully!");
      form.reset();
      turnstile.reset(); // reset Turnstile
    } else {
      console.error(data);
      alert("Error: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    console.error(err);
    alert("Fetch error: " + err.message);
  }
});

