'use client';

import React from "react";

// Update the interface to allow string or number for time-based fields
export interface StockSentiment {
  "12_hour": string | number;
  "4_hour": string | number;
  Sentiment: "positive" | "negative";
  "Sentiment Indicator": string;
  "Sentiment Score": number;
  Ticker: string;
  day: string | number;
  hour: string | number;
}

interface StockSentimentChartProps {
  data: StockSentiment[];
}

export default function StockSentimentChart({ data }: StockSentimentChartProps) {
  // Compute ranking based on the best sentiment (highest Sentiment Score gets Rank 1)
  const rankedData = data
    .slice() // create a copy so we don't mutate the original array
    .sort((a, b) => b["Sentiment Score"] - a["Sentiment Score"])
    .map((item, index) => ({
      ...item,
      Rank: index + 1, // assign rank based on sorted order
    }));

  // Calculate percentage changes between periods.
  // Convert string values to numbers as needed.
  const percentChangeData = rankedData.map(item => {
    const hourVal =
      typeof item.hour === "string" ? parseFloat(item.hour) : item.hour;
    const fourHourVal =
      typeof item["4_hour"] === "string" ? parseFloat(item["4_hour"]) : item["4_hour"];
    const twelveHourVal =
      typeof item["12_hour"] === "string" ? parseFloat(item["12_hour"]) : item["12_hour"];
    const dayVal =
      typeof item.day === "string" ? parseFloat(item.day) : item.day;

    // Calculate changes; if baseline is 0, display as 0%
    const fourHourChange =
      hourVal !== 0 ? ((fourHourVal - hourVal) / hourVal) * 100 : 0;
    const twelveHourChange =
      fourHourVal !== 0 ? ((twelveHourVal - fourHourVal) / fourHourVal) * 100 : 0;
    const dayChange =
      twelveHourVal !== 0 ? ((dayVal - twelveHourVal) / twelveHourVal) * 100 : 0;

    return {
      Rank: item.Rank,
      Ticker: item.Ticker,
      hourChange: null as null | number, // No previous period for hour change
      fourHourChange,
      twelveHourChange,
      dayChange,
      Sentiment: item.Sentiment,
      "Sentiment Indicator": item["Sentiment Indicator"],
      "Sentiment Score": item["Sentiment Score"],
    };
  });

  return (
    <div className="container mx-auto p-4 space-y-8 col-span-3">
      {/* --------------------------------------- */}
      {/* Table 1: Raw Data */}
      {/* --------------------------------------- */}
      <div>
        <h2 className="text-xl font-bold mb-2">Number of posts (000's)</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse mb-8 text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <th className="border p-2">Rank</th>
                <th className="border p-2">Ticker</th>
                <th className="border p-2">Hour</th>
                <th className="border p-2">4 Hour</th>
                <th className="border p-2">12 Hour</th>
                <th className="border p-2">Day</th>
                <th className="border p-2">Sentiment</th>
                <th className="border p-2">Sentiment Indicator</th>
                <th className="border p-2">Sentiment Score</th>
              </tr>
            </thead>
            <tbody>
              {rankedData.map(item => (
                <tr key={item.Ticker}>
                  <td className="border p-2 text-center">{item.Rank}</td>
                  <td className="border p-2 text-center">{item.Ticker}</td>
                  <td className="border p-2 text-right">
                    {Number(item.hour).toLocaleString()}
                  </td>
                  <td className="border p-2 text-right">
                    {Number(item["4_hour"]).toLocaleString()}
                  </td>
                  <td className="border p-2 text-right">
                    {Number(item["12_hour"]).toLocaleString()}
                  </td>
                  <td className="border p-2 text-right">
                    {Number(item.day).toLocaleString()}
                  </td>
                  <td className="border p-2 text-center">{item.Sentiment}</td>
                  <td className="border p-2 text-center">
                    {item["Sentiment Indicator"]}
                  </td>
                  <td className="border p-2 text-center">
                    {item["Sentiment Score"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* --------------------------------------- */}
      {/* Table 2: % Change in Posts */}
      {/* --------------------------------------- */}
      <div>
        <h2 className="text-xl font-bold mb-2">% Change in Posts</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-800">
                <th className="border p-2">Rank</th>
                <th className="border p-2">Ticker</th>
                <th className="border p-2">Hour Change</th>
                <th className="border p-2">4 Hour Change</th>
                <th className="border p-2">12 Hour Change</th>
                <th className="border p-2">Day Change</th>
                <th className="border p-2">Sentiment</th>
                <th className="border p-2">Sentiment Indicator</th>
                <th className="border p-2">Sentiment Score</th>
              </tr>
            </thead>
            <tbody>
              {percentChangeData.map(item => (
                <tr key={item.Ticker}>
                  <td className="border p-2 text-center">{item.Rank}</td>
                  <td className="border p-2 text-center">{item.Ticker}</td>
                  <td className="border p-2 text-center">
                    {item.hourChange === null ? "-" : `${item.hourChange.toFixed(1)}%`}
                  </td>
                  <td className="border p-2 text-right">
                    {item.fourHourChange.toFixed(1)}%
                  </td>
                  <td className="border p-2 text-right">
                    {item.twelveHourChange.toFixed(1)}%
                  </td>
                  <td className="border p-2 text-right">
                    {item.dayChange.toFixed(1)}%
                  </td>
                  <td className="border p-2 text-center">{item.Sentiment}</td>
                  <td className="border p-2 text-center">
                    {item["Sentiment Indicator"]}
                  </td>
                  <td className="border p-2 text-center">
                    {item["Sentiment Score"]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
