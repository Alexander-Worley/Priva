// In order to use this extension,
// you must obtain an OpenAI GPT-3 APIKey.
// You can obtain one here: https://platform.openai.com/account/api-keys
// Once you obtain your APIKey, past it between the '' below:
const apiKey = '';

// Store question for GPT-3 and GPT-3's response.
const questionElement = document.getElementById('question');
const responseElement = document.getElementById('response');

function getWebsiteName(url) {
  // Remove "www." and ".com"
  let websiteName = url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, '').replace(/\/.*$/, '');
  // Remove subdomains
  websiteName = websiteName.split('.').slice(-2, -1)[0];
  // Convert to uppercase
  websiteName = websiteName.charAt(0).toUpperCase() + websiteName.slice(1);
  return websiteName;
}

// Prepare API input
chrome.tabs.query({ active: true, currentWindow: true }, async function (tabs) {
  responseElement.innerText = "I'm sorry, but this webpage is not a valid WWW address. This extension can only handle internet-level webpages, not system-level ones.";
  
  const url = new URL(tabs[0].url).hostname;
  const domain = getWebsiteName(url);

  questionElement.innerText = `What data does ${domain} collect about its users, and how does it use it?`;
  responseElement.innerText = "Loading...";

  const prompt = `Give me the gist of how ${domain} collects data about its users, and how the company uses it.`;
  const temperature = 0.5;
  const maxTokens = 150;

  const body = {
    prompt,
    temperature,
    max_tokens: maxTokens,
  };

  // Call API
  try {
    const response = await fetch(`https://api.openai.com/v1/engines/davinci/completions?engine=davinci&prompt=${encodeURIComponent(prompt)}&temperature=${temperature}&max_tokens=${maxTokens}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify(body)
    });

    // Ensure response is valid
    const data = await response.json();
    const answer = data.choices && data.choices.length > 0 ? data.choices[0].text.trim()+"..." : null;

    if (answer) {
      responseElement.innerText = answer;
    } else {
      responseElement.innerText = "Error: No answer received from API.";
    }

  } catch (error) {
    responseElement.innerText = `Error: ${error.message}`;
  }
});