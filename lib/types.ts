export interface StockSentiment {
  Rank: string;
  Ticker: string;
  Sentiment: 'positive' | 'negative';
  hour: string;
  day: string;
  '4_hour': string;
}