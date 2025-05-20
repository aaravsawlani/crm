"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CalendarIcon, ChevronDown, Filter, Search, TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Mail, MessageSquare, Zap, Users, Clock, CheckCircle2, XCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, AreaChart, Area, Legend } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

const metricsData = [
  {
    id: "emails",
    name: "Emails Sent",
    value: "1,234",
    change: 12.5,
    trend: [
      { time: "00:00", value: 0 },
      { time: "01:00", value: 25 },
      { time: "02:00", value: 45 },
      { time: "03:00", value: 75 },
      { time: "04:00", value: 100 },
      { time: "05:00", value: 150 },
      { time: "06:00", value: 200 },
      { time: "07:00", value: 250 },
      { time: "08:00", value: 300 },
      { time: "09:00", value: 400 },
      { time: "10:00", value: 500 },
      { time: "11:00", value: 550 },
      { time: "12:00", value: 600 },
      { time: "13:00", value: 700 },
      { time: "14:00", value: 800 },
      { time: "15:00", value: 850 },
      { time: "16:00", value: 900 },
      { time: "17:00", value: 1000 },
      { time: "18:00", value: 1100 },
      { time: "19:00", value: 1200 },
      { time: "20:00", value: 1234 },
    ],
    icon: Mail,
  },
  {
    id: "sms",
    name: "SMS Sent",
    value: "567",
    change: -5.2,
    trend: [
      { time: "00:00", value: 0 },
      { time: "01:00", value: 15 },
      { time: "02:00", value: 25 },
      { time: "03:00", value: 35 },
      { time: "04:00", value: 50 },
      { time: "05:00", value: 75 },
      { time: "06:00", value: 100 },
      { time: "07:00", value: 125 },
      { time: "08:00", value: 150 },
      { time: "09:00", value: 200 },
      { time: "10:00", value: 250 },
      { time: "11:00", value: 275 },
      { time: "12:00", value: 300 },
      { time: "13:00", value: 350 },
      { time: "14:00", value: 400 },
      { time: "15:00", value: 425 },
      { time: "16:00", value: 450 },
      { time: "17:00", value: 500 },
      { time: "18:00", value: 525 },
      { time: "19:00", value: 550 },
      { time: "20:00", value: 567 },
    ],
    icon: MessageSquare,
  },
  {
    id: "flows",
    name: "Active Flows",
    value: "89",
    change: 8.3,
    trend: [
      { time: "00:00", value: 0 },
      { time: "01:00", value: 5 },
      { time: "02:00", value: 10 },
      { time: "03:00", value: 15 },
      { time: "04:00", value: 20 },
      { time: "05:00", value: 25 },
      { time: "06:00", value: 30 },
      { time: "07:00", value: 35 },
      { time: "08:00", value: 40 },
      { time: "09:00", value: 45 },
      { time: "10:00", value: 50 },
      { time: "11:00", value: 55 },
      { time: "12:00", value: 60 },
      { time: "13:00", value: 65 },
      { time: "14:00", value: 70 },
      { time: "15:00", value: 75 },
      { time: "16:00", value: 80 },
      { time: "17:00", value: 83 },
      { time: "18:00", value: 85 },
      { time: "19:00", value: 87 },
      { time: "20:00", value: 89 },
    ],
    icon: Zap,
  },
  {
    id: "contacts",
    name: "Active Contacts",
    value: "4,567",
    change: 15.7,
    trend: [
      { time: "00:00", value: 0 },
      { time: "01:00", value: 250 },
      { time: "02:00", value: 500 },
      { time: "03:00", value: 750 },
      { time: "04:00", value: 1000 },
      { time: "05:00", value: 1250 },
      { time: "06:00", value: 1500 },
      { time: "07:00", value: 1750 },
      { time: "08:00", value: 2000 },
      { time: "09:00", value: 2250 },
      { time: "10:00", value: 2500 },
      { time: "11:00", value: 2750 },
      { time: "12:00", value: 3000 },
      { time: "13:00", value: 3250 },
      { time: "14:00", value: 3500 },
      { time: "15:00", value: 3750 },
      { time: "16:00", value: 4000 },
      { time: "17:00", value: 4150 },
      { time: "18:00", value: 4300 },
      { time: "19:00", value: 4450 },
      { time: "20:00", value: 4567 },
    ],
    icon: Users,
  },
];

