const urlElement = document.getElementById('url');
const responseElement = document.getElementById('response');
const printElement = document.getElementById('print');
const companyElement = document.getElementById('company');
const collectionElement = document.getElementById('collection');
var pageContent;

chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  chrome.tabs.sendMessage(tabs[0].id, { type: "getCount" }, function (count) {
  pageContent = count;
  document.getElementById('summary').textContent = pageContent;
});
  const domain = new URL(tabs[0].url).hostname.replace(/.+\/\/|www.|\..+/g, '');
  companyElement.innerText = domain.charAt(0).toUpperCase() + domain.slice(1);;
  // urlElement.innerText = `What do you think of ${domain}?`;
  const apiKey = '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';
  console.log("page content", pageContent)
  const prompt = `State the sensitive personal data ${domain} collects in 200 words or less.`;
  const temperature = 0.5;
  const maxTokens = 200; 

  // urlElement.innerText = `give me a bullet point list of the sensitive personal data is collected according to ${domain}?`;
  // const apiKey = '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';
  // const prompt = `What sensitive personal data is collected according to the cont https://www.tiktok.com/legal/page/us/privacy-policy/en#privacy-us`;
  // const temperature = 0.2;

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
  
  // Data collected
  const prompt2 = `Summarize what sensitive personal data ${domain} collects`;
  const body2 = {
    prompt : prompt2,
    temperature,
    max_tokens: maxTokens,
  };

  const response2 = await fetch("https://api.openai.com/v1/engines/davinci/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body2)
  });
  const data2 = await response2.json();
  const answer2 = data2.choices && data2.choices.length > 0 ? data2.choices[0].text.trim() : null;
  
  console.log("data", data2)
  console.log("answer", answer2)
  if (answer2) {
    collectionElement.innerText = answer2;
  } else {
    collectionElement.innerText = "Error: No answer received from API.";
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
