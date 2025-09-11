




const form = document.getElementById("contact-form");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const token = grecaptcha.getResponse();
  if (!token) {
    status.innerHTML = "Please complete the reCAPTCHA.";
    return;
  }

  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
    "g-recaptcha-response": token
  };

  status.innerHTML = "Sending...";

  try {
    const response = await fetch("megalibertacontactform.chrisperolla.workers.dev/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Worker response:", result);

    if (response.ok) {
      status.innerHTML = "Thank you! Your message has been sent.";
      form.reset();
      grecaptcha.reset();
    } else {
      status.innerHTML = result.error || "Something went wrong.";
    }
  } catch (error) {
    console.error("Fetch error:", error);
    status.innerHTML = "Something went wrong. Please try again.";
  }
});


