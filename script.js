const urlElement = document.getElementById('url');
const responseElement = document.getElementById('response');
const printElement = document.getElementById('print');
const companyElement = document.getElementById('company');
var pageContent;

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { type: "getCount" }, function (count) {
  pageContent = count;
  document.getElementById('summary').textContent = pageContent;
});
  const domain = new URL(tabs[0].url).hostname.replace(/.+\/\/|www.|\..+/g, '');
  companyElement.innerText = domain.charAt(0).toUpperCase() + domain.slice(1);;
  urlElement.innerText = `What do you think of ${domain}?`;
  const apiKey = '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';
  console.log("page content", pageContent)
  const prompt = `Summarize the privacy policy of ${domain}`;
  const temperature = 0.5;
  const maxTokens = 150; 

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
