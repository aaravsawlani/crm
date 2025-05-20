"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Cloud,
  CloudRain,
  Droplets,
  Sun,
  ThermometerSun,
  Wind,
  Car,
  DollarSign,
  Percent,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// --- Mock Data ---
const overviewData = {
  carsWashedToday: 245,
  todayRevenue: "$3,218.75",
  newMembersToday: 8,
  memberCarsWashed: 142,
  totalMembers: 2875,
  weather: {
    temperature: 78,
    condition: "Partly Cloudy",
    humidity: 45,
    windSpeed: 8,
    precipitation: 10,
    location: "San Francisco, CA"
  }
};

// Weather component icon mapping
const weatherIcons = {
  "Sunny": Sun,
  "Partly Cloudy": Cloud,
  "Rainy": CloudRain,
  "Windy": Wind
};

// Hourly washes data
const hourlyWashesData = [
  { hour: "6 AM", washes: 5 },
  { hour: "7 AM", washes: 12 },
  { hour: "8 AM", washes: 22 },
  { hour: "9 AM", washes: 30 },
  { hour: "10 AM", washes: 25 },
  { hour: "11 AM", washes: 35 },
  { hour: "12 PM", washes: 42 },
  { hour: "1 PM", washes: 38 },
  { hour: "2 PM", washes: 33 },
  { hour: "3 PM", washes: 29 },
  { hour: "4 PM", washes: 25 },
  { hour: "5 PM", washes: 20 },
  { hour: "6 PM", washes: 15 },
  { hour: "7 PM", washes: 8 },
  { hour: "8 PM", washes: 3 },
];

const hourlyWashesConfig = {
  washes: { label: "Washes", color: "#2563eb" },
} satisfies ChartConfig;

// Weekly washes data
const weeklyWashesData = [
  { day: "Monday", washes: 180 },
  { day: "Tuesday", washes: 165 },
  { day: "Wednesday", washes: 190 },
  { day: "Thursday", washes: 210 },
  { day: "Friday", washes: 245 },
  { day: "Saturday", washes: 320 },
  { day: "Sunday", washes: 285 },
];

const weeklyWashesConfig = {
  washes: { label: "Washes", color: "#2563eb" },
} satisfies ChartConfig;

// Daily Revenue data
const dailyRevenueData = [
  { day: "Monday", revenue: 2350 },
  { day: "Tuesday", revenue: 2175 },
  { day: "Wednesday", revenue: 2480 },
  { day: "Thursday", revenue: 2740 },
  { day: "Friday", revenue: 3218 },
  { day: "Saturday", revenue: 4150 },
  { day: "Sunday", revenue: 3670 },
];

const dailyRevenueConfig = {
  revenue: { label: "Revenue ($)", color: "#22c55e" },
} satisfies ChartConfig;

// Membership breakdown data
const membershipData = [
  { type: "basic", count: 1250, label: "Basic Monthly" },
  { type: "premium", count: 875, label: "Premium Monthly" },
  { type: "unlimited", count: 650, label: "Unlimited Monthly" },
  { type: "annual", count: 100, label: "Annual Prepay" },
];

const membershipConfig = {
  count: { label: "Members" },
  basic: { label: "Basic Monthly", color: "#2563eb" },
  premium: { label: "Premium Monthly", color: "#60a5fa" },
  unlimited: { label: "Unlimited Monthly", color: "#22c55e" },
  annual: { label: "Annual Prepay", color: "#f472b6" },
} satisfies ChartConfig;

// Recent members for table
const recentMembers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", plan: "Premium Monthly", joined: "2023-06-01", lastVisit: "2023-06-15" },
  { id: 2, name: "Maria Rodriguez", email: "maria@example.com", plan: "Unlimited Monthly", joined: "2023-06-03", lastVisit: "2023-06-14" },
  { id: 3, name: "John Smith", email: "john@example.com", plan: "Basic Monthly", joined: "2023-06-05", lastVisit: "2023-06-12" },
  { id: 4, name: "Sarah Lee", email: "sarah@example.com", plan: "Annual Prepay", joined: "2023-06-08", lastVisit: "2023-06-10" },
  { id: 5, name: "David Chen", email: "david@example.com", plan: "Premium Monthly", joined: "2023-06-10", lastVisit: "2023-06-15" },
];

