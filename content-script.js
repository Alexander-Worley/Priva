chrome.runtime.onMessage.addListener(
  function(message, sender, sendResponse) {
      switch(message.type) {
          case "getCount":
              sendResponse(document.documentElement.innerText);
              break;
          default:
              console.error("Unrecognised message: ", message);
      }
  }
);
