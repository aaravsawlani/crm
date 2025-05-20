"use client"; // Mark as Client Component for potential future interactivity

import * as React from "react"; // Import React for useMemo
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, ChevronDown, Filter, Search, TrendingUp, TrendingDown, DollarSign, Car, UserPlus, CarFront } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Label, // Import Label
  LineChart,
  Line,
  AreaChart,
  Area,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  total: { label: "Total", color: "hsl(326, 100%, 74%)" },
  members: { label: "Members", color: "hsl(217, 91%, 60%)" },
  nonMembers: { label: "Non-Members", color: "hsl(142, 71%, 45%)" },
  Basic: { label: "Basic", color: "hsl(217, 91%, 60%)" },
  Premium: { label: "Premium", color: "hsl(199, 89%, 70%)" },
  Ultimate: { label: "Ultimate", color: "hsl(142, 71%, 45%)" },
} satisfies ChartConfig;

const metricsData = [
  {
    id: "revenue",
    name: "Day's Revenue",
    value: "$2,345",
    change: 8.5,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 500 },
      { time: "08:00", value: 1000 },
      { time: "12:00", value: 1500 },
      { time: "16:00", value: 2000 },
      { time: "20:00", value: 2345 },
    ],
    icon: DollarSign,
  },
  {
    id: "avg-revenue",
    name: "Avg Revenue Per Wash",
    value: "$15.75",
    change: 2.3,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 12 },
      { time: "08:00", value: 14 },
      { time: "12:00", value: 15 },
      { time: "16:00", value: 15.5 },
      { time: "20:00", value: 15.75 },
    ],
    icon: DollarSign,
  },
  {
    id: "new-memberships",
    name: "New Memberships Sold",
    value: "45",
    change: 12.5,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 5 },
      { time: "08:00", value: 15 },
      { time: "12:00", value: 25 },
      { time: "16:00", value: 35 },
      { time: "20:00", value: 45 },
    ],
    icon: UserPlus,
  },
  {
    id: "total-cars",
    name: "Total Cars Washed",
    value: "189",
    change: 5.7,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 20 },
      { time: "08:00", value: 50 },
      { time: "12:00", value: 100 },
      { time: "16:00", value: 150 },
      { time: "20:00", value: 189 },
    ],
    icon: Car,
  },
  {
    id: "member-cars",
    name: "Member Cars Washed",
    value: "124",
    change: 4.2,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 15 },
      { time: "08:00", value: 35 },
      { time: "12:00", value: 70 },
      { time: "16:00", value: 100 },
      { time: "20:00", value: 124 },
    ],
    icon: CarFront,
  },
  {
    id: "non-member-cars",
    name: "Non-Member Cars Washed",
    value: "65",
    change: 8.3,
    trend: [
      { time: "00:00", value: 0 },
      { time: "04:00", value: 5 },
      { time: "08:00", value: 15 },
      { time: "12:00", value: 30 },
      { time: "16:00", value: 50 },
      { time: "20:00", value: 65 },
    ],
    icon: Car,
  },
];

const membershipTypesData = [
  { name: "Basic", value: 20 },
  { name: "Premium", value: 15 },
  { name: "Ultimate", value: 10 },
];

const washTypesData = [
  { name: "Basic", value: 80 },
  { name: "Premium", value: 65 },
  { name: "Ultimate", value: 44 },
];

const memberWashTypesData = [
  { name: "Basic", value: 50 },
  { name: "Premium", value: 45 },
  { name: "Ultimate", value: 29 },
];

const nonMemberWashTypesData = [
  { name: "Basic", value: 30 },
  { name: "Premium", value: 20 },
  { name: "Ultimate", value: 15 },
];

const hourlyData = [
  { hour: "08:00", members: 8, nonMembers: 4, total: 12 },
  { hour: "09:00", members: 12, nonMembers: 6, total: 18 },
  { hour: "10:00", members: 15, nonMembers: 7, total: 22 },
  { hour: "11:00", members: 18, nonMembers: 8, total: 26 },
  { hour: "12:00", members: 20, nonMembers: 10, total: 30 },
  { hour: "13:00", members: 18, nonMembers: 9, total: 27 },
  { hour: "14:00", members: 16, nonMembers: 8, total: 24 },
  { hour: "15:00", members: 15, nonMembers: 7, total: 22 },
  { hour: "16:00", members: 17, nonMembers: 8, total: 25 },
  { hour: "17:00", members: 19, nonMembers: 9, total: 28 },
  { hour: "18:00", members: 18, nonMembers: 8, total: 26 },
  { hour: "19:00", members: 16, nonMembers: 7, total: 23 },
  { hour: "20:00", members: 15, nonMembers: 5, total: 20 }
];

