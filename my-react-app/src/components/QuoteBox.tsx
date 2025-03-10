import { useEffect, useState } from "react";
// import QUOTES from "../data/quotes";
import { fetchQuote } from "../utils/quoteService";

interface Quote {
  quote: string;
  author: string;
}

export default function QuoteBox() {
  const [newQuote, setNewQuote] = useState<Quote>({
    quote: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);

  const getNewQuote = async () => {
    setLoading(true);
    try {
      const newQuote = await fetchQuote();
      setNewQuote(newQuote);
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="quote-container">
          <div className="quote-text">
            <i className="fas fa-quote-left"></i>
            <p> {newQuote.quote}</p>
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
              <button
                className="twitter-button"
                id="twitter"
                title="Tweet This!"
              >
                <i className="fab fa-twitter"></i>
              </button>
              <button onClick={getNewQuote}>New Quote</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
