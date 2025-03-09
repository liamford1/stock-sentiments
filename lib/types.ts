export interface StockSentiment {
  "12_hour": string;
  "4_hour": string;
  Sentiment: "positive" | "negative";
  "Sentiment Indicator": string;
  "Sentiment Score": number;
  Ticker: string;
  day: string;
  hour: string;
}