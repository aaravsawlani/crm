"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  User,
  Calendar,
  Car,
  CreditCard,
  DollarSign,
  Package,
  Star,
  Clock,
  AlertCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Mock data for demonstration
const mockMemberData = {
  id: "M123456",
  personalInfo: {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, ST 12345",
    memberSince: "2022-03-15",
    status: "active",
    tier: "platinum",
    image: "/placeholder-avatar.jpg",
  },
  membership: {
    plan: "Unlimited Wash Club",
    price: "$29.99/month",
    nextBilling: "2024-04-15",
    status: "Active",
    vehiclesRegistered: 2,
    lastRenewal: "2024-03-15",
  },
  stats: {
    totalSpent: "$358.92",
    visitsThisMonth: 4,
    lifetimeVisits: 47,
    averageSpend: "$7.63",
    lastVisit: "2024-03-28",
  },
  vehicles: [
    {
      make: "Toyota",
      model: "Camry",
      year: "2020",
      color: "Silver",
      licensePlate: "ABC123",
      tag: "Primary",
    },
    {
      make: "Honda",
      model: "CR-V",
      year: "2019",
      color: "Blue",
      licensePlate: "XYZ789",
      tag: "Secondary",
    },
  ],
  recentTransactions: [
    {
      date: "2024-03-28",
      service: "Ultimate Wash",
      amount: "$24.99",
      status: "completed",
    },
    {
      date: "2024-03-21",
      service: "Interior Detail",
      amount: "$89.99",
      status: "completed",
    },
    {
      date: "2024-03-14",
      service: "Premium Wash",
      amount: "$19.99",
      status: "completed",
    },
  ],
  washHistory: [
    {
      date: "2024-03-28",
      type: "Ultimate Wash",
      location: "Main Street",
      addOns: ["Tire Shine", "Air Freshener"],
    },
    {
      date: "2024-03-21",
      type: "Interior Detail",
      location: "Main Street",
      addOns: ["Pet Hair Removal", "Leather Treatment"],
    },
    {
      date: "2024-03-14",
      type: "Premium Wash",
      location: "Downtown",
      addOns: ["Wax", "Undercarriage Wash"],
    },
  ],
};

// Status Badge Component
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "inactive":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
    }
  };

  return (
    <Badge className={`${getStatusColor(status)} capitalize`}>{status}</Badge>
  );
};

