"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  Label,
  Area,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { 
  CreditCard, 
  RefreshCcw, 
  DollarSign, 
  TrendingUp,
  TrendingDown,
  Download,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Chart Colors
const COLORS = [
  "hsl(217, 91%, 60%)", // Bright blue
  "hsl(199, 89%, 70%)", // Light blue
  "hsl(142, 71%, 45%)", // Green
  "hsl(4, 90%, 58%)",   // Red
  "hsl(326, 100%, 74%)" // Pink
];

// --- Mock Data ---
const metricsData = [
  {
    id: "total-declines",
    name: "Total Declined Transactions",
    value: "328",
    change: -15.2,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 50 },
      { time: "08:00", value: 100 },
      { time: "12:00", value: 150 },
      { time: "16:00", value: 200 },
      { time: "20:00", value: 328 }
    ],
    icon: CreditCard
  },
  {
    id: "recovery-rate",
    name: "Decline Recovery Rate",
    value: "62%",
    change: 8.3,
    trend: [
      { time: "00:00", value: 50 },
      { time: "04:00", value: 52 },
      { time: "08:00", value: 55 },
      { time: "12:00", value: 58 },
      { time: "16:00", value: 60 },
      { time: "20:00", value: 62 }
    ],
    icon: RefreshCcw
  },
  {
    id: "revenue-recovered",
    name: "Revenue Recovered",
    value: "$8,745.50",
    change: 12.5,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 2000 },
      { time: "08:00", value: 4000 },
      { time: "12:00", value: 6000 },
      { time: "16:00", value: 7500 },
      { time: "20:00", value: 8745.50 }
    ],
    icon: DollarSign
  }
];

// Declines over time data
const declinesOverTimeData = [
  { date: "Jan", declines: 35, recovered: 21 },
  { date: "Feb", declines: 42, recovered: 28 },
  { date: "Mar", declines: 38, recovered: 24 },
  { date: "Apr", declines: 45, recovered: 29 },
  { date: "May", declines: 40, recovered: 25 },
  { date: "Jun", declines: 48, recovered: 31 },
  { date: "Jul", declines: 52, recovered: 33 },
  { date: "Aug", declines: 45, recovered: 28 },
  { date: "Sep", declines: 50, recovered: 30 },
  { date: "Oct", declines: 55, recovered: 35 },
  { date: "Nov", declines: 48, recovered: 29 },
  { date: "Dec", declines: 60, recovered: 36 },
];

const declinesOverTimeConfig = {
  declines: { label: "Declined Transactions", color: "#ef4444" },
  recovered: { label: "Recovered Transactions", color: "#22c55e" },
} satisfies ChartConfig;

// Decline rate by membership tier data
const declineRateByTierData = [
  { tier: "Basic", declineRate: 8.5 },
  { tier: "Premium", declineRate: 6.2 },
  { tier: "Unlimited", declineRate: 4.7 },
  { tier: "Annual", declineRate: 3.1 },
];

const declineRateByTierConfig = {
  declineRate: { label: "Decline Rate (%)", color: "#ef4444" },
} satisfies ChartConfig;

// Revenue recovered by membership tier data
const revenueRecoveredByTierData = [
  { tier: "Basic", recovered: 2150, lost: 1850 },
  { tier: "Premium", recovered: 2875, lost: 1425 },
  { tier: "Unlimited", recovered: 3120, lost: 1280 },
  { tier: "Annual", recovered: 600, lost: 220 },
];

const revenueRecoveredByTierConfig = {
  recovered: { label: "Revenue Recovered ($)", color: "#22c55e" },
  lost: { label: "Revenue Lost ($)", color: "#ef4444" },
} satisfies ChartConfig;

// --- End Mock Data & Config ---

