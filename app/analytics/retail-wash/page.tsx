"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Label,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, Filter } from "lucide-react";
import { TrendingUp, TrendingDown, DollarSign, Car, ShoppingCart, Percent } from "lucide-react";

// --- Mock Data ---
const retailWashData = {
  totalWashesSold: 1843,
  averageRevenuePerWash: "$14.75",
  discountedWashSales: "$2,375.50",
};

// Wash Types Data
const washTypes = {
  basic: { label: "Basic Wash", color: "#2563eb" }, // Blue
  premium: { label: "Premium Wash", color: "#60a5fa" }, // Light Blue
  ultimate: { label: "Ultimate Wash", color: "#22c55e" }, // Green
  deluxe: { label: "Deluxe Wash", color: "#f472b6" }, // Neon Pink
  express: { label: "Express Wash", color: "#ef4444" }, // Red
};

const washesSoldByTypeData = [
  { type: "basic", count: 650 },
  { type: "premium", count: 480 },
  { type: "ultimate", count: 320 },
  { type: "deluxe", count: 240 },
  { type: "express", count: 153 },
];

const washesSoldByTypeConfig = {
  count: { label: "Count" },
  ...washTypes
} satisfies ChartConfig;

// Revenue by Wash Type
const revenueByWashTypeData = [
  { type: "Basic Wash", revenue: 5850 },
  { type: "Premium Wash", revenue: 7200 },
  { type: "Ultimate Wash", revenue: 6400 },
  { type: "Deluxe Wash", revenue: 5280 },
  { type: "Express Wash", revenue: 1377 },
];

const revenueByWashTypeConfig = {
  revenue: { label: "Revenue ($)" },
  "Basic Wash": { label: "Basic Wash", color: "#2563eb" },
  "Premium Wash": { label: "Premium Wash", color: "#60a5fa" },
  "Ultimate Wash": { label: "Ultimate Wash", color: "#22c55e" },
  "Deluxe Wash": { label: "Deluxe Wash", color: "#f472b6" },
  "Express Wash": { label: "Express Wash", color: "#ef4444" },
} satisfies ChartConfig;

// Add-On Services Revenue
const addOnServicesData = [
  { service: "Wax Treatment", revenue: 1250 },
  { service: "Tire Shine", revenue: 980 },
  { service: "Interior Cleaning", revenue: 1780 },
  { service: "Undercarriage Wash", revenue: 850 },
  { service: "Air Freshener", revenue: 430 },
];

const addOnServicesConfig = {
  revenue: { label: "Revenue ($)" },
  "Wax Treatment": { label: "Wax Treatment", color: "#2563eb" },
  "Tire Shine": { label: "Tire Shine", color: "#60a5fa" },
  "Interior Cleaning": { label: "Interior Cleaning", color: "#22c55e" },
  "Undercarriage Wash": { label: "Undercarriage Wash", color: "#f472b6" },
  "Air Freshener": { label: "Air Freshener", color: "#ef4444" },
} satisfies ChartConfig;

// Wash Sales by Time of Day
const washSalesByTimeData = [
  { time: "7 AM", sales: 45 },
  { time: "8 AM", sales: 75 },
  { time: "9 AM", sales: 110 },
  { time: "10 AM", sales: 135 },
  { time: "11 AM", sales: 160 },
  { time: "12 PM", sales: 180 },
  { time: "1 PM", sales: 210 },
  { time: "2 PM", sales: 190 },
  { time: "3 PM", sales: 170 },
  { time: "4 PM", sales: 145 },
  { time: "5 PM", sales: 160 },
  { time: "6 PM", sales: 130 },
  { time: "7 PM", sales: 80 },
  { time: "8 PM", sales: 53 },
];

const washSalesByTimeConfig = {
  sales: { label: "Sales", color: "#2563eb" },
} satisfies ChartConfig;

// Wash Volume by Day of the Week
const washVolumeByDayData = [
  { day: "Monday", volume: 210 },
  { day: "Tuesday", volume: 195 },
  { day: "Wednesday", volume: 245 },
  { day: "Thursday", volume: 278 },
  { day: "Friday", volume: 340 },
  { day: "Saturday", volume: 390 },
  { day: "Sunday", volume: 185 },
];

const washVolumeByDayConfig = {
  volume: { label: "Volume", color: "#2563eb" },
} satisfies ChartConfig;

