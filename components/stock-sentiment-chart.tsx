"use client";

import React from "react";

// This interface should match your existing StockSentiment type
interface StockSentiment {
  Rank: string;
  Ticker: string;
  hour: string | number;
  "4_hour": string | number;
  day: string | number;
  sentiment: string;
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
    day: typeof item.day === 'string' ? parseInt(item.day, 10) : item.day,
    // Add mock data for demonstration - these would come from your API in production
    "2_day": (typeof item.day === 'string' ? parseInt(item.day, 10) : item.day) * 2,
    week: (typeof item.day === 'string' ? parseInt(item.day, 10) : item.day) * 7,
    "2_week": (typeof item.day === 'string' ? parseInt(item.day, 10) : item.day) * 14,
    prior_sentiment: "Negative" // Example default, adjust as needed
  }));

  // Calculate percentage changes for the second table
  const percentChangeData = processedData.map((item) => {
    // Calculate percentage changes
    const hourChange = item.hour !== 0 ? ((item.hour as number) / 1) * 100 : 0; // Example calculation
    const fourHourChange = item.hour !== 0 ? (((item["4_hour"] as number) - (item.hour as number)) / (item.hour as number)) * 100 : 0;
    const dayChange = item["4_hour"] !== 0 ? (((item.day as number) - (item["4_hour"] as number)) / (item["4_hour"] as number)) * 100 : 0;
    const twoDayChange = item.day !== 0 ? (((item["2_day"] as number) - (item.day as number)) / (item.day as number)) * 100 : 0;
    const weekChange = item["2_day"] !== 0 ? (((item.week as number) - (item["2_day"] as number)) / (item["2_day"] as number)) * 100 : 0;
    const twoWeekChange = item.week !== 0 ? (((item["2_week"] as number) - (item.week as number)) / (item.week as number)) * 100 : 0;

    return {
      Rank: item.Rank,
      Ticker: item.Ticker,
      hourChange,
      fourHourChange,
      dayChange,
      twoDayChange,
      weekChange,
      twoWeekChange,
      sentiment: item.sentiment,
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
                <th className="border p-2">hour/hour</th>
                <th className="border p-2">4 hour/4 hour</th>
                <th className="border p-2">day/day</th>
                <th className="border p-2">2 day/2 day</th>
                <th className="border p-2">week/week</th>
                <th className="border p-2">2 week/2 week</th>
                <th className="border p-2">Sentiment Indicator</th>
                <th className="border p-2">Prior Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {processedData.map((item) => (
                <tr key={item.Rank}>
                  <td className="border p-2 text-center">{item.Rank}</td>
                  <td className="border p-2 text-center">{item.Ticker}</td>
                  <td className="border p-2 text-right">{Number(item.hour).toLocaleString()}</td>
                  <td className="border p-2 text-right">{Number(item["4_hour"]).toLocaleString()}</td>
                  <td className="border p-2 text-right">{Number(item.day).toLocaleString()}</td>
                  <td className="border p-2 text-right">{Number(item["2_day"]).toLocaleString()}</td>
                  <td className="border p-2 text-right">{Number(item.week).toLocaleString()}</td>
                  <td className="border p-2 text-right">{Number(item["2_week"]).toLocaleString()}</td>
                  <td className="border p-2 text-center">{item.sentiment}</td>
                  <td className="border p-2 text-center">{item.prior_sentiment}</td>
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
                <th className="border p-2">hour/hour</th>
                <th className="border p-2">4 hour/4 hour</th>
                <th className="border p-2">day/day</th>
                <th className="border p-2">2 day/2 day</th>
                <th className="border p-2">week/week</th>
                <th className="border p-2">2 week/2 week</th>
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
                  <td className="border p-2 text-right">{item.dayChange.toFixed(1)}%</td>
                  <td className="border p-2 text-right">{item.twoDayChange.toFixed(1)}%</td>
                  <td className="border p-2 text-right">{item.weekChange.toFixed(1)}%</td>
                  <td className="border p-2 text-right">{item.twoWeekChange.toFixed(1)}%</td>
                  <td className="border p-2 text-center">{item.sentiment}</td>
                  <td className="border p-2 text-center">{item.prior_sentiment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}