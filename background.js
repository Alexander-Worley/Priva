// (async () => {
//   const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
//   const response = await chrome.tabs.sendMessage(tab.id, {message: "get_text"});
//   // do something with response here, not outside the function
//   console.log("greeting test" + response);
// })();

// A function to use as callback
// function doStuffWithDom(domContent) {
//   console.log('I received the following DOM content:\n' + domContent);
// }
// console.log("script runs")
// // When the browser-action button is clicked...
// chrome.browserAction.onClicked.addListener(function (tab) {
//   console.log("browser action clicked")
//   // ...check the URL of the active tab against our pattern and...
//       chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
// });