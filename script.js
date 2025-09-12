document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";

    try {
      const token = await new Promise((resolve, reject) => {
        if (window.turnstile) {
          turnstile.execute("#cf-turnstile-widget", { action: "submit" })
            .then(resolve)
            .catch(reject);
        } else {
          reject("Turnstile not loaded");
        }
      });

      const formData = new FormData(form);
      formData.append("cf-turnstile-response", token);

      const response = await fetch("/send-email", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        status.textContent = "Message sent successfully!";
        form.reset();
        turnstile.reset("#cf-turnstile-widget"); // reset widget
      } else {
        status.textContent = "Error: " + (result.error || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      status.textContent = "Fetch error: " + err;
    }
  });
});

