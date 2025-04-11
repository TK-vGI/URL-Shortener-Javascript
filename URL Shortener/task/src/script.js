// Get input element
const input = document.getElementById("input-url");
// Get list element
const listURL = document.getElementById("list-url");
// Get button element
let createBtn = document.getElementById("button-create");
//Get error message <p> element
let errorMessage = document.getElementById("error-message");
// Check validity of input URL link
function checkURL() {
    let userInput = input.value;
    // check input value with RegExp value vor validation
    if (/^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%:#&=]*)?$/.test(userInput) === true) {
        const createList = document.createElement('li');
        createShortURL(createList);
        listURL.appendChild(createList);
    } else {
        errorMessage.textContent = "Please enter a valid url";
    }
}
// Create short-link
function createShortURL(parent) {
    let shortUrl = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++)
        shortUrl += possible.charAt(Math.floor(Math.random() * possible.length));
    // create link (<a>) element
    const anchor = document.createElement('a');
    // set attributes for new link
    anchor.href = input.value;
    anchor.target = '_blank';
    anchor.innerText = `localhost/${shortUrl}`;
    // create <span> element with actual link, which will be appended to shortURL in list item
    const textNode = document.createTextNode(` - ${input.value}`);
    parent.appendChild(anchor);
    parent.appendChild(textNode);
}