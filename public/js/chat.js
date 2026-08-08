document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-message");
  const log = document.getElementById("chat-log");
  document.querySelectorAll(".chip").forEach(chip => chip.addEventListener("click", () => { input.value = chip.dataset.message; input.focus(); }));

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const question = input.value.trim();
    if (!question) return;
    addBubble(question, "user"); input.value = "";
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ question }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.message);
      addBubble(result.data.reply, "ai");
    } catch (e) { addBubble(e.message, "ai"); }
  });
  function addBubble(text, type) { const li = document.createElement("li"); li.className = `bubble bubble--${type}`; li.textContent = text; log.appendChild(li); log.scrollTop = log.scrollHeight; }
});
