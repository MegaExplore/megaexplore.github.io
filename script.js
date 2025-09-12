// ====== SELECT FORM ELEMENT ======
const form = document.querySelector("#contact-form");
const submitButton = document.querySelector("#submit-button");
const messageBox = document.querySelector("#message-box");

// ====== HANDLE FORM SUBMISSION ======
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Disable button to prevent multiple submissions
  submitButton.disabled = true;
  messageBox.textContent = "Sending...";

  try {
    // Get Turnstile token
    const turnstileToken = await new Promise((resolve, reject) => {
      if (typeof turnstile !== "undefined") {
        turnstile.execute("cf-turnstile-widget", { async: true, callback: resolve });
      } else {
        reject(new Error("Turnstile not loaded"));
      }
    });

    // Collect form data
    const formData = new FormData(form);
    formData.append("cf-turnstile-response", turnstileToken);

    // Send data to Cloudflare Worker
    const response = await fetch("https://megalibertacontactform.chrisperolla.workers.dev/send-email", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || "Server error");
    }

    const result = await response.json();
    if (result.success) {
      messageBox.textContent = "Message sent successfully!";
      form.reset();
      turnstile.reset("cf-turnstile-widget"); // Reset Turnstile widget
    } else {
      throw new Error(result.error || "Unknown error");
    }

  } catch (err) {
    console.error("Fetch error:", err);
    messageBox.textContent = `Error: ${err.message}`;
  } finally {
    submitButton.disabled = false;
  }
});

