const urlElement = document.getElementById('url');
const responseElement = document.getElementById('response');
const printElement = document.getElementById('print');

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  const domain = new URL(tabs[0].url).hostname;
  urlElement.innerText = `give me a bullet point list of the sensitive personal data is collected according to ${domain}?`;
  const apiKey = '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';
  const prompt = `What sensitive personal data is collected according to the cont https://www.tiktok.com/legal/page/us/privacy-policy/en#privacy-us`;
  const temperature = 0.2;
  const maxTokens = 1500;

  const body = {
    prompt,
    temperature,
    max_tokens: maxTokens,
  };

  const response = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  const data = await response.json();
  const answer = data.choices && data.choices.length > 0 ? data.choices[0].text.trim() : null;

  if (answer) {
    responseElement.innerText = answer;
  } else {
    responseElement.innerText = "Error: No answer received from API.";
  }

  console.log("Domain:", domain);
  console.log("API Key:", apiKey);
  console.log("Prompt:", prompt);
  console.log("Temperature:", temperature);
  console.log("Max Tokens:", maxTokens);
  console.log("Response:", data);
  console.log("Answer:", answer);

  printElement.innerHTML = `
    <p>Domain: ${domain}</p>
    <p>API Key: ${apiKey}</p>
    <p>Prompt: ${prompt}</p>
    <p>Temperature: ${temperature}</p>
    <p>Max Tokens: ${maxTokens}</p>
    <p>Response: ${JSON.stringify(data)}</p>
    <p>Answer: ${answer}</p>
  `;
});