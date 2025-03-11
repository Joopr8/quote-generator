import QuoteInfo from "./QuoteInfo";
import QuoteControllers from "./QuoteControllers";
import { useQuote } from "../hooks/useQuote";

interface QuoteBase {
  quote: string;
  author: string;
}

export interface Quote extends QuoteBase {
  language: string;
  translatedText?: string;
}

export default function QuoteBox() {
  const { quote, loading, getNewQuote, handleNewLanguage } = useQuote();

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="quote-container">
          <QuoteInfo quote={quote} />
          <QuoteControllers
            quote={quote}
            loading={loading}
            onNewQuote={getNewQuote}
            onNewLanguage={handleNewLanguage}
          />
        </div>
      )}
    </>
  );
}
