import { useState, useEffect } from "react";
import { fetchQuote } from "../utils/quoteService";
import { fetchTranslation } from "../utils/translationService";

const DEFAULT_LANGUAGE = "en-GB";

export function useQuote() {
  const [quote, setQuote] = useState({
    quote: "",
    author: "",
    language: "en-GB",
    translatedText: undefined,
  });
  const [loading, setLoading] = useState(false);

  const getNewQuote = async () => {
    setLoading(true);
    try {
      const newQuote = await fetchQuote();
      setQuote({
        quote: newQuote.quote,
        author: newQuote.author,
        language: DEFAULT_LANGUAGE,
        translatedText: undefined,
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
    setLoading(false);
  };

  const handleNewLanguage = async (newLanguage: string) => {
    setLoading(true);
    try {
      const translatedText = await fetchTranslation(
        quote.quote,
        quote.language,
        newLanguage
      );
      setQuote((prev) => ({
        ...prev,
        language: newLanguage,
        translatedText,
      }));
    } catch (error) {
      console.error("Error fetching translation:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getNewQuote();
  }, []);

  return {
    quote,
    loading,
    getNewQuote,
    handleNewLanguage,
  };
}
