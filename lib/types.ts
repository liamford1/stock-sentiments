export interface StockSentiment {
  Rank: string;
  Ticker: string;
  sentiment: 'positive' | 'negative';
  hour: string;
  day: string;
  '4_hour': string;
}