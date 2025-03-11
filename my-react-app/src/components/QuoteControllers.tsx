import { Quote } from "./QuoteBox";
import { countries } from "../data/countries";

interface QuoteControllersProps {
  quote: Quote;
  loading: boolean;
  onNewQuote: () => void;
  onNewLanguage: (newLang: string) => void;
}

export default function QuoteControllers({
  quote,
  loading,
  onNewQuote,
  onNewLanguage,
}: QuoteControllersProps) {
  return (
    <div className="button-container">
      <select
        id="language"
        disabled={loading}
        name="languages"
        value={quote.language}
        onChange={(e) => onNewLanguage(e.target.value)}
      >
        {Object.entries(countries).map(([key, value]) => (
          <option key={key} value={key}>
            {value}
          </option>
        ))}
      </select>

      <div className="buttons">
        <button className="twitter-button" title="Tweet This!">
          <i className="fab fa-twitter" aria-label="Share on Twitter"></i>
        </button>
        <button onClick={onNewQuote} disabled={loading}>
          New Quote
        </button>
      </div>
    </div>
  );
}
