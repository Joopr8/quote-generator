const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const newQuotetBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const languageInput = document.getElementById("language");
const selectTag = document.querySelectorAll("select");

let apiQuotes = [];
let translateLanguages = [];
let language;

//Add options to the form and put English as default
selectTag.forEach((tag, id) => {
  for (let country_code in countries) {
    let selected =
      id == 0 ? (country_code == "en-GB" ? "selected" : false) : false;
    let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", option);
  }
  translateLanguages.push("en - GB");
});

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

//Check Language Selected
const getLanguage = (e) => {
  language = e.target.value;
  translateQoute(quoteText.textContent, language);
};

const translateQoute = (quote, lang) => {
  translateLanguages.push(lang);
  let oldLang = translateLanguages[0]
    .substring(0, translateLanguages[0].indexOf("-"))
    .replace(/\s/g, "");
  let newLang = translateLanguages[1]
    .substring(0, translateLanguages[1].indexOf("-"))
    .replace(/\s/g, "");
  console.log(oldLang, newLang);
  let apiUrl = `https://api.mymemory.translated.net/get?q=${quote}!&langpair=${oldLang}|${newLang}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      translatedText = data.responseData.translatedText;
      quoteText.innerHTML = translatedText;
    });
  translateLanguages.shift();
  console.log(translateLanguages);
};

const tweerQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
};

languageInput.addEventListener("change", getLanguage);
newQuotetBtn.addEventListener("click", newQuote);
tweetBtn.addEventListener("click", tweerQuote);
getQuotes();