const COLORS = [
  "hsl(217, 91%, 60%)", // Bright blue
  "hsl(199, 89%, 70%)", // Light blue
  "hsl(142, 71%, 45%)", // Green
  "hsl(4, 90%, 58%)",   // Red
  "hsl(326, 100%, 74%)" // Pink
];

export default function TodayAnalyticsPage() {
  const [selectedMetric, setSelectedMetric] = useState("all");

  const metrics = [
    { id: "all", label: "All Metrics" },
    { id: "revenue", label: "Revenue" },
    { id: "memberships", label: "Memberships" },
    { id: "washes", label: "Washes" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Today's Analytics</h1>
          <p className="text-muted-foreground">Real-time insights for {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search metrics..." className="pl-8 w-[200px]" />
          </div>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-between">
                <span>Filter</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-2">
              <div className="space-y-2">
                {metrics.map((metric) => (
                  <Button
                    key={metric.id}
                    variant={selectedMetric === metric.id ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setSelectedMetric(metric.id)}
                  >
                    {metric.label}
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
        {metricsData.map((metric) => (
          <Card key={metric.id} className="group relative overflow-hidden transition-all hover:shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <metric.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className={cn(
                "flex items-center text-xs",
                metric.change >= 0 ? "text-green-500" : "text-red-500"
              )}>
                {metric.change >= 0 ? (
                  <TrendingUp className="mr-1 h-3 w-3" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3" />
                )}
                {Math.abs(metric.change)}% from yesterday
              </div>
              <div className="mt-2 h-[60px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart 
                    data={metric.trend}
                    margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id={`gradient-${metric.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop 
                          offset="5%" 
                          stopColor={metric.change >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                          stopOpacity={0.2} 
                        />
                        <stop 
                          offset="95%" 
                          stopColor={metric.change >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"} 
                          stopOpacity={0} 
                        />
                      </linearGradient>
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      name="Value"
                      stroke={metric.change >= 0 ? "rgb(34, 197, 94)" : "rgb(239, 68, 68)"}
                      fill={`url(#gradient-${metric.id})`}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="rounded-lg border bg-background p-2 shadow-sm">
                              <div className="grid grid-cols-2 gap-2">
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Time
                                  </span>
                                  <span className="font-bold text-muted-foreground">
                                    {payload[0].payload.time}
                                  </span>
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-[0.70rem] uppercase text-muted-foreground">
                                    Value
                                  </span>
                                  <span className="font-bold">
                                    {payload[0].value}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>New Memberships Sold by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={membershipTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {membershipTypesData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="47%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-4xl font-bold fill-foreground"
                  >
                    {membershipTypesData.reduce((sum, item) => sum + item.value, 0)}
                  </text>
                  <text
                    x="50%"
                    y="57%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm fill-muted-foreground"
                  >
                    Total
                  </text>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Cars Washed by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={washTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {washTypesData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="47%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-4xl font-bold fill-foreground"
                  >
                    {washTypesData.reduce((sum, item) => sum + item.value, 0)}
                  </text>
                  <text
                    x="50%"
                    y="57%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm fill-muted-foreground"
                  >
                    Total
                  </text>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Member Cars Washed by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={memberWashTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {memberWashTypesData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="47%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-4xl font-bold fill-foreground"
                  >
                    {memberWashTypesData.reduce((sum, item) => sum + item.value, 0)}
                  </text>
                  <text
                    x="50%"
                    y="57%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm fill-muted-foreground"
                  >
                    Total
                  </text>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Non-Member Cars Washed by Type</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={nonMemberWashTypesData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    innerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {nonMemberWashTypesData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        strokeWidth={0}
                      />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="47%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-4xl font-bold fill-foreground"
                  >
                    {nonMemberWashTypesData.reduce((sum, item) => sum + item.value, 0)}
                  </text>
                  <text
                    x="50%"
                    y="57%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-sm fill-muted-foreground"
                  >
                    Total
                  </text>
                  <ChartTooltip content={<ChartTooltipContent nameKey="name" hideLabel />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Cars Washed Per Hour</CardTitle>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart 
                data={hourlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="hour" className="text-xs" />
                <YAxis className="text-xs" />
                <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
                <Legend />
                <Bar 
                  dataKey="total" 
                  name="Total" 
                  fill="hsl(326, 100%, 74%)" // Pink
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="members" 
                  name="Members" 
                  fill="hsl(217, 91%, 60%)" // Bright blue
                  radius={[4, 4, 0, 0]}
                />
                <Bar 
                  dataKey="nonMembers" 
                  name="Non-Members" 
                  fill="hsl(142, 71%, 45%)" // Green
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
} 