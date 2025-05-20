"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
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
import { 
  Users, 
  UserPlus, 
  DollarSign, 
  AlertTriangle,
  Calendar, 
  TrendingUp,
  TrendingDown,
  BarChart,
  Download,
  Filter,
  RefreshCw,
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
    id: "total-members",
    name: "Total Active Members",
    value: "2,875",
    change: 5.2,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 500 },
      { time: "08:00", value: 1000 },
      { time: "12:00", value: 1500 },
      { time: "16:00", value: 2000 },
      { time: "20:00", value: 2875 }
    ],
    icon: Users
  },
  {
    id: "new-members",
    name: "New Members This Month",
    value: "8",
    change: 12.5,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 1 },
      { time: "08:00", value: 3 },
      { time: "12:00", value: 5 },
      { time: "16:00", value: 7 },
      { time: "20:00", value: 8 }
    ],
    icon: UserPlus
  },
  {
    id: "retention-rate",
    name: "Member Retention Rate",
    value: "82.5%",
    change: 2.3,
    trend: [
      { time: "00:00", value: 80 },
      { time: "04:00", value: 81 },
      { time: "08:00", value: 81.5 },
      { time: "12:00", value: 82 },
      { time: "16:00", value: 82.3 },
      { time: "20:00", value: 82.5 }
    ],
    icon: RefreshCw
  },
  {
    id: "avg-value",
    name: "Average Member Value",
    value: "$75.00",
    change: 8.1,
    trend: [
      { time: "00:00", value: 65 },
      { time: "04:00", value: 68 },
      { time: "08:00", value: 70 },
      { time: "12:00", value: 72 },
      { time: "16:00", value: 74 },
      { time: "20:00", value: 75 }
    ],
    icon: DollarSign
  }
];

const membersData = {
  totalMembers: 2875,
  membersSignedUpToday: 8,
  membersSignedUpLastWeek: 54,
  averageVisitFrequency: "2.7 visits/month",
  averageMemberRevenue: "$65.40/month",
  atRiskMembers: 127,
  totalActiveMembers: 2450,
  newMembersThisMonth: 8,
  retentionRate: 82.5,
  averageMemberValue: "$75.00",
};

// Members by plan type data
const membersByPlanData = [
  { type: "basic", value: 1250, label: "Basic Plan" },
  { type: "premium", value: 875, label: "Premium Plan" },
  { type: "unlimited", value: 650, label: "Unlimited Plan" },
  { type: "annual", value: 100, label: "Annual Prepay" },
];

const membersByPlanConfig = {
  value: { label: "Members" },
  basic: { label: "Basic Plan", color: "#2563eb" },
  premium: { label: "Premium Plan", color: "#60a5fa" },
  unlimited: { label: "Unlimited Plan", color: "#22c55e" },
  annual: { label: "Annual Prepay", color: "#f472b6" },
} satisfies ChartConfig;

// Active members over last 3 months data
const activeMembersData = [
  { date: "Jan 01", active: 2450 },
  { date: "Jan 08", active: 2480 },
  { date: "Jan 15", active: 2510 },
  { date: "Jan 22", active: 2550 },
  { date: "Jan 29", active: 2580 },
  { date: "Feb 05", active: 2620 },
  { date: "Feb 12", active: 2650 },
  { date: "Feb 19", active: 2675 },
  { date: "Feb 26", active: 2710 },
  { date: "Mar 05", active: 2750 },
  { date: "Mar 12", active: 2790 },
  { date: "Mar 19", active: 2830 },
  { date: "Mar 26", active: 2875 },
];

const activeMembersConfig = {
  active: { label: "Active Members", color: "#2563eb" },
} satisfies ChartConfig;

