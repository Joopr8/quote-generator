import { Quote } from "./QuoteBox";

interface QuoteInfoProps {
  quote: Quote;
}

export default function QuoteInfo({ quote }: QuoteInfoProps) {
  return (
    <>
      <div className="quote-text">
        <i className="fas fa-quote-left"></i>
        <p>{quote.translatedText || quote.quote}</p>
        <i className="fas fa-quote-right"></i>
      </div>
      <div className="quote-author">
        <span id="author">{quote.author}</span>
      </div>
    </>
  );
}
