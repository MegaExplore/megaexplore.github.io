document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contact-form");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.textContent = "Sending...";
    
    try {
      // Get Turnstile token
      const turnstileToken = await new Promise((resolve, reject) => {
        const widget = document.getElementById("cf-turnstile-widget"); // fix container
        if (!widget) return reject("Turnstile widget not found");

        turnstile.execute(widget, {
          async: true,
          callback: resolve,
          errorCallback: reject
        });
      });

      // Prepare form data
      const formData = new FormData(form);
      formData.append("cf-turnstile-response", turnstileToken);

      // Send to Cloudflare Worker
      const response = await fetch("/send-email", {
        method: "POST",
        body: formData
      });

      const result = await response.json();

      if (response.ok) {
        status.textContent = "Message sent successfully!";
        form.reset();
        turnstile.reset(); // reset Turnstile widget
      } else {
        console.error("Worker error:", result);
        status.textContent = result.error || "Something went wrong.";
      }
    } catch (err) {
      console.error("Fetch error:", err);
      status.textContent = "Failed to send message.";
    }
  });
});

