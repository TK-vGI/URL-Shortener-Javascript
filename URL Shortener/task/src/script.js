// Stage 1 - basic functionalities
let input = document.getElementById('input-url');
let urlList = document.getElementById('list-url');
let errorMessage = document.getElementById('error-message');
// 1. check validity of input;
function inputAction() {
    let url = input.value;
    if (/^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%:#&=]*)?$/.test(url) === true) {
        const createList = document.createElement('li');
        getShorturl(createList);
        urlList.appendChild(createList);
    } else {
        errorMessage.textContent = "Please enter a valid url";
    }
}
// 2. create short URL and append to HTML <ol> list
function getShorturl(parent) {
    let shortUrl = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++)
        shortUrl += possible.charAt(Math.floor(Math.random() * possible.length));
    const anchor = document.createElement('a');
    anchor.href = input.value;
    anchor.target = '_blank';
    anchor.innerText = `localhost/${shortUrl}`;
    const textNode = document.createTextNode(` - ${input.value}`);
    const span = document.createElement('span');
    span.innerText = ` - Clicks: 0`;
    const editButton = document.createElement('button');    // Stage 4 edit/save button
    editButton.innerText = 'Edit';
    editButton.id='button-edit';
    editButton.addEventListener('click', function() {
        editAction(editButton, shortUrl, anchor);
    });
    parent.appendChild(anchor);
    parent.appendChild(textNode);
    parent.appendChild(span);
    parent.appendChild(editButton);
}

// Stage 2 - add counting functionality ('CLicks') for short URL links
document.getElementById("list-url").addEventListener("click", function (e) {
    let counterElement = e.target.nextElementSibling;
    let countNumber = counterElement.innerText.at(11);
    let counter = parseInt(countNumber);
    counter++;
    counterElement.innerText = ' - Clicks: ' + counter;
})

// Stage 3 - add delete button functionality
function deleteAction() {
    let inputField = document.getElementById("input-url").value;
    let listItems = document.querySelectorAll("li");
    if (inputField === null || inputField === '') {
        // delete all items in list
        listItems.forEach(listItem => {
            listItem.remove();
        });
    } else {
        // delete only specific items in list
        listItems.forEach(listItem => {
            if (listItem.href === inputField || listItem.innerText.includes(inputField)) {
                listItem.remove();
            }
        });
    }
}

// Stage 4 - add edit/save button functionality
function editAction(editButton, shortUrl, anchor) {
    const listItem = editButton.parentElement;
    if (editButton.innerText === 'Edit') {                                        // Switch to Edit Mode
        const input = document.createElement('input');
        input.value = shortUrl;
        listItem.replaceChild(input, anchor);                                     // Replace link with input

        editButton.innerText = 'Save';                                            // Change button text to Save
    } else if (editButton.innerText === 'Save') {                                 // Switch to Save Mode
        const input = listItem.querySelector('input');
        const newShortUrl = input.value.trim();
        if (newShortUrl.length >= 5) {
            anchor.innerText = `localhost/${newShortUrl}`;                        // Update the text with new short URL
            listItem.replaceChild(anchor, input);                                 // Replace input with link
        }
        editButton.innerText = 'Edit';                                            // Change button text back to Edit
    }
}