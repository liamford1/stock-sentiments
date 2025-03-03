import { StockSentiment } from './types';

export async function fetchStockSentiment(): Promise<StockSentiment[]> {
  try {
    const response = await fetch('http://54.210.147.35/');
    if (!response.ok) {
      throw new Error('Failed to fetch stock sentiment data');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stock sentiment data:', error);
    return [];
  }
}