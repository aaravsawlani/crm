"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChevronDownIcon,
  DownloadIcon,
  SearchIcon,
  Filter,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Types for our member data
type Member = {
  id: string;
  name: string;
  customerCode: string;
  planName: string;
  rechargeStatus: "Active" | "Inactive" | "Pending";
  rechargeSite: string;
  joinDate: string;
  rechargeDate: string;
  lastUsedDate: string;
  monthsAsMember: number;
  visitCount: number;
  averageVisitsPerMonth: number;
  vehicleColor: string;
  phoneNumber: string;
  email: string;
  city: string;
  zipCode: string;
};

// Mock data for our members
const mockMembers: Member[] = [
  {
    id: "1",
    name: "Smith, John",
    customerCode: "JS0012345",
    planName: "Premium Monthly",
    rechargeStatus: "Active",
    rechargeSite: "Main Street",
    joinDate: "2022-03-15",
    rechargeDate: "2023-06-15",
    lastUsedDate: "2023-06-10",
    monthsAsMember: 15,
    visitCount: 45,
    averageVisitsPerMonth: 3,
    vehicleColor: "Blue",
    phoneNumber: "(555) 123-4567",
    email: "john.smith@example.com",
    city: "San Francisco",
    zipCode: "94105",
  },
  {
    id: "2",
    name: "Johnson, Sarah",
    customerCode: "SJ0023456",
    planName: "Unlimited Monthly",
    rechargeStatus: "Active",
    rechargeSite: "Ocean Avenue",
    joinDate: "2022-01-10",
    rechargeDate: "2023-06-10",
    lastUsedDate: "2023-06-14",
    monthsAsMember: 17,
    visitCount: 85,
    averageVisitsPerMonth: 5,
    vehicleColor: "Red",
    phoneNumber: "(555) 234-5678",
    email: "sarah.johnson@example.com",
    city: "San Francisco",
    zipCode: "94110",
  },
  {
    id: "3",
    name: "Williams, Robert",
    customerCode: "RW0034567",
    planName: "Basic Monthly",
    rechargeStatus: "Inactive",
    rechargeSite: "Market Street",
    joinDate: "2022-05-22",
    rechargeDate: "2023-05-22",
    lastUsedDate: "2023-05-15",
    monthsAsMember: 13,
    visitCount: 26,
    averageVisitsPerMonth: 2,
    vehicleColor: "Black",
    phoneNumber: "(555) 345-6789",
    email: "robert.williams@example.com",
    city: "Oakland",
    zipCode: "94611",
  },
  {
    id: "4",
    name: "Brown, Jessica",
    customerCode: "JB0045678",
    planName: "Annual Prepay",
    rechargeStatus: "Active",
    rechargeSite: "Broadway",
    joinDate: "2021-08-05",
    rechargeDate: "2023-08-05",
    lastUsedDate: "2023-06-12",
    monthsAsMember: 22,
    visitCount: 110,
    averageVisitsPerMonth: 5,
    vehicleColor: "Silver",
    phoneNumber: "(555) 456-7890",
    email: "jessica.brown@example.com",
    city: "Berkeley",
    zipCode: "94704",
  },
  {
    id: "5",
    name: "Jones, Michael",
    customerCode: "MJ0056789",
    planName: "Premium Monthly",
    rechargeStatus: "Pending",
    rechargeSite: "Valencia Street",
    joinDate: "2022-11-18",
    rechargeDate: "2023-06-18",
    lastUsedDate: "2023-06-01",
    monthsAsMember: 7,
    visitCount: 21,
    averageVisitsPerMonth: 3,
    vehicleColor: "White",
    phoneNumber: "(555) 567-8901",
    email: "michael.jones@example.com",
    city: "San Jose",
    zipCode: "95113",
  },
  {
    id: "6",
    name: "Miller, David",
    customerCode: "DM0067890",
    planName: "Unlimited Monthly",
    rechargeStatus: "Active",
    rechargeSite: "Fillmore Street",
    joinDate: "2021-12-03",
    rechargeDate: "2023-06-03",
    lastUsedDate: "2023-06-13",
    monthsAsMember: 18,
    visitCount: 72,
    averageVisitsPerMonth: 4,
    vehicleColor: "Green",
    phoneNumber: "(555) 678-9012",
    email: "david.miller@example.com",
    city: "San Francisco",
    zipCode: "94117",
  },
  {
    id: "7",
    name: "Wilson, Jennifer",
    customerCode: "JW0078901",
    planName: "Basic Monthly",
    rechargeStatus: "Active",
    rechargeSite: "Divisadero Street",
    joinDate: "2022-09-27",
    rechargeDate: "2023-06-27",
    lastUsedDate: "2023-06-15",
    monthsAsMember: 9,
    visitCount: 18,
    averageVisitsPerMonth: 2,
    vehicleColor: "Gray",
    phoneNumber: "(555) 789-0123",
    email: "jennifer.wilson@example.com",
    city: "San Francisco",
    zipCode: "94117",
  },
  {
    id: "8",
    name: "Moore, Christopher",
    customerCode: "CM0089012",
    planName: "Premium Monthly",
    rechargeStatus: "Active",
    rechargeSite: "Mission Street",
    joinDate: "2021-10-12",
    rechargeDate: "2023-06-12",
    lastUsedDate: "2023-06-09",
    monthsAsMember: 20,
    visitCount: 80,
    averageVisitsPerMonth: 4,
    vehicleColor: "Blue",
    phoneNumber: "(555) 890-1234",
    email: "christopher.moore@example.com",
    city: "San Francisco",
    zipCode: "94110",
  },
  {
    id: "9",
    name: "Taylor, Elizabeth",
    customerCode: "ET0090123",
    planName: "Annual Prepay",
    rechargeStatus: "Active",
    rechargeSite: "Columbus Avenue",
    joinDate: "2022-02-08",
    rechargeDate: "2023-02-08",
    lastUsedDate: "2023-06-05",
    monthsAsMember: 16,
    visitCount: 64,
    averageVisitsPerMonth: 4,
    vehicleColor: "Black",
    phoneNumber: "(555) 901-2345",
    email: "elizabeth.taylor@example.com",
    city: "San Francisco",
    zipCode: "94133",
  },
  {
    id: "10",
    name: "Anderson, Thomas",
    customerCode: "TA0101234",
    planName: "Unlimited Monthly",
    rechargeStatus: "Inactive",
    rechargeSite: "Geary Boulevard",
    joinDate: "2022-04-29",
    rechargeDate: "2023-04-29",
    lastUsedDate: "2023-04-15",
    monthsAsMember: 14,
    visitCount: 70,
    averageVisitsPerMonth: 5,
    vehicleColor: "Red",
    phoneNumber: "(555) 012-3456",
    email: "thomas.anderson@example.com",
    city: "San Francisco",
    zipCode: "94118",
  },
];

