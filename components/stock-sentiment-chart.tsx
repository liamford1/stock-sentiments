"use client";

import React from "react";

// This interface should match your existing StockSentiment type
interface StockSentiment {
  Rank: string;
  Ticker: string;
  hour: string | number;
  "4_hour": string | number;
  "12_hour": string | number;
  day: string | number;
  Sentiment: string;
}

interface StockSentimentChartProps {
  data: StockSentiment[];
}

export default function StockSentimentChart({ data }: StockSentimentChartProps) {
  // Convert string values to numbers for calculations
  const processedData = data.map(item => ({
    ...item,
    hour: typeof item.hour === 'string' ? parseInt(item.hour, 10) : item.hour,
    "4_hour": typeof item["4_hour"] === 'string' ? parseInt(item["4_hour"], 10) : item["4_hour"],
    "12_hour": typeof item["12_hour"] === 'string' ? parseInt(item["12_hour"], 10) : item["12_hour"],
    day: typeof item.day === 'string' ? parseInt(item.day, 10) : item.day,
    // Fields not from API are left undefined
    "2_day": undefined as number | undefined,
    week: undefined as number | undefined,
    "2_week": undefined as number | undefined,
    prior_sentiment: undefined as string | undefined
  }));

  // Calculate percentage changes for the second table (only for available data)
  const percentChangeData = processedData.map((item) => {
    // Calculate percentage changes only for available fields
    const hourChange = item.hour !== 0 ? ((item.hour as number) / 1) * 100 : 0;
    const fourHourChange = item.hour !== 0 ? (((item["4_hour"] as number) - (item.hour as number)) / (item.hour as number)) * 100 : 0;
    const twelveHourChange = item["4_hour"] !== 0 ? (((item["12_hour"] as number) - (item["4_hour"] as number)) / (item["4_hour"] as number)) * 100 : 0;
    const dayChange = item["12_hour"] !== 0 ? (((item.day as number) - (item["12_hour"] as number)) / (item["12_hour"] as number)) * 100 : 0;

    return {
      Rank: item.Rank,
      Ticker: item.Ticker,
      hourChange,
      fourHourChange,
      twelveHourChange,
      dayChange,
      // Fields not calculated from API data are left undefined with explicit type annotations
      twoDayChange: undefined as number | undefined,
      weekChange: undefined as number | undefined,
      twoWeekChange: undefined as number | undefined,
      sentiment: item.Sentiment,
      prior_sentiment: item.prior_sentiment
    };
  });

  // Sort percentage change data by rank
  const sortedPercentData = [...percentChangeData].sort((a, b) => 
    parseInt(a.Rank) - parseInt(b.Rank)
  );

  return (
    <div className="container mx-auto p-4 space-y-8 col-span-3">
      {/* --------------------------------------- */}
      {/* Table 1: Number of Posts (000's)       */}
      {/* --------------------------------------- */}
      <div>
        <h2 className="text-xl font-bold mb-2">Number of Posts (000's)</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-8 text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <th className="border p-2">Rank</th>
                <th className="border p-2">Stock Ticker</th>
                <th className="border p-2">Hour</th>
                <th className="border p-2">4 Hour</th>
                <th className="border p-2">12 Hour</th>
                <th className="border p-2">Day</th>
                <th className="border p-2">2 Day</th>
                <th className="border p-2">Week</th>
                <th className="border p-2">2 Week</th>
                <th className="border p-2">Sentiment Indicator</th>
                <th className="border p-2">Prior Sentiment</th>
                <th className="border p-2">Details</th>
              </tr>
            </thead>
            <tbody>
              {processedData.map((item) => (
                <tr key={item.Rank}>
                  <td className="border p-2 text-center">{item.Rank}</td>
                  <td className="border p-2 text-center">{item.Ticker}</td>
                  <td className="border p-2 text-right">{Number(item.hour).toLocaleString()}</td>
                  <td className="border p-2 text-right">{Number(item["4_hour"]).toLocaleString()}</td>
                  <td className="border p-2 text-right">{Number(item["12_hour"]).toLocaleString()}</td>
                  <td className="border p-2 text-right">{Number(item.day).toLocaleString()}</td>
                  <td className="border p-2 text-right">-</td>
                  <td className="border p-2 text-right">-</td>
                  <td className="border p-2 text-right">-</td>
                  <td className="border p-2 text-center">{item.Sentiment}</td>
                  <td className="border p-2 text-center">-</td>
                  <td className="border p-2 text-center">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --------------------------------------- */}
      {/* Table 2: % Change in Posts             */}
      {/* --------------------------------------- */}
      <div>
        <h2 className="text-xl font-bold mb-2">% Change in Posts</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <th className="border p-2">Rank</th>
                <th className="border p-2">Stock Ticker</th>
                <th className="border p-2">Hour</th>
                <th className="border p-2">4 Hour</th>
                <th className="border p-2">12 Hour</th>
                <th className="border p-2">Day</th>
                <th className="border p-2">2 Day</th>
                <th className="border p-2">Week</th>
                <th className="border p-2">2 Week</th>
                <th className="border p-2">Sentiment Indicator</th>
                <th className="border p-2">Prior Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {sortedPercentData.map((item) => (
                <tr key={item.Rank}>
                  <td className="border p-2 text-center">{item.Rank}</td>
                  <td className="border p-2 text-center">{item.Ticker}</td>
                  <td className="border p-2 text-right">{item.hourChange.toFixed(1)}%</td>
                  <td className="border p-2 text-right">{item.fourHourChange.toFixed(1)}%</td>
                  <td className="border p-2 text-right">{item.twelveHourChange.toFixed(1)}%</td>
                  <td className="border p-2 text-right">{item.dayChange.toFixed(1)}%</td>
                  <td className="border p-2 text-right">-</td>
                  <td className="border p-2 text-right">-</td>
                  <td className="border p-2 text-right">-</td>
                  <td className="border p-2 text-center">{item.sentiment}</td>
                  <td className="border p-2 text-center">-</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
