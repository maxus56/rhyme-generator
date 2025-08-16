const API_KEY = "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"; // Вставь сюда свой ключ

document.getElementById("generateBtn").addEventListener("click", async () => {
  const name = document.getElementById("nameInput").value.trim();
  const resultsList = document.getElementById("results");
  resultsList.innerHTML = "";

  if (!name) {
    alert("Please enter a name!");
    return;
  }

  const prompt = `You are a witty and slightly edgy rhyme generator.
Your job is to take any given name and create 10 funny, rhyming, or pun-like words/phrases related to it.

# Rules
- Always return exactly 10 outputs.
- Keep it clean: no profanity, vulgarity, or sexual content.
- It’s allowed to be silly, absurd, or dark-humored, as long as it’s safe for work.
- Use rhymes, near-rhymes, wordplay, parodies, or funny associations with the name.
- Each output must be short (1–6 words).
- Do NOT explain the jokes. Only output the list.

# Output format
- A simple numbered list from 1 to 10.
- Each line must contain only one funny word/phrase.

Input: ${name}
Output:`;

  try {
    const response = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.8,
        max_tokens: 300
      })
    });

    const data = await response.json();
    const text = data.choices?.[0]?.message?.content || "No rhymes found.";
    const lines = text.split("\n").filter(line => line.trim());

    lines.forEach(line => {
      const li = document.createElement("li");
      li.textContent = line;
      resultsList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
    alert("Error fetching rhymes. Check console for details.");
  }
});