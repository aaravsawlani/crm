"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Plus,
  Search,
  MoreVertical,
  Users,
  Edit,
  Copy,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

// Mock data for segments
const mockSegments = [
  {
    id: "1",
    name: "High Value Members",
    description: "Members with high visit frequency and spending",
    createdAt: "2024-03-15",
    memberCount: 1250,
    filters: [
      {
        property: "Membership average visits",
        operator: "is greater than",
        value: "4",
        valueType: "number",
      },
      {
        property: "Membership plan price",
        operator: "is greater than",
        value: "50",
        valueType: "number",
      },
    ],
  },
  {
    id: "2",
    name: "At Risk Members",
    description: "Members showing signs of potential churn",
    createdAt: "2024-03-14",
    memberCount: 320,
    filters: [
      {
        property: "Membership recent visits",
        operator: "is less than",
        value: "1",
        valueType: "number",
      },
      {
        property: "Membership last wash date",
        operator: "is before",
        value: "2024-02-15",
        valueType: "date",
      },
    ],
  },
  {
    id: "3",
    name: "New Basic Members",
    description: "Recently joined basic plan members",
    createdAt: "2024-03-13",
    memberCount: 450,
    filters: [
      {
        property: "Membership join date",
        operator: "is after",
        value: "2024-01-01",
        valueType: "date",
      },
      {
        property: "Membership plan type",
        operator: "is one of",
        value: "Basic",
        valueType: "text",
      },
    ],
  },
];

const SegmentCard = ({ segment }: { segment: typeof mockSegments[0] }) => {
  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">{segment.name}</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              {segment.description}
            </p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="h-4 w-4 mr-2" />
                Duplicate
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span>{segment.memberCount.toLocaleString()} members</span>
          </div>
          <span className="text-muted-foreground">
            Created {new Date(segment.createdAt).toLocaleDateString()}
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">Filters:</p>
          <div className="space-y-1.5">
            {segment.filters.map((filter, index) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-sm text-muted-foreground"
              >
                <Badge variant="secondary" className="font-normal">
                  {filter.property}
                </Badge>
                <span>{filter.operator}</span>
                <Badge variant="outline" className="font-normal">
                  {filter.value}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function ViewSegmentsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredSegments = React.useMemo(() => {
    if (!searchQuery) return mockSegments;
    const query = searchQuery.toLowerCase();
    return mockSegments.filter(
      (segment) =>
        segment.name.toLowerCase().includes(query) ||
        segment.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Audience Segments</h1>
        <Link href="/segmentation/create">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Segment
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search segments..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredSegments.map((segment) => (
            <SegmentCard key={segment.id} segment={segment} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
} 