// Widget Component
const StatWidget = ({ 
  title, 
  value, 
  change = 0,
  trend = [],
  icon: Icon
}: { 
  title: string; 
  value: string | number;
  change?: number;
  trend?: Array<{ time: string; value: number }>;
  icon: React.ElementType;
}) => (
  <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
      <CardTitle className="text-base font-medium">{title}</CardTitle>
      <Icon className="h-5 w-5 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold mb-4">{value}</div>
      <div className="flex flex-col space-y-4">
        <div className={cn(
          "flex items-center text-sm",
          change >= 0 ? "text-green-500" : "text-red-500"
        )}>
          {change >= 0 ? (
            <TrendingUp className="mr-1 h-4 w-4" />
          ) : (
            <TrendingDown className="mr-1 h-4 w-4" />
          )}
          {Math.abs(change)}% from yesterday
        </div>
        {trend.length > 0 && (
          <div className="h-[80px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trend}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={change >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

// Line Chart Component
const CustomLineChart = ({ 
  data, 
  config, 
  title, 
  dataKey, 
  categoryKey,
  multipleLines = false
}: { 
  data: any[]; 
  config: ChartConfig; 
  title: string; 
  dataKey: string | string[]; 
  categoryKey: string;
  multipleLines?: boolean;
}) => (
  <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <CardHeader>
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ChartContainer config={config} className="h-full w-full">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
        >
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={config[Array.isArray(dataKey) ? dataKey[0] : dataKey]?.color || "#2563eb"} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={config[Array.isArray(dataKey) ? dataKey[0] : dataKey]?.color || "#2563eb"} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          {multipleLines && Array.isArray(dataKey) ? (
            dataKey.map((key) => (
              <Line
                key={key}
                type="monotone"
                dataKey={key}
                stroke={config[key]?.color || "#2563eb"}
                strokeWidth={2}
                activeDot={{ r: 8 }}
                className="transition-opacity duration-300 ease-in-out hover:opacity-80"
              />
            ))
          ) : (
            <Line
              type="monotone"
              dataKey={Array.isArray(dataKey) ? dataKey[0] : dataKey}
              stroke={config[Array.isArray(dataKey) ? dataKey[0] : dataKey]?.color || "#2563eb"}
              strokeWidth={2}
              activeDot={{ r: 8 }}
              className="transition-opacity duration-300 ease-in-out hover:opacity-80"
            />
          )}
          <Area
            type="monotone"
            dataKey={Array.isArray(dataKey) ? dataKey[0] : dataKey}
            fill="url(#lineGradient)"
            stroke="none"
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

// Bar Chart Component
const CustomBarChart = ({ 
  data, 
  config, 
  title, 
  dataKey, 
  categoryKey,
  yAxisLabel
}: { 
  data: any[]; 
  config: ChartConfig; 
  title: string; 
  dataKey: string; 
  categoryKey: string;
  yAxisLabel?: string;
}) => (
  <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <CardHeader>
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ChartContainer config={config} className="h-full w-full">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey={categoryKey} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis>
            {yAxisLabel && (
              <Label
                angle={-90}
                position="insideLeft"
                style={{ textAnchor: 'middle', fill: 'var(--text-color)' }}
                value={yAxisLabel}
                offset={-20}
              />
            )}
          </YAxis>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar 
            dataKey={dataKey} 
            fill={config[dataKey]?.color || "#2563eb"} 
            radius={[4, 4, 0, 0]}
            className="transition-opacity duration-300 ease-in-out hover:opacity-80"
          />
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

// Stacked Bar Chart Component
const StackedBarChart = ({ 
  data, 
  config, 
  title, 
  dataKeys, 
  categoryKey
}: { 
  data: any[]; 
  config: ChartConfig; 
  title: string; 
  dataKeys: string[]; 
  categoryKey: string;
}) => (
  <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <CardHeader>
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px]">
      <ChartContainer config={config} className="h-full w-full">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey={categoryKey} 
            tickLine={false} 
            axisLine={false}
          />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          
          {dataKeys.map((key) => (
            <Bar
              key={key}
              dataKey={key}
              fill={config[key]?.color || "#2563eb"}
              stackId="a"
              radius={key === dataKeys[0] ? [4, 4, 0, 0] : [0, 0, 0, 0]}
              className="transition-opacity duration-300 ease-in-out hover:opacity-80"
            />
          ))}
        </BarChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default function CCDeclinePage() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Credit Card Decline Analytics</h1>
          <p className="text-muted-foreground">Performance metrics for credit card transaction handling</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {metricsData.map((metric) => (
          <StatWidget 
            key={metric.id}
            title={metric.name}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={metric.icon}
          />
        ))}
      </div>

      {/* Line Chart Row */}
      <div className="grid gap-6 md:grid-cols-1">
        <CustomLineChart 
          data={declinesOverTimeData} 
          config={declinesOverTimeConfig}
          title="Declines Over Time" 
          dataKey={["declines", "recovered"]} 
          categoryKey="date"
          multipleLines={true}
        />
      </div>

      {/* Bar Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <CustomBarChart 
          data={declineRateByTierData} 
          config={declineRateByTierConfig}
          title="Decline Rate by Membership Tier" 
          dataKey="declineRate" 
          categoryKey="tier"
          yAxisLabel="Decline Rate (%)"
        />
        <StackedBarChart 
          data={revenueRecoveredByTierData} 
          config={revenueRecoveredByTierConfig}
          title="Revenue Recovered by Membership Tier" 
          dataKeys={["recovered", "lost"]} 
          categoryKey="tier"
        />
      </div>
    </div>
  );
} 