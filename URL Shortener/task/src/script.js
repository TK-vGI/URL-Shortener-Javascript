let input = document.getElementById('input-url');
let urlList = document.getElementById('list-url');
let errorMessage = document.getElementById('error-message');

function inputAction() {
    let url = input.value;
    if (/^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w-.\/?%:#&=]*)?$/.test(url) === true) {
        const createList = document.createElement('li');
        createList.innerHTML = getRandomShorturl();
        urlList.appendChild(createList);
    } else {
        errorMessage.textContent = "Please enter a valid url";
    }
}

function getRandomShorturl() {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return `<a target='_blank' href='${input.value}' >localhost/${text}</a> - ${input.value}<span> - Clicks: 0</span>`;
}

document.getElementById("list-url").addEventListener("click", function(e) {
    let counterElement = e.target.nextElementSibling;
    let countNumber = counterElement.innerText.at(11);
    let counter = parseInt(countNumber);
    counter++;
    counterElement.innerText = ' - Clicks: ' + counter;
})