// Column visibility state type
type ColumnVisibilityState = {
  name: boolean;
  customerCode: boolean;
  planName: boolean;
  rechargeStatus: boolean;
  rechargeSite: boolean;
  joinDate: boolean;
  rechargeDate: boolean;
  lastUsedDate: boolean;
  monthsAsMember: boolean;
  visitCount: boolean;
  averageVisitsPerMonth: boolean;
  vehicleColor: boolean;
  phoneNumber: boolean;
  email: boolean;
  city: boolean;
  zipCode: boolean;
};

// Format date to MM/DD/YYYY
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });
};

// Helper function to format column headers
const formatColumnHeader = (key: string) => {
  const headers: Record<string, string> = {
    name: "Name",
    customerCode: "Customer Code",
    planName: "Plan",
    rechargeStatus: "Status",
    rechargeSite: "Recharge Site",
    joinDate: "Join Date",
    rechargeDate: "Recharge Date",
    lastUsedDate: "Last Used",
    monthsAsMember: "Months Member",
    visitCount: "Visit Count",
    averageVisitsPerMonth: "Avg Visits/Month",
    vehicleColor: "Vehicle Color",
    phoneNumber: "Phone",
    email: "Email",
    city: "City",
    zipCode: "Zip Code"
  };
  return headers[key] || key;
};

// Helper function to format cell content
const formatCellContent = (key: keyof Member, value: any) => {
  if (value === null || value === undefined) return "-";

  switch (key) {
    case "rechargeStatus":
      return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium 
          ${value === 'Active' ? 'bg-green-100 text-green-800' : 
            value === 'Inactive' ? 'bg-red-100 text-red-800' : 
            'bg-yellow-100 text-yellow-800'}`}
        >
          {value}
        </span>
      );
    case "joinDate":
    case "rechargeDate":
    case "lastUsedDate":
      return formatDate(value);
    case "name":
      return <span className="font-medium">{value}</span>;
    default:
      return value;
  }
};

export default function MembersPage() {
  const [columnVisibility, setColumnVisibility] =
    React.useState<ColumnVisibilityState>({
      name: true,
      customerCode: true,
      planName: true,
      rechargeStatus: true,
      rechargeSite: true,
      joinDate: true,
      rechargeDate: true,
      lastUsedDate: true,
      monthsAsMember: true,
      visitCount: true,
      averageVisitsPerMonth: true,
      vehicleColor: true,
      phoneNumber: true,
      email: true,
      city: true,
      zipCode: true,
    });

  const [filterText, setFilterText] = React.useState("");

  const filteredMembers = React.useMemo(() => {
    if (!filterText) return mockMembers;
    const lowerFilter = filterText.toLowerCase();
    return mockMembers.filter((member) => {
      return (
        member.name.toLowerCase().includes(lowerFilter) ||
        member.customerCode.toLowerCase().includes(lowerFilter) ||
        member.email.toLowerCase().includes(lowerFilter) ||
        member.phoneNumber.includes(filterText)
      );
    });
  }, [filterText]);

  const handleExportCSV = () => {
    // In a real application, this would generate and download a CSV file
    alert("CSV export functionality would be implemented here.");
  };

  return (
    <div className="space-y-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Members</h1>
          <p className="text-muted-foreground">Manage and view all members</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <DownloadIcon className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Search and Column Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Filter members..."
            className="pl-8 w-full"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuCheckboxItem
              checked={columnVisibility.name}
              onCheckedChange={(checked) =>
                setColumnVisibility((prev) => ({ ...prev, name: checked }))
              }
            >
              Name
            </DropdownMenuCheckboxItem>
            {/* ... existing column visibility items ... */}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Members Table */}
      <Card>
        <CardContent className="p-6">
          <Table>
            <TableHeader>
              <TableRow className="border-b-0">
                {Object.entries(columnVisibility).map(([key, isVisible]) =>
                  isVisible ? (
                    <TableHead 
                      key={key}
                      className="text-left whitespace-nowrap text-lg font-medium px-8 py-6 text-muted-foreground"
                    >
                      {formatColumnHeader(key)}
                    </TableHead>
                  ) : null
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} className="hover:bg-muted/50">
                  {Object.entries(columnVisibility).map(([key, isVisible]) =>
                    isVisible ? (
                      <TableCell 
                        key={key}
                        className="whitespace-nowrap text-lg px-8 py-6"
                      >
                        {formatCellContent(key as keyof Member, member[key as keyof Member])}
                      </TableCell>
                    ) : null
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 