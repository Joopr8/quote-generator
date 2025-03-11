import { useEffect, useState } from "react";
import { fetchQuote } from "../utils/quoteService";
import { fetchTranslation } from "../utils/translationService";
import QuoteInfo from "./QuoteInfo";
import QuoteControllers from "./QuoteControllers";

interface QuoteBase {
  quote: string;
  author: string;
}

export interface Quote extends QuoteBase {
  language: string;
  translatedText?: string;
}

const DEFAULT_LANGUAGE = "en-GB";

export default function QuoteBox() {
  const [newQuote, setNewQuote] = useState<Quote>({
    quote: "",
    author: "",
    language: DEFAULT_LANGUAGE,
  });
  const [loading, setLoading] = useState(false);

  async function getNewQuote() {
    setLoading(true);
    try {
      const newQuote = await fetchQuote();
      setNewQuote({
        quote: newQuote.quote,
        author: newQuote.author,
        language: "en-GB",
        translatedText: undefined,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
    setLoading(false);
  }

  async function handleNewLanguage(newLanguage: string) {
    setLoading(true);
    console.log(newLanguage);

    try {
      const translatedText = await fetchTranslation(
        newQuote.quote,
        newQuote.language,
        newLanguage
      );

      // Then update the state
      setNewQuote((prev) => ({
        ...prev,
        language: newLanguage,
        translatedText: translatedText,
      }));
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
    setLoading(false);
  }

  useEffect(() => {
    getNewQuote();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="quote-container">
          <QuoteInfo quote={newQuote} />
          <QuoteControllers
            quote={newQuote}
            loading={loading}
            onNewQuote={getNewQuote}
            onNewLanguage={handleNewLanguage}
          />
        </div>
      )}
    </>
  );
}
