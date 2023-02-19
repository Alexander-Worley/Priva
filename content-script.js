function getText(){
  return document.body.innerText
}
function getHTML(){
  return document.body.outerHTML
}
console.log(getText());             //Gives you all the text on the page
console.log(getHTML());