// Member Profile Component
const MemberProfile = ({ member }: { member: typeof mockMemberData }) => {
  return (
    <div className="space-y-6">
      {/* Header with basic info */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarImage src={member.personalInfo.image} />
              <AvatarFallback>
                {member.personalInfo.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold">{member.personalInfo.name}</h2>
                <StatusBadge status={member.personalInfo.status} />
                <Badge variant="outline" className="ml-2">
                  {member.personalInfo.tier.toUpperCase()}
                </Badge>
              </div>
              <p className="text-muted-foreground">{member.personalInfo.email}</p>
              <p className="text-muted-foreground">{member.personalInfo.phone}</p>
              <p className="text-muted-foreground">{member.personalInfo.address}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Member Since</p>
              <p className="font-medium">
                {new Date(member.personalInfo.memberSince).toLocaleDateString()}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">Member ID</p>
              <p className="font-medium">{member.id}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{member.stats.totalSpent}</div>
            <p className="text-xs text-muted-foreground">
              Avg. {member.stats.averageSpend} per visit
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Visits This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {member.stats.visitsThisMonth}
            </div>
            <p className="text-xs text-muted-foreground">
              Last visit: {new Date(member.stats.lastVisit).toLocaleDateString()}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Lifetime Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{member.stats.lifetimeVisits}</div>
            <p className="text-xs text-muted-foreground">Since membership start</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Membership Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{member.membership.plan}</div>
            <p className="text-xs text-muted-foreground">
              {member.membership.price}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information Tabs */}
      <Tabs defaultValue="vehicles" className="space-y-4">
        <TabsList>
          <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="washHistory">Wash History</TabsTrigger>
          <TabsTrigger value="membership">Membership Details</TabsTrigger>
        </TabsList>

        <TabsContent value="vehicles" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {member.vehicles.map((vehicle, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg font-medium">
                    {vehicle.year} {vehicle.make} {vehicle.model}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Color:</span>
                      <span>{vehicle.color}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">License Plate:</span>
                      <span>{vehicle.licensePlate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tag:</span>
                      <Badge variant="outline">{vehicle.tag}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Service</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member.recentTransactions.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{transaction.service}</TableCell>
                      <TableCell>{transaction.amount}</TableCell>
                      <TableCell>
                        <StatusBadge status={transaction.status} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="washHistory">
          <Card>
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Add-ons</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {member.washHistory.map((wash, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {new Date(wash.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{wash.type}</TableCell>
                      <TableCell>{wash.location}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {wash.addOns.map((addon, i) => (
                            <Badge key={i} variant="outline">
                              {addon}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="membership">
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Current Plan</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Plan Name:</span>
                        <span>{member.membership.plan}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span>{member.membership.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        <StatusBadge status={member.membership.status} />
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Billing Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Billing:</span>
                        <span>
                          {new Date(member.membership.nextBilling).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Renewal:</span>
                        <span>
                          {new Date(member.membership.lastRenewal).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">
                          Vehicles Registered:
                        </span>
                        <span>{member.membership.vehiclesRegistered}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Membership Benefits</h3>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Unlimited Washes</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Priority Lane Access</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Special Discounts on Details</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                        <span>Multiple Vehicle Registration</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default function MemberLookupPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchResults, setSearchResults] = React.useState<typeof mockMemberData | null>(null);

  const handleSearch = () => {
    // In a real application, this would make an API call
    // For this demo, we'll just return the mock data
    setSearchResults(mockMemberData);
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
        <h1 className="text-3xl font-bold">Member Lookup</h1>
          <p className="text-muted-foreground">Search and view member details</p>
        </div>
      </div>

      {/* Search Section */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, phone, or email..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={handleSearch}>
              Search
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Member Profile Section */}
      {searchResults && (
        <Card>
          <CardContent className="p-6">
            <div className="grid gap-6">
              {/* Member Info */}
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{searchResults.personalInfo.name}</h2>
                    <p className="text-muted-foreground">{searchResults.id}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium">{searchResults.personalInfo.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{searchResults.personalInfo.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Join Date</p>
                    <p className="font-medium">{new Date(searchResults.personalInfo.memberSince).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
                      ${searchResults.personalInfo.status === 'active' ? 'bg-green-100 text-green-800' : 
                        searchResults.personalInfo.status === 'inactive' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}
                    >
                      {searchResults.personalInfo.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs defaultValue="vehicles" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="vehicles">Vehicles</TabsTrigger>
                  <TabsTrigger value="transactions">Transactions</TabsTrigger>
                  <TabsTrigger value="washHistory">Wash History</TabsTrigger>
                  <TabsTrigger value="membership">Membership</TabsTrigger>
                </TabsList>
                <TabsContent value="vehicles">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        {searchResults.vehicles.map((vehicle) => (
                          <div key={vehicle.licensePlate} className="flex items-center gap-4 p-4 border rounded-lg">
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                              <Car className="h-6 w-6 text-muted-foreground" />
                            </div>
                            <div>
                              <p className="font-medium">{vehicle.year} {vehicle.make} {vehicle.model}</p>
                              <p className="text-sm text-muted-foreground">{vehicle.licensePlate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="transactions">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        {searchResults.recentTransactions.map((transaction) => (
                          <div key={transaction.date} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{transaction.service}</p>
                              <p className="text-sm text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                            </div>
                            <p className="font-medium">${transaction.amount}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="washHistory">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        {searchResults.washHistory.map((wash) => (
                          <div key={wash.date} className="flex items-center justify-between p-4 border rounded-lg">
                            <div>
                              <p className="font-medium">{wash.type}</p>
                              <p className="text-sm text-muted-foreground">{new Date(wash.date).toLocaleDateString()}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">{wash.location}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="membership">
                  <Card>
                    <CardContent className="p-6">
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Plan</p>
                            <p className="font-medium">{searchResults.membership.plan}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Recharge Date</p>
                            <p className="font-medium">{new Date(searchResults.membership.nextBilling).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Used</p>
                            <p className="font-medium">{new Date(searchResults.membership.lastRenewal).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Visit Count</p>
                            <p className="font-medium">{searchResults.stats.visitsThisMonth}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 