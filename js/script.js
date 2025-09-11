
try {
  const response = await fetch("megalibertacontactform.chrisperolla.workers.dev/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await response.json();
  console.log("Worker response:", response.status, result); // 🔍 Add this line

  if (response.ok) {
    status.innerHTML = "Thank you! Your message has been sent.";
    form.reset();
    grecaptcha.reset();
  } else {
    status.innerHTML = result.error || "Something went wrong.";
  }
} catch (error) {
  console.error("Fetch error:", error); // 🔍 Add this line
  status.innerHTML = "Something went wrong. Please try again.";
}