// Recent reviews
const recentReviews = [
  { 
    id: 1, 
    customer: "Michael Brown", 
    avatar: "/avatars/01.png", 
    rating: 5, 
    review: "Great service! My car looks brand new every time. The staff is friendly and professional.", 
    date: "2023-06-15" 
  },
  { 
    id: 2, 
    customer: "Jessica Miller", 
    avatar: "/avatars/02.png", 
    rating: 4, 
    review: "Very satisfied with the premium wash. Good value for money.", 
    date: "2023-06-14" 
  },
  { 
    id: 3, 
    customer: "Robert Davis", 
    avatar: "/avatars/03.png", 
    rating: 5, 
    review: "The unlimited membership is the best thing ever! I can keep my car clean all the time.", 
    date: "2023-06-12" 
  }
];

// --- End Mock Data & Config ---

// Add COLORS array at the top with other constants
const COLORS = [
  "hsl(217, 91%, 60%)", // Bright blue
  "hsl(199, 89%, 70%)", // Light blue
  "hsl(142, 71%, 45%)", // Green
  "hsl(4, 90%, 58%)",   // Red
  "hsl(326, 100%, 74%)" // Pink
];

// Update metrics data with trends
const metricsData = [
  {
    id: "total-washes",
    name: "Total Washes",
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

// Weather Widget Component
const WeatherCard = ({ weatherData }: { weatherData: typeof overviewData.weather }) => {
  const WeatherIcon = weatherIcons[weatherData.condition as keyof typeof weatherIcons] || Cloud;
  
  return (
    <Card className="col-span-full md:col-span-1">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Current Weather</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="flex items-center justify-center mb-4">
          <WeatherIcon className="h-12 w-12 text-blue-500 mr-4" />
          <div className="text-3xl font-bold">{weatherData.temperature}°F</div>
        </div>
        <div className="text-lg mb-2">{weatherData.condition}</div>
        <div className="text-sm text-muted-foreground mb-4">{weatherData.location}</div>
        
        <div className="grid grid-cols-3 gap-4 w-full text-center">
          <div className="flex flex-col items-center">
            <Droplets className="h-5 w-5 text-blue-500 mb-1" />
            <div className="text-sm text-muted-foreground">Humidity</div>
            <div className="font-medium">{weatherData.humidity}%</div>
          </div>
          <div className="flex flex-col items-center">
            <Wind className="h-5 w-5 text-blue-500 mb-1" />
            <div className="text-sm text-muted-foreground">Wind</div>
            <div className="font-medium">{weatherData.windSpeed} mph</div>
          </div>
          <div className="flex flex-col items-center">
            <CloudRain className="h-5 w-5 text-blue-500 mb-1" />
            <div className="text-sm text-muted-foreground">Precip.</div>
            <div className="font-medium">{weatherData.precipitation}%</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Line/Bar Chart Component
const CustomChart = ({ 
  data, 
  config, 
  title, 
  type = "bar", 
  dataKey, 
  categoryKey 
}: {
  data: any[];
  config: ChartConfig;
  title: string;
  type?: "line" | "bar";
  dataKey: string;
  categoryKey: string;
}) => (
  <Card className="group relative overflow-hidden transition-all hover:shadow-lg">
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    <CardHeader>
      <CardTitle className="text-lg font-medium">{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-[300px] pb-0">
      <ChartContainer config={config} className="h-full w-full">
        {type === "line" ? (
          <LineChart
            accessibilityLayer
            data={data}
            margin={{ left: 12, right: 12 }}
            className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={config[dataKey]?.color || "#2563eb"} stopOpacity={0.2}/>
                <stop offset="95%" stopColor={config[dataKey]?.color || "#2563eb"} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey={categoryKey}
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={config[dataKey]?.color || "#2563eb"}
              strokeWidth={2}
              activeDot={{ r: 6 }}
              className="transition-opacity duration-300 ease-in-out hover:opacity-80"
            />
            <Area
              type="monotone"
              dataKey={dataKey}
              fill="url(#lineGradient)"
              stroke="none"
            />
          </LineChart>
        ) : (
          <BarChart 
            data={data} 
            accessibilityLayer
            className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]"
          >
            <CartesianGrid vertical={false} />
            <XAxis 
              dataKey={categoryKey} 
              tickLine={false} 
              tickMargin={10} 
              axisLine={false}
            />
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dashed" />} />
            <Bar
              dataKey={dataKey}
              fill={config[dataKey]?.color || "#2563eb"}
              radius={4}
              className="transition-opacity duration-300 ease-in-out hover:opacity-80"
            />
          </BarChart>
        )}
      </ChartContainer>
    </CardContent>
  </Card>
);

// Membership Pie Chart Component
const MembershipPieChart = ({ data, config, dataKey, nameKey, title }: {
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
          <PieChart className="transition-transform duration-300 ease-in-out group-hover:scale-[1.02]">
            <ChartTooltip content={<ChartTooltipContent nameKey={dataKey} hideLabel />} />
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

// Rating Stars Component for Reviews
const RatingStars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={i < rating ? "#facc15" : "none"}
          stroke={i < rating ? "#facc15" : "currentColor"}
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      ))}
    </div>
  );
};

// Recent Reviews Component
const ReviewsCard = ({ reviews }: { reviews: typeof recentReviews }) => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader>
      <CardTitle className="text-lg font-medium">Recent Reviews</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="flex items-start space-x-4 border-b pb-4 last:border-0">
            <Avatar>
              <AvatarFallback>{review.customer.charAt(0)}</AvatarFallback>
              <AvatarImage src={review.avatar} alt={review.customer} />
            </Avatar>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">{review.customer}</h4>
                <span className="text-xs text-muted-foreground">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <RatingStars rating={review.rating} />
              <p className="text-sm text-muted-foreground">{review.review}</p>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

// Membership Table Component
const MembershipTable = ({ members }: { members: typeof recentMembers }) => (
  <Card className="col-span-full lg:col-span-2">
    <CardHeader>
      <CardTitle className="text-lg font-medium">Membership Table</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Last Visit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id}>
              <TableCell className="font-medium">{member.name}</TableCell>
              <TableCell>{member.plan}</TableCell>
              <TableCell>{new Date(member.joined).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(member.lastVisit).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default function OverviewPage() {
  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Analytics Overview</h1>
          <p className="text-muted-foreground">Performance metrics for your car wash operations</p>
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

      {/* Charts row */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        <Tabs defaultValue="hourly" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="hourly">Hourly</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
          </TabsList>
          <TabsContent value="hourly">
            <CustomChart 
              data={hourlyWashesData} 
              config={hourlyWashesConfig} 
              title="Hourly Car Washes" 
              type="bar"
              dataKey="washes" 
              categoryKey="hour" 
            />
          </TabsContent>
          <TabsContent value="weekly">
            <CustomChart 
              data={weeklyWashesData} 
              config={weeklyWashesConfig} 
              title="Weekly Car Washes" 
              type="bar"
              dataKey="washes" 
              categoryKey="day" 
            />
          </TabsContent>
        </Tabs>
        
        <CustomChart 
          data={dailyRevenueData} 
          config={dailyRevenueConfig} 
          title="Weekly Revenue" 
          type="line"
          dataKey="revenue" 
          categoryKey="day" 
        />
      </div>

      {/* Lower Section */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* Membership Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Membership Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <MembershipPieChart 
              data={membershipData} 
              config={membershipConfig} 
              dataKey="count" 
              nameKey="label" 
              title="Membership Distribution" 
            />
          </CardContent>
        </Card>
        
        {/* Recent Members */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Members</CardTitle>
          </CardHeader>
          <CardContent>
            <MembershipTable members={recentMembers} />
          </CardContent>
        </Card>
        
        {/* Weather Information & Reviews */}
        <div className="space-y-6">
          <WeatherCard weatherData={overviewData.weather} />
          <ReviewsCard reviews={recentReviews} />
        </div>
      </div>
    </div>
  );
} 