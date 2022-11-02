const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const newQuotetBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Loading Spinner Show
const showLoadingloading = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

// Remove Loading Spinner
const removeLoadingSpinner = () => {
  loader.hidden = true;
  quoteContainer.hidden = false;
};

// Get Quote From API
async function getQuotes() {
  showLoadingloading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log(error);
  }
  return apiQuotes;
}

function newQuote() {
  showLoadingloading();
  const quote = apiQuotes[Math.floor(Math.random() * 1000)];

  //Check if Author field is blank and replace it with 'Unknow'
  !quote.author
    ? (quoteAuthor.textContent = "Unknow")
    : (quoteAuthor.textContent = quote.author);

  //Dynamically reduce font size for long quotes
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

const tweerQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
};

newQuotetBtn.addEventListener("click", newQuote);
tweetBtn.addEventListener("click", tweerQuote);
getQuotes();
