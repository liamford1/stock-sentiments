import { fetchStockSentiment } from '@/lib/api';
import { StockSentimentTable } from '@/components/stock-sentiment-table';
import  StockSentimentChart from '@/components/stock-sentiment-chart';
import { StockSentimentSummary } from '@/components/stock-sentiment-summary';
import { ThemeToggle } from '@/components/theme-toggle';
import { BarChart3, RefreshCcw } from 'lucide-react';
import PiChart from '@/components/pi-chart';
import RadarChart from '@/components/radar-chart';

export const dynamic = 'force-dynamic'
export default async function Home() {
  const stockData = await fetchStockSentiment();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6" />
            <h1 className="text-xl font-bold">Stock Sentiment Analysis</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <RefreshCcw className="mr-1 h-4 w-4" />
              Auto-refreshes every 60 minutes
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      
      <main className="container mx-auto py-6 space-y-8">
        <StockSentimentSummary data={stockData} />
        
        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
          <StockSentimentChart data={stockData} />
        </div>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <PiChart data={stockData} />
          <RadarChart data={stockData} />
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Stock Sentiment Analysis Dashboard. All rights reserved.
          </p>
          <p className="text-center text-sm text-muted-foreground">
            Data refreshed: {new Date().toLocaleString()}
          </p>
        </div>
      </footer>
    </div>
  );
}