const quoteInput = document.querySelector("#quoteInput");
const quoteButton = document.querySelector("#quoteButton");
const ul = document.querySelector("ul");
const quoteDelete = document.querySelector(".quoteDelete");
const quoteCheckbox = document.querySelector(".quoteCheckbox");
const deleteQuoteButton = document.querySelector("#deleteQuotes");
const introText = document.querySelector("#introText");
const userInput = document.querySelector("#userInput");
const userButton = document.querySelector("#userButton");

let currentUserId, currentUsername;

function addQuote() {
  if (!quoteInput.value || !userInput.value) {
    alert("Please fill in the required fields");
  } else {
    addQuoteToDb({
      quote: quoteInput.value.toLowerCase(),
      user: userInput.value.toLowerCase(),
    });
    setTimeout(function () {
      getQuoteList(updateQuoteList);
    }, 250);
    quoteInput.value = "";
  }
}

async function addQuoteToDb(data) {
  await fetch("http://localhost:5000/newQuotes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data), //could have a response sent here after quote sent to database to kick off addQuoteToList
  });
}

async function getQuoteList(callback) {
  const response = await fetch("http://localhost:5000/savedQuotes");
  const { payload } = await response.json();
  callback(payload);
}

function updateQuoteList(quoteList) {
  //quotes not getting id, need to add this to addQuoteToDatabase
  ul.textContent = "";
  quoteList.map(function (value) {
    addQuoteToList(value.quote, value.id, value.username);
  });
}

function addQuoteToList(quote, id, username) {
  const newLi = document.createElement("li");
  const quoteText = document.createTextNode(quote);
  const usernameText = document.createTextNode(`(${username}) `);
  newLi.setAttribute("id", `li${id}`);
  newLi.appendChild(createCheckbox(id));
  newLi.appendChild(usernameText);
  newLi.appendChild(quoteText);
  ul.appendChild(newLi);
}

function createCheckbox(id) {
  const newCheckbox = document.createElement("input");
  newCheckbox.setAttribute("type", "checkbox");
  newCheckbox.className = "quoteCheckbox";
  newCheckbox.setAttribute("id", id);
  return newCheckbox;
}

async function deleteQuote() {
  const allBoxes = Array.from(
    document.querySelectorAll(`.quoteCheckbox[type='checkbox']:checked`)
  );
  let dbIdToDelete = allBoxes.map(function (value) {
    const li = document.querySelector(`#li${value.id}`);
    ul.removeChild(li);
    return Number(value.id);
  });
  const liCount = dbIdToDelete.length;
  await fetch("/deleteQuote", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ liCount, dbIdToDelete }),
  });
}

deleteQuoteButton.addEventListener("click", deleteQuote);
quoteButton.addEventListener("click", addQuote);
quoteInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addQuote();
  }
});

getQuoteList(updateQuoteList);
