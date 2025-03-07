import { useState } from "react";
import QUOTES from "../data/quotes";

export default function QuoteBox() {
  const initialQuote = QUOTES[Math.round(Math.random() * QUOTES.length)].text;

  const [newQuote, setNewQuote] = useState(initialQuote);

  function handleNewQuote() {
    const randomIndex = Math.floor(Math.random() * QUOTES.length);
    setNewQuote(QUOTES[randomIndex].text);
  }
  return (
    <>
      <div className="quote-container" id="quote-container">
        <div className="quote-text">
          <i className="fas fa-quote-left"></i>
          {newQuote}
          <i className="fas fa-quote-right"></i>
        </div>
        <div className="quote-author">
          <span id="author"></span>
        </div>
        <div className="button-container">
          <form id="form" action="/action_page.php">
            <label></label>
            <select id="language" name="languages"></select>
          </form>
          <div className="buttons">
            <button className="twitter-button" id="twitter" title="Tweet This!">
              <i className="fab fa-twitter"></i>
            </button>
            <button onClick={handleNewQuote} id="new-quote">
              New Quote
            </button>
          </div>
        </div>
      </div>
      <div className="loader" id="loader"></div>
    </>
  );
}