const hourlyData = [
  { hour: "00:00", emails: 0, sms: 0, flows: 0 },
  { hour: "01:00", emails: 25, sms: 15, flows: 5 },
  { hour: "02:00", emails: 45, sms: 25, flows: 10 },
  { hour: "03:00", emails: 75, sms: 35, flows: 15 },
  { hour: "04:00", emails: 100, sms: 50, flows: 20 },
  { hour: "05:00", emails: 150, sms: 75, flows: 25 },
  { hour: "06:00", emails: 200, sms: 100, flows: 30 },
  { hour: "07:00", emails: 250, sms: 125, flows: 35 },
  { hour: "08:00", emails: 300, sms: 150, flows: 40 },
  { hour: "09:00", emails: 400, sms: 200, flows: 45 },
  { hour: "10:00", emails: 500, sms: 250, flows: 50 },
  { hour: "11:00", emails: 550, sms: 275, flows: 55 },
  { hour: "12:00", emails: 600, sms: 300, flows: 60 },
  { hour: "13:00", emails: 700, sms: 350, flows: 65 },
  { hour: "14:00", emails: 800, sms: 400, flows: 70 },
  { hour: "15:00", emails: 850, sms: 425, flows: 75 },
  { hour: "16:00", emails: 900, sms: 450, flows: 80 },
  { hour: "17:00", emails: 1000, sms: 500, flows: 83 },
  { hour: "18:00", emails: 1100, sms: 525, flows: 85 },
  { hour: "19:00", emails: 1200, sms: 550, flows: 87 },
  { hour: "20:00", emails: 1234, sms: 567, flows: 89 },
];

const recentActivity = [
  {
    id: 1,
    time: "2 minutes ago",
    description: "Welcome Series flow completed by 45 contacts",
    value: 12.5,
    icon: CheckCircle2,
  },
  {
    id: 2,
    time: "5 minutes ago",
    description: "Monthly Newsletter sent to 1,200 contacts",
    value: 8.3,
    icon: Mail,
  },
  {
    id: 3,
    time: "15 minutes ago",
    description: "Service Reminder SMS sent to 300 contacts",
    value: -5.2,
    icon: MessageSquare,
  },
  {
    id: 4,
    time: "30 minutes ago",
    description: "At Risk Recovery flow started for 150 contacts",
    value: 15.7,
    icon: Zap,
  },
];

const chartConfig = {
  emails: { label: "Emails", color: "hsl(217, 91%, 60%)" }, // Bright blue
  sms: { label: "SMS", color: "hsl(199, 89%, 70%)" }, // Light blue
  flows: { label: "Flows", color: "hsl(142, 71%, 45%)" }, // Green
  contacts: { label: "Contacts", color: "hsl(326, 100%, 74%)" }, // Pink
  trend: { label: "Trend", color: "currentColor" },
} satisfies ChartConfig;

export default function MarketingAnalyticsPage() {
  const [selectedMetric, setSelectedMetric] = useState("all");

  const metrics = [
    { id: "all", label: "All Metrics" },
    { id: "email", label: "Email" },
    { id: "sms", label: "SMS" },
    { id: "flows", label: "Flows" },
  ];

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marketing Analytics</h1>
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

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader>
            <CardTitle>Hourly Activity</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={hourlyData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="hour" className="text-xs" />
                <YAxis className="text-xs" />
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
                                {payload[0].payload.hour}
                              </span>
                            </div>
                            {payload.map((entry) => (
                              <div key={entry.name} className="flex flex-col">
                                <span className="text-[0.70rem] uppercase text-muted-foreground">
                                  {entry.name}
                                </span>
                                <span className="font-bold">
                                  {entry.value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )
                    }
                    return null
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="emails"
                  name="Emails"
                  stroke="hsl(217, 91%, 60%)" // Bright blue
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="sms"
                  name="SMS"
                  stroke="hsl(199, 89%, 70%)" // Light blue
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="flows"
                  name="Flows"
                  stroke="hsl(142, 71%, 45%)" // Green
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mt-1">
                    <activity.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.description}</div>
                    <div className="text-sm text-muted-foreground">{activity.time}</div>
                  </div>
                  {activity.value && (
                    <div className={cn(
                      "flex items-center text-sm",
                      activity.value >= 0 ? "text-green-500" : "text-red-500"
                    )}>
                      {activity.value >= 0 ? "+" : ""}{activity.value}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 