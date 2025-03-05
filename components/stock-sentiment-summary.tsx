"use client"

import { StockSentiment } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingDown, TrendingUp } from "lucide-react"

export function StockSentimentSummary({ data }: { data: StockSentiment[] }) {
  // Calculate summary statistics
  const totalStocks = data.length
  const positiveStocks = data.filter(stock => stock.Sentiment === "positive").length
  const negativeStocks = data.filter(stock => stock.Sentiment === "negative").length
  const positivePercentage = Math.round((positiveStocks / totalStocks) * 100)
  
  // Find top positive and negative stocks
  const topPositive = [...data]
    .filter(stock => stock.Sentiment === "positive")
    .sort((a, b) => parseInt(b.day) - parseInt(a.day))[0]
    
  const topNegative = [...data]
    .filter(stock => stock.Sentiment === "negative")
    .sort((a, b) => parseInt(b.day) - parseInt(a.day))[0]

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Stocks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalStocks}</div>
          <p className="text-xs text-muted-foreground">
            Tracked stocks in sentiment analysis
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sentiment Ratio</CardTitle>
          {positivePercentage >= 50 ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{positivePercentage}% Positive</div>
          <p className="text-xs text-muted-foreground">
            {positiveStocks} positive, {negativeStocks} negative
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Positive</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topPositive?.Ticker || "N/A"}</div>
          <p className="text-xs text-muted-foreground">
            {topPositive ? `Day: ${topPositive.day}, 4h: ${topPositive["4_hour"]}` : "No positive stocks"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Top Negative</CardTitle>
          <TrendingDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{topNegative?.Ticker || "N/A"}</div>
          <p className="text-xs text-muted-foreground">
            {topNegative ? `Day: ${topNegative.day}, 4h: ${topNegative["4_hour"]}` : "No negative stocks"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}