// Top-Selling Add-Ons
const topSellingAddOnsData = [
  { addon: "Wax Treatment", count: 520 },
  { addon: "Tire Shine", count: 480 },
  { addon: "Interior Cleaning", count: 420 },
  { addon: "Undercarriage Wash", count: 390 },
  { addon: "Air Freshener", count: 350 },
];

const topSellingAddOnsConfig = {
  count: { label: "Count" },
  "Wax Treatment": { label: "Wax Treatment", color: "#2563eb" },
  "Tire Shine": { label: "Tire Shine", color: "#60a5fa" },
  "Interior Cleaning": { label: "Interior Cleaning", color: "#22c55e" },
  "Undercarriage Wash": { label: "Undercarriage Wash", color: "#f472b6" },
  "Air Freshener": { label: "Air Freshener", color: "#ef4444" },
} satisfies ChartConfig;

// Revenue Growth by Wash Type
const revenueGrowthData = [
  { month: "Jan", Basic: 4200, Premium: 5100, Ultimate: 4800, Deluxe: 3900, Express: 1100 },
  { month: "Feb", Basic: 4300, Premium: 5300, Ultimate: 4900, Deluxe: 4200, Express: 1150 },
  { month: "Mar", Basic: 4500, Premium: 5600, Ultimate: 5200, Deluxe: 4400, Express: 1180 },
  { month: "Apr", Basic: 4700, Premium: 5900, Ultimate: 5400, Deluxe: 4550, Express: 1220 },
  { month: "May", Basic: 5100, Premium: 6300, Ultimate: 5700, Deluxe: 4800, Express: 1280 },
  { month: "Jun", Basic: 5850, Premium: 7200, Ultimate: 6400, Deluxe: 5280, Express: 1377 },
];

const revenueGrowthConfig = {
  Basic: { label: "Basic Wash", color: "#2563eb" },
  Premium: { label: "Premium Wash", color: "#60a5fa" },
  Ultimate: { label: "Ultimate Wash", color: "#22c55e" },
  Deluxe: { label: "Deluxe Wash", color: "#f472b6" },
  Express: { label: "Express Wash", color: "#ef4444" },
} satisfies ChartConfig;

// Volume from Repeat vs. First-Time Customers
const customerTypeData = [
  { type: "repeat", count: 1289 },
  { type: "firstTime", count: 554 },
];

const customerTypeConfig = {
  count: { label: "Count" },
  repeat: { label: "Repeat Customers", color: "#2563eb" },
  firstTime: { label: "First-Time Customers", color: "#60a5fa" },
} satisfies ChartConfig;

// Updated mock data for trends
const retailMetricsData = [
  {
    id: "total-washes",
    name: "Total Washes Sold",
    value: "1,843",
    change: 12.5,
    trend: [
      { time: "00:00", value: 0 },
      { time: "02:00", value: 120 },
      { time: "04:00", value: 280 },
      { time: "06:00", value: 450 },
      { time: "08:00", value: 680 },
      { time: "10:00", value: 920 },
      { time: "12:00", value: 1180 },
      { time: "14:00", value: 1420 },
      { time: "16:00", value: 1580 },
      { time: "18:00", value: 1720 },
      { time: "20:00", value: 1843 }
    ],
    icon: Car
  },
  {
    id: "avg-revenue",
    name: "Average Revenue/Wash",
    value: "$14.75",
    change: 5.2,
    trend: [
      { time: "00:00", value: 10.00 },
      { time: "02:00", value: 8.00 },
      { time: "04:00", value: 12.00 },
      { time: "06:00", value: 16.00 },
      { time: "08:00", value: 10.00 },
      { time: "10:00", value: 18.00 },
      { time: "12:00", value: 12.00 },
      { time: "14:00", value: 20.00 },
      { time: "16:00", value: 8.00 },
      { time: "18:00", value: 22.00 },
      { time: "20:00", value: 14.75 }
    ],
    icon: DollarSign
  },
  {
    id: "discounted-sales",
    name: "Discounted Wash Sales",
    value: "$2,375.50",
    change: -3.8,
    trend: [
      { time: "00:00", value: 180 },
      { time: "02:00", value: 420 },
      { time: "04:00", value: 680 },
      { time: "06:00", value: 950 },
      { time: "08:00", value: 1280 },
      { time: "10:00", value: 1520 },
      { time: "12:00", value: 1750 },
      { time: "14:00", value: 1980 },
      { time: "16:00", value: 2150 },
      { time: "18:00", value: 2280 },
      { time: "20:00", value: 2375.50 }
    ],
    icon: Percent
  }
];

// Updated StatWidget component
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

// Pie Chart Component (same as before)
const CustomPieChart = ({ data, config, dataKey, nameKey, title }: {
  data: any[];
  config: ChartConfig;
  dataKey: string;
  nameKey: string;
  title: string;
}) => {
  const totalValue = React.useMemo(() => {
    return data.reduce((acc, curr) => acc + curr[dataKey], 0);
  }, [data, dataKey]);

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={config} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey={dataKey} hideLabel />} />
            <Pie 
              data={data} 
              dataKey={dataKey} 
              nameKey={nameKey} 
              innerRadius={60} 
              strokeWidth={5}
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={config[entry[nameKey]]?.color}
                  className="transition-opacity duration-300 ease-in-out hover:opacity-80"
                />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

// Bar Chart Component
const CustomBarChart = ({ data, config, title, dataKey, categoryKey, vertical = false }: {
  data: any[];
  config: ChartConfig;
  title: string;
  dataKey: string;
  categoryKey: string;
  vertical?: boolean;
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
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey={categoryKey} className="text-xs" />
          <YAxis className="text-xs" />
          <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
          <Legend />
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

// Line Chart Component
const CustomLineChart = ({ data, config, title, categoryKey, lines }: {
  data: any[];
  config: ChartConfig;
  title: string;
  categoryKey: string;
  lines: { key: string }[];
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
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey={categoryKey} 
            tickLine={false} 
            axisLine={false}
            className="text-xs"
          />
          <YAxis className="text-xs" />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          {lines.map(line => (
            <Line
              key={line.key}
              dataKey={line.key}
              type="monotone"
              stroke={config[line.key]?.color || "#2563eb"}
              strokeWidth={2}
              activeDot={{ r: 8 }}
              className="transition-opacity duration-300 ease-in-out hover:opacity-80"
            />
          ))}
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

export default function RetailWashPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Retail Wash Analytics</h1>
          <p className="text-muted-foreground">Overview of retail wash performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {retailMetricsData.map((metric) => (
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

      {/* Charts with enhanced section headers */}
      <div className="space-y-8">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-4 text-sm text-muted-foreground">Sales Performance</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <CustomPieChart
            data={washesSoldByTypeData}
            config={washesSoldByTypeConfig}
            dataKey="count"
            nameKey="type"
            title="Washes Sold by Type"
          />
          <CustomBarChart
            data={revenueByWashTypeData}
            config={revenueByWashTypeConfig}
            dataKey="revenue"
            categoryKey="type"
            title="Revenue by Wash Type"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-4 text-sm text-muted-foreground">Revenue Performance</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <CustomBarChart
            data={addOnServicesData}
            config={addOnServicesConfig}
            dataKey="revenue"
            categoryKey="service"
            title="Add-On Services Revenue"
            vertical={true}
          />
          <CustomLineChart
            data={washSalesByTimeData}
            config={washSalesByTimeConfig}
            title="Wash Sales by Time of Day"
            categoryKey="time"
            lines={[{ key: 'sales' }]}
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-4 text-sm text-muted-foreground">Volume Performance</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <CustomBarChart
            data={washVolumeByDayData}
            config={washVolumeByDayConfig}
            dataKey="volume"
            categoryKey="day"
            title="Wash Volume by Day of the Week"
          />
          <CustomBarChart
            data={topSellingAddOnsData}
            config={topSellingAddOnsConfig}
            dataKey="count"
            categoryKey="addon"
            title="Top-Selling Add-Ons"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-muted" />
          </div>
          <div className="relative flex justify-center">
            <div className="bg-background px-4 text-sm text-muted-foreground">Customer Performance</div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
          <CustomLineChart
            data={revenueGrowthData}
            config={revenueGrowthConfig}
            title="Revenue Growth by Wash Type"
            categoryKey="month"
            lines={[
              { key: 'Basic' },
              { key: 'Premium' },
              { key: 'Ultimate' },
              { key: 'Deluxe' },
              { key: 'Express' }
            ]}
          />
          <CustomPieChart
            data={customerTypeData}
            config={customerTypeConfig}
            dataKey="count"
            nameKey="type"
            title="Volume from Repeat vs. First-Time Customers"
          />
        </div>
      </div>
    </div>
  );
} 