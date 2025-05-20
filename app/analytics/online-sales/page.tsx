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
  Area,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, PercentIcon, CreditCard, ShoppingBag, Tag, Download, Filter } from "lucide-react";
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
const onlineSalesData = {
  revenueToday: "$1,875.50",
  revenueWeek: "$12,450.75",
  revenueMonth: "$48,320.25",
  membershipsSoldToday: 6,
  membershipsSoldWeek: 42,
  membershipsSoldMonth: 168,
  conversionRate: "3.2%",
  averageOrderValue: "$78.25",
  abandonedCartRate: "65.4%",
};

// Online sales by product data
const salesByProductData = [
  { id: 1, type: "basic", value: 4250, label: "Basic Memberships" },
  { id: 2, type: "premium", value: 8750, label: "Premium Memberships" },
  { id: 3, type: "unlimited", value: 12500, label: "Unlimited Memberships" },
  { id: 4, type: "gift", value: 3200, label: "Gift Cards" },
  { id: 5, type: "merchandise", value: 1800, label: "Merchandise" },
];

const salesByProductConfig = {
  value: { label: "Sales ($)" },
  basic: { label: "Basic Memberships", color: "#2563eb" },
  premium: { label: "Premium Memberships", color: "#60a5fa" },
  unlimited: { label: "Unlimited Memberships", color: "#22c55e" },
  gift: { label: "Gift Cards", color: "#f472b6" },
  merchandise: { label: "Merchandise", color: "#f59e0b" },
} satisfies ChartConfig;

// Sales by region data
const salesByRegionData = [
  { id: 1, type: "north", value: 12450, label: "North Region" },
  { id: 2, type: "east", value: 9650, label: "East Region" },
  { id: 3, type: "south", value: 7800, label: "South Region" },
  { id: 4, type: "west", value: 11200, label: "West Region" },
  { id: 5, type: "central", value: 8900, label: "Central Region" },
];

const salesByRegionConfig = {
  value: { label: "Sales ($)" },
  north: { label: "North Region", color: "#2563eb" },
  east: { label: "East Region", color: "#60a5fa" },
  south: { label: "South Region", color: "#22c55e" },
  west: { label: "West Region", color: "#f472b6" },
  central: { label: "Central Region", color: "#f59e0b" },
} satisfies ChartConfig;

// Customer type data
const customerTypeData = [
  { id: 1, type: "first", value: 350, label: "First-Time Customers" },
  { id: 2, type: "returning", value: 850, label: "Returning Customers" },
];

const customerTypeConfig = {
  value: { label: "Customers" },
  first: { label: "First-Time Customers", color: "#2563eb" },
  returning: { label: "Returning Customers", color: "#22c55e" },
} satisfies ChartConfig;

// Daily online sales data
const dailySalesData = [
  { date: "Mar 1", sales: 2450 },
  { date: "Mar 2", sales: 2100 },
  { date: "Mar 3", sales: 2300 },
  { date: "Mar 4", sales: 2800 },
  { date: "Mar 5", sales: 3200 },
  { date: "Mar 6", sales: 2750 },
  { date: "Mar 7", sales: 2900 },
  { date: "Mar 8", sales: 3100 },
  { date: "Mar 9", sales: 3400 },
  { date: "Mar 10", sales: 3200 },
  { date: "Mar 11", sales: 3500 },
  { date: "Mar 12", sales: 3750 },
  { date: "Mar 13", sales: 3450 },
  { date: "Mar 14", sales: 3600 },
];

const dailySalesConfig = {
  sales: { label: "Daily Sales ($)", color: "#2563eb" },
} satisfies ChartConfig;

// Promo code usage data
const promoCodeData = [
  { code: "SPRING25", usage: 145 },
  { code: "NEWMEMBER", usage: 120 },
  { code: "WEEKEND10", usage: 95 },
  { code: "FRIEND15", usage: 85 },
  { code: "GIFT20", usage: 65 },
  { code: "HOLIDAY", usage: 55 },
];

const promoCodeConfig = {
  usage: { label: "Usage Count", color: "#f59e0b" },
} satisfies ChartConfig;

// --- End Mock Data & Config ---

// Update metrics data with trends
const metricsData = [
  {
    id: "revenue-today",
    name: "Online Revenue Today",
    value: "$1,875.50",
    change: 8.5,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 500 },
      { time: "08:00", value: 1000 },
      { time: "12:00", value: 1500 },
      { time: "16:00", value: 1800 },
      { time: "20:00", value: 1875.50 }
    ],
    icon: DollarSign
  },
  {
    id: "revenue-week",
    name: "Online Revenue This Week",
    value: "$12,450.75",
    change: 12.3,
    trend: [
      { time: "Mon", value: 1500 },
      { time: "Tue", value: 1800 },
      { time: "Wed", value: 2000 },
      { time: "Thu", value: 2200 },
      { time: "Fri", value: 2500 },
      { time: "Sat", value: 3000 },
      { time: "Sun", value: 2450.75 }
    ],
    icon: DollarSign
  },
  {
    id: "revenue-month",
    name: "Online Revenue This Month",
    value: "$48,320.25",
    change: 15.7,
    trend: [
      { time: "Week 1", value: 10000 },
      { time: "Week 2", value: 12000 },
      { time: "Week 3", value: 14000 },
      { time: "Week 4", value: 12320.25 }
    ],
    icon: DollarSign
  },
  {
    id: "memberships-today",
    name: "Memberships Sold Today",
    value: "6",
    change: 20.0,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 1 },
      { time: "08:00", value: 2 },
      { time: "12:00", value: 3 },
      { time: "16:00", value: 5 },
      { time: "20:00", value: 6 }
    ],
    icon: Users
  },
  {
    id: "memberships-week",
    name: "Memberships Sold This Week",
    value: "42",
    change: 10.5,
    trend: [
      { time: "Mon", value: 5 },
      { time: "Tue", value: 6 },
      { time: "Wed", value: 7 },
      { time: "Thu", value: 8 },
      { time: "Fri", value: 9 },
      { time: "Sat", value: 10 },
      { time: "Sun", value: 7 }
    ],
    icon: Users
  },
  {
    id: "memberships-month",
    name: "Memberships Sold This Month",
    value: "168",
    change: 18.2,
    trend: [
      { time: "Week 1", value: 35 },
      { time: "Week 2", value: 42 },
      { time: "Week 3", value: 48 },
      { time: "Week 4", value: 43 }
    ],
    icon: Users
  },
  {
    id: "conversion-rate",
    name: "Conversion Rate",
    value: "3.2%",
    change: 5.8,
    trend: [
      { time: "00:00", value: 2.5 },
      { time: "04:00", value: 2.8 },
      { time: "08:00", value: 3.0 },
      { time: "12:00", value: 3.2 },
      { time: "16:00", value: 3.1 },
      { time: "20:00", value: 3.2 }
    ],
    icon: PercentIcon
  },
  {
    id: "average-order",
    name: "Average Order Value (AOV)",
    value: "$78.25",
    change: 4.2,
    trend: [
      { time: "00:00", value: 70 },
      { time: "04:00", value: 72 },
      { time: "08:00", value: 75 },
      { time: "12:00", value: 78 },
      { time: "16:00", value: 80 },
      { time: "20:00", value: 78.25 }
    ],
    icon: CreditCard
  },
  {
    id: "abandoned-cart",
    name: "Abandoned Cart Rate",
    value: "65.4%",
    change: -2.3,
    trend: [
      { time: "00:00", value: 68 },
      { time: "04:00", value: 67 },
      { time: "08:00", value: 66 },
      { time: "12:00", value: 65 },
      { time: "16:00", value: 64 },
      { time: "20:00", value: 65.4 }
    ],
    icon: ShoppingCart
  }
];

// Update StatWidget component
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

// Update Pie Chart Component
const CustomPieChart = ({ 
  data, 
  config, 
  title, 
  dataKey, 
  nameKey 
}: { 
  data: any[]; 
  config: ChartConfig; 
  title: string; 
  dataKey: string; 
  nameKey: string; 
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
          <PieChart className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]">
            <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} hideLabel />} />
            <Pie 
              data={data} 
              dataKey={dataKey} 
              nameKey={nameKey} 
              innerRadius={60} 
              strokeWidth={5}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
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

// Update Line Chart Component
const CustomLineChart = ({ 
  data, 
  config, 
  title, 
  dataKey, 
  categoryKey 
}: { 
  data: any[]; 
  config: ChartConfig; 
  title: string; 
  dataKey: string; 
  categoryKey: string; 
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
              <stop offset="5%" stopColor={config[dataKey]?.color || "#2563eb"} stopOpacity={0.2}/>
              <stop offset="95%" stopColor={config[dataKey]?.color || "#2563eb"} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line 
            type="monotone" 
            dataKey={dataKey} 
            stroke={config[dataKey]?.color || "#2563eb"} 
            strokeWidth={2}
            activeDot={{ r: 8 }}
            className="transition-opacity duration-300 ease-in-out hover:opacity-80"
          />
          <Area
            type="monotone"
            dataKey={dataKey}
            fill="url(#lineGradient)"
            stroke="none"
          />
        </LineChart>
      </ChartContainer>
    </CardContent>
  </Card>
);

// Update Bar Chart Component
const CustomBarChart = ({ 
  data, 
  config, 
  title, 
  dataKey, 
  categoryKey 
}: { 
  data: any[]; 
  config: ChartConfig; 
  title: string; 
  dataKey: string; 
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
          <XAxis dataKey={categoryKey} tickLine={false} axisLine={false} />
          <YAxis />
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

export default function OnlineSalesPage() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Online Sales Analytics</h1>
          <p className="text-muted-foreground">Performance metrics for your online sales operations</p>
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
          data={dailySalesData} 
          config={dailySalesConfig} 
          title="Daily Online Sales Trends" 
          dataKey="sales" 
          categoryKey="date" 
        />
      </div>

      {/* Pie Charts Row */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <CustomPieChart 
          data={salesByProductData} 
          config={salesByProductConfig} 
          title="Online Sales by Product/Service" 
          dataKey="value" 
          nameKey="label" 
        />
        <CustomPieChart 
          data={salesByRegionData} 
          config={salesByRegionConfig} 
          title="Sales by Region" 
          dataKey="value" 
          nameKey="label" 
        />
        <CustomPieChart 
          data={customerTypeData} 
          config={customerTypeConfig} 
          title="First-Time vs. Returning Customers" 
          dataKey="value" 
          nameKey="label" 
        />
      </div>

      {/* Bar Chart Row */}
      <div className="grid gap-6 md:grid-cols-1">
        <CustomBarChart 
          data={promoCodeData} 
          config={promoCodeConfig} 
          title="Promo Code Usage" 
          dataKey="usage" 
          categoryKey="code" 
        />
      </div>
    </div>
  );
} 