// Churn over last 3 months data
const churnData = [
  { date: "Jan 01", churn: 15 },
  { date: "Jan 08", churn: 18 },
  { date: "Jan 15", churn: 12 },
  { date: "Jan 22", churn: 20 },
  { date: "Jan 29", churn: 16 },
  { date: "Feb 05", churn: 22 },
  { date: "Feb 12", churn: 19 },
  { date: "Feb 19", churn: 14 },
  { date: "Feb 26", churn: 17 },
  { date: "Mar 05", churn: 21 },
  { date: "Mar 12", churn: 13 },
  { date: "Mar 19", churn: 16 },
  { date: "Mar 26", churn: 18 },
];

const churnConfig = {
  churn: { label: "Member Cancellations", color: "#ef4444" },
} satisfies ChartConfig;

// Plan changes over time data
const planChangesData = [
  { date: "Jan", upgrades: 35, downgrades: 18 },
  { date: "Feb", upgrades: 42, downgrades: 15 },
  { date: "Mar", upgrades: 38, downgrades: 22 },
  { date: "Apr", upgrades: 45, downgrades: 19 },
  { date: "May", upgrades: 40, downgrades: 17 },
  { date: "Jun", upgrades: 48, downgrades: 14 },
  { date: "Jul", upgrades: 52, downgrades: 12 },
  { date: "Aug", upgrades: 45, downgrades: 20 },
  { date: "Sep", upgrades: 50, downgrades: 15 },
  { date: "Oct", upgrades: 55, downgrades: 18 },
  { date: "Nov", upgrades: 48, downgrades: 22 },
  { date: "Dec", upgrades: 60, downgrades: 16 },
];

const planChangesConfig = {
  upgrades: { label: "Plan Upgrades", color: "#22c55e" },
  downgrades: { label: "Plan Downgrades", color: "#f97316" },
} satisfies ChartConfig;

// Churn by months since joining data
const churnByTenureData = [
  { month: "1", rate: 8.2 },
  { month: "2", rate: 5.4 },
  { month: "3", rate: 4.7 },
  { month: "4", rate: 3.9 },
  { month: "5", rate: 3.2 },
  { month: "6", rate: 2.8 },
  { month: "7", rate: 2.5 },
  { month: "8", rate: 2.3 },
  { month: "9", rate: 2.1 },
  { month: "10", rate: 1.9 },
  { month: "11", rate: 1.8 },
  { month: "12+", rate: 1.5 },
];

const churnByTenureConfig = {
  rate: { label: "Churn Rate (%)", color: "#f43f5e" },
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

// Pie Chart Component (reused from other pages)
const MembersPieChart = ({ data, config, title, dataKey, nameKey }: {
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

export default function MembersAnalyticsPage() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Members Analytics</h1>
          <p className="text-muted-foreground">Performance metrics for your membership program</p>
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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

      {/* Line Charts Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <CustomLineChart 
          data={activeMembersData} 
          config={activeMembersConfig}
          title="Total Active Members (Last 3 Months)" 
          dataKey="active" 
          categoryKey="date"
        />
        <CustomLineChart 
          data={churnData} 
          config={churnConfig}
          title="Member Churn (Last 3 Months)" 
          dataKey="churn" 
          categoryKey="date"
        />
      </div>

      {/* Pie Chart and Line Chart Row */}
      <div className="grid gap-6 md:grid-cols-2">
        <MembersPieChart 
          data={membersByPlanData} 
          config={membersByPlanConfig}
          title="Members by Plan Type" 
          dataKey="value" 
          nameKey="type"
        />
        <CustomLineChart 
          data={planChangesData} 
          config={planChangesConfig}
          title="Plan Upgrades and Downgrades" 
          dataKey={["upgrades", "downgrades"]} 
          categoryKey="date"
          multipleLines={true}
        />
      </div>

      {/* Line Chart Row */}
      <div className="grid gap-6 md:grid-cols-1">
        <CustomLineChart 
          data={churnByTenureData} 
          config={churnByTenureConfig}
          title="Member Churn by Months Since Joining" 
          dataKey="rate" 
          categoryKey="month"
        />
      </div>
    </div>
  );
} 