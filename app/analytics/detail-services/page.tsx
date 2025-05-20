"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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
  CircleDollarSign, 
  BarChart3, 
  Clock, 
  TrendingUp, 
  TrendingDown,
  RefreshCw,
  DollarSign,
  Percent,
  ArrowUpRight,
  Download,
  Filter
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
    id: "total-services",
    name: "Total Detail Services Sold",
    value: "875",
    change: 12.0,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 150 },
      { time: "08:00", value: 300 },
      { time: "12:00", value: 500 },
      { time: "16:00", value: 700 },
      { time: "20:00", value: 875 }
    ],
    icon: BarChart3
  },
  {
    id: "revenue",
    name: "Detail Services Revenue",
    value: "$58,750",
    change: 15.0,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 10000 },
      { time: "08:00", value: 20000 },
      { time: "12:00", value: 35000 },
      { time: "16:00", value: 48000 },
      { time: "20:00", value: 58750 }
    ],
    icon: CircleDollarSign
  },
  {
    id: "avg-revenue",
    name: "Avg Revenue per Service",
    value: "$67.14",
    change: 3.0,
    trend: [
      { time: "00:00", value: 50.00 },
      { time: "04:00", value: 55.00 },
      { time: "08:00", value: 60.00 },
      { time: "12:00", value: 65.00 },
      { time: "16:00", value: 66.00 },
      { time: "20:00", value: 67.14 }
    ],
    icon: DollarSign
  },
  {
    id: "upsell-rate",
    name: "Upsell Success Rate",
    value: "42%",
    change: 5.0,
    trend: [
      { time: "00:00", value: 35 },
      { time: "04:00", value: 37 },
      { time: "08:00", value: 39 },
      { time: "12:00", value: 40 },
      { time: "16:00", value: 41 },
      { time: "20:00", value: 42 }
    ],
    icon: ArrowUpRight
  },
  {
    id: "repeat-rate",
    name: "Repeat Rate",
    value: "38%",
    change: 2.0,
    trend: [
      { time: "00:00", value: 35 },
      { time: "04:00", value: 36 },
      { time: "08:00", value: 37 },
      { time: "12:00", value: 37.5 },
      { time: "16:00", value: 37.8 },
      { time: "20:00", value: 38 }
    ],
    icon: RefreshCw
  },
  {
    id: "revenue-per-hour",
    name: "Revenue per Hour",
    value: "$125.80",
    change: 8.0,
    trend: [
      { time: "00:00", value: 100.00 },
      { time: "04:00", value: 105.00 },
      { time: "08:00", value: 110.00 },
      { time: "12:00", value: 115.00 },
      { time: "16:00", value: 120.00 },
      { time: "20:00", value: 125.80 }
    ],
    icon: Clock
  }
];

// Revenue by detail service type data
const revenueByServiceTypeData = [
  { service: "Interior Deep Clean", revenue: 15250 },
  { service: "Exterior Detail", revenue: 12800 },
  { service: "Full Detail", revenue: 18500 },
  { service: "Ceramic Coating", revenue: 8400 },
  { service: "Paint Correction", revenue: 3800 },
];

const revenueByServiceTypeConfig = {
  revenue: { label: "Revenue ($)", color: "#2563eb" },
} satisfies ChartConfig;

// Detail services by popularity data
const servicesByPopularityData = [
  { type: "interior", value: 380, label: "Interior Deep Clean" },
  { type: "exterior", value: 320, label: "Exterior Detail" },
  { type: "full", value: 95, label: "Full Detail" },
  { type: "ceramic", value: 35, label: "Ceramic Coating" },
  { type: "paint", value: 45, label: "Paint Correction" },
];

const servicesByPopularityConfig = {
  value: { label: "Services Sold" },
  interior: { label: "Interior Deep Clean", color: "#2563eb" },
  exterior: { label: "Exterior Detail", color: "#60a5fa" },
  full: { label: "Full Detail", color: "#22c55e" },
  ceramic: { label: "Ceramic Coating", color: "#f472b6" },
  paint: { label: "Paint Correction", color: "#f59e0b" },
} satisfies ChartConfig;

// Upgrade rate by wash type data
const upgradeRateByWashTypeData = [
  { washType: "Basic Wash", upgradeRate: 28 },
  { washType: "Premium Wash", upgradeRate: 42 },
  { washType: "Deluxe Wash", upgradeRate: 65 },
  { washType: "Ultimate Wash", upgradeRate: 78 },
];

const upgradeRateByWashTypeConfig = {
  upgradeRate: { label: "Upgrade Rate (%)", color: "#f59e0b" },
} satisfies ChartConfig;

// Detail service sales over time data
const salesOverTimeData = [
  { month: "Jan", sales: 68 },
  { month: "Feb", sales: 72 },
  { month: "Mar", sales: 65 },
  { month: "Apr", sales: 70 },
  { month: "May", sales: 80 },
  { month: "Jun", sales: 85 },
  { month: "Jul", sales: 95 },
  { month: "Aug", sales: 105 },
  { month: "Sep", sales: 88 },
  { month: "Oct", sales: 78 },
  { month: "Nov", sales: 72 },
  { month: "Dec", sales: 95 },
];

const salesOverTimeConfig = {
  sales: { label: "Number of Services", color: "#2563eb" },
} satisfies ChartConfig;

// Revenue by membership status data
const revenueByMembershipData = [
  { month: "Jan", members: 3250, nonMembers: 1850 },
  { month: "Feb", members: 3450, nonMembers: 1950 },
  { month: "Mar", members: 3200, nonMembers: 1780 },
  { month: "Apr", members: 3350, nonMembers: 1820 },
  { month: "May", members: 3950, nonMembers: 2250 },
  { month: "Jun", members: 4200, nonMembers: 2350 },
  { month: "Jul", members: 4650, nonMembers: 2650 },
  { month: "Aug", members: 5100, nonMembers: 2950 },
  { month: "Sep", members: 4350, nonMembers: 2450 },
  { month: "Oct", members: 3850, nonMembers: 2150 },
  { month: "Nov", members: 3650, nonMembers: 1950 },
  { month: "Dec", members: 4750, nonMembers: 2650 },
];

const revenueByMembershipConfig = {
  members: { label: "Member Revenue ($)", color: "#2563eb" },
  nonMembers: { label: "Non-Member Revenue ($)", color: "#60a5fa" },
} satisfies ChartConfig;

// Revenue growth data
const revenueGrowthData = [
  { month: "Jan 2022", revenue: 4100 },
  { month: "Feb 2022", revenue: 4350 },
  { month: "Mar 2022", revenue: 4200 },
  { month: "Apr 2022", revenue: 4400 },
  { month: "May 2022", revenue: 4650 },
  { month: "Jun 2022", revenue: 4800 },
  { month: "Jul 2022", revenue: 5100 },
  { month: "Aug 2022", revenue: 5300 },
  { month: "Sep 2022", revenue: 5100 },
  { month: "Oct 2022", revenue: 4900 },
  { month: "Nov 2022", revenue: 4800 },
  { month: "Dec 2022", revenue: 5400 },
  { month: "Jan 2023", revenue: 5100 },
  { month: "Feb 2023", revenue: 5400 },
  { month: "Mar 2023", revenue: 5300 },
  { month: "Apr 2023", revenue: 5500 },
  { month: "May 2023", revenue: 6200 },
  { month: "Jun 2023", revenue: 6550 },
  { month: "Jul 2023", revenue: 7300 },
  { month: "Aug 2023", revenue: 8050 },
  { month: "Sep 2023", revenue: 6800 },
  { month: "Oct 2023", revenue: 6000 },
  { month: "Nov 2023", revenue: 5600 },
  { month: "Dec 2023", revenue: 7400 },
];

const revenueGrowthConfig = {
  revenue: { label: "Revenue ($)", color: "#22c55e" },
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

// Pie Chart Component
const CustomPieChart = ({ data, config, title, dataKey, nameKey }: {
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
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey={nameKey} hideLabel />} />
            <Pie 
              data={data} 
              dataKey={dataKey} 
              nameKey="label" 
              innerRadius={60} 
              strokeWidth={5}
              className="transition-transform duration-300 ease-in-out group-hover:scale-105"
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={config[entry.type]?.color || `hsl(${index * 45}, 70%, 50%)`}
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
                          {config[dataKey]?.label || "Total"}
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

export default function DetailServicesPage() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Detail Services Analytics</h1>
          <p className="text-muted-foreground">Performance metrics for your detail services</p>
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

      {/* Bar Chart and Pie Chart Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <CustomBarChart 
          data={revenueByServiceTypeData} 
          config={revenueByServiceTypeConfig}
          title="Revenue by Detail Service Type" 
          dataKey="revenue" 
          categoryKey="service"
        />
        <CustomPieChart 
          data={servicesByPopularityData} 
          config={servicesByPopularityConfig}
          title="Detail Services by Popularity" 
          dataKey="value" 
          nameKey="type"
        />
      </div>

      {/* Upgrade Rate and Sales Over Time Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <CustomBarChart 
          data={upgradeRateByWashTypeData} 
          config={upgradeRateByWashTypeConfig}
          title="Detail Service Upgrade Rate by Wash Type" 
          dataKey="upgradeRate" 
          categoryKey="washType"
          yAxisLabel="Upgrade Rate (%)"
        />
        <CustomLineChart 
          data={salesOverTimeData} 
          config={salesOverTimeConfig}
          title="Detail Service Sales Over Time" 
          dataKey="sales" 
          categoryKey="month"
        />
      </div>

      {/* Revenue by Membership and Revenue Growth Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <StackedBarChart 
          data={revenueByMembershipData} 
          config={revenueByMembershipConfig}
          title="Detail Service Revenue by Membership Status" 
          dataKeys={["members", "nonMembers"]} 
          categoryKey="month"
        />
        <CustomLineChart 
          data={revenueGrowthData} 
          config={revenueGrowthConfig}
          title="Revenue Growth from Detail Services" 
          dataKey="revenue" 
          categoryKey="month"
        />
      </div>
    </div>
  );
} 