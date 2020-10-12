const quoteInput = document.querySelector('#quoteInput');
const quoteButton = document.querySelector('#quoteButton');
const ul = document.querySelector('ul');
const quoteDelete = document.querySelector('.quoteDelete');
const quoteCheckbox = document.querySelector('.quoteCheckbox');
const deleteQuoteButton = document.querySelector('#deleteQuotes');
const introText = document.querySelector('#introText');
const userInput = document.querySelector('#userInput');
const userButton = document.querySelector('#userButton');

function addQuote() {
    if (quoteInput.value === "") {
        alert('Quote cannot be blank.');
    } else if (introText.textContent === "***") {
        alert('Enter identity.');
    } else {
        addQuoteToDb(quoteInput.value);
        addQuoteToList(quoteInput.value);
        quoteInput.value = "";
    };
};

async function getQuoteList(callback) {
    const response = await fetch('/savedQuotes');
    const { payload } = await response.json();
    callback(payload);
};

function updateQuoteList(quoteList) { //quotes not getting id, need to add this to addQuoteToDatabase
    ul.textContent = "";
    quoteList.map(function (value) {
        addQuoteToList(value.quote, value.id)
    });
};

async function addQuoteToDb(quote) {
    await fetch('/newQuotes', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quote })//could have a response sent here after quote sent to database to kick off addQuoteToList
    });
};

function addQuoteToList(quote, id) {
    const newLi = document.createElement('li');
    const quoteText = document.createTextNode(quote);
    newLi.setAttribute('id', `li${id}`);
    newLi.appendChild(createCheckbox(id));
    newLi.appendChild(quoteText);
    ul.appendChild(newLi);
};

function createCheckbox(id) {
    const newCheckbox = document.createElement('input');
    newCheckbox.setAttribute('type', 'checkbox');
    newCheckbox.className = 'quoteCheckbox';
    newCheckbox.setAttribute('id', id);
    return newCheckbox;
};

async function deleteQuote() {
    const allBoxes = Array.from(document.querySelectorAll(`.quoteCheckbox[type='checkbox']:checked`));
    let dbIdToDelete = allBoxes.map(function (value) {
        const li = document.querySelector(`#li${value.id}`);
        ul.removeChild(li);
        return Number(value.id);
    });
    const liCount = dbIdToDelete.length;
    await fetch("/deleteQuote", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ liCount, dbIdToDelete })
    });
};

deleteQuoteButton.addEventListener('click', deleteQuote);
quoteButton.addEventListener('click', addQuote);
quoteInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        addQuote();
    }
});

getQuoteList(updateQuoteList);