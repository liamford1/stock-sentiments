"use client"

import { StockSentiment } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function StockSentimentChart({ data }: { data: StockSentiment[] }) {
  const [activeTab, setActiveTab] = useState("hour")
  
  // Prepare data for chart
  const chartData = data.map(item => ({
    name: item.Ticker,
    hour: parseInt(item.hour),
    "4_hour": parseInt(item["4_hour"]),
    day: parseInt(item.day),
    sentiment: item.sentiment
  }))

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Stock Sentiment Metrics</CardTitle>
        <CardDescription>
          Visualization of sentiment metrics across different time periods
        </CardDescription>
        <Tabs defaultValue="hour" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="hour">Hour</TabsTrigger>
            <TabsTrigger value="4_hour">4 Hour</TabsTrigger>
            <TabsTrigger value="day">Day</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 70,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="name" 
              angle={-45} 
              textAnchor="end" 
              height={70}
            />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => [value, name === "sentiment" ? "" : name]}
              labelFormatter={(label) => `Ticker: ${label}`}
            />
            <Legend />
            <Bar 
              dataKey={activeTab} 
              fill={(entry) => entry.sentiment === "positive" ? "hsl(var(--chart-1))" : "hsl(var(--chart-3))"}
              name={activeTab === "4_hour" ? "4 Hour" : activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}