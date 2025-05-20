"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  MessageSquare,
  MoreVertical,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
  BarChart2,
  Copy,
  Trash2,
  Search,
  Filter,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for SMS history
const mockMessages = [
  {
    id: "1",
    content: "Your monthly wash subscription is expiring soon. Renew now to keep your benefits!",
    audience: "Expiring Members",
    audienceCount: 450,
    status: "completed",
    sentAt: "2024-03-15T10:30:00",
    completedAt: "2024-03-15T10:35:00",
    stats: {
      totalSent: 450,
      delivered: 445,
      failed: 5,
      replyRate: 0.12,
      optOutRate: 0.01,
    },
    replies: [
      {
        id: "1",
        content: "Thanks for the reminder! Just renewed.",
        timestamp: "2024-03-15T10:32:00",
      },
      {
        id: "2",
        content: "How do I renew?",
        timestamp: "2024-03-15T10:33:00",
      },
    ],
  },
  {
    id: "2",
    content: "Special offer: Get 20% off your next wash! Use code SPRING20",
    audience: "All Members",
    audienceCount: 2500,
    status: "completed",
    sentAt: "2024-03-10T14:15:00",
    completedAt: "2024-03-10T14:20:00",
    stats: {
      totalSent: 2500,
      delivered: 2480,
      failed: 20,
      replyRate: 0.08,
      optOutRate: 0.02,
    },
    replies: [
      {
        id: "1",
        content: "Great deal! Will use it today.",
        timestamp: "2024-03-10T14:16:00",
      },
    ],
  },
  {
    id: "3",
    content: "Your wash is complete! Come pick up your car within the next hour.",
    audience: "In-Store Customers",
    audienceCount: 15,
    status: "completed",
    sentAt: "2024-03-08T09:00:00",
    completedAt: "2024-03-08T09:01:00",
    stats: {
      totalSent: 15,
      delivered: 15,
      failed: 0,
      replyRate: 0.33,
      optOutRate: 0,
    },
    replies: [
      {
        id: "1",
        content: "On my way!",
        timestamp: "2024-03-08T09:02:00",
      },
      {
        id: "2",
        content: "Be there in 10",
        timestamp: "2024-03-08T09:03:00",
      },
    ],
  },
  {
    id: "4",
    content: "New location opening next week! Get 50% off your first wash.",
    audience: "Local Area",
    audienceCount: 1000,
    status: "scheduled",
    scheduledFor: "2024-03-20T08:00:00",
    stats: {
      totalSent: 0,
      delivered: 0,
      failed: 0,
      replyRate: 0,
      optOutRate: 0,
    },
    replies: [],
  },
];

const MessageStatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    completed: {
      label: "Completed",
      variant: "success",
      icon: <CheckCircle2 className="h-3 w-3" />,
    },
    scheduled: {
      label: "Scheduled",
      variant: "warning",
      icon: <Clock className="h-3 w-3" />,
    },
    failed: {
      label: "Failed",
      variant: "destructive",
      icon: <XCircle className="h-3 w-3" />,
    },
    sending: {
      label: "Sending",
      variant: "default",
      icon: <AlertCircle className="h-3 w-3" />,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];

  return (
    <Badge variant={config.variant as any} className="flex items-center gap-1">
      {config.icon}
      {config.label}
    </Badge>
  );
};

const MessageDetailsDialog = ({ message }: { message: typeof mockMessages[0] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>SMS Message Details</DialogTitle>
          <DialogDescription>
            Sent on {new Date(message.sentAt).toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Message Content</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm">{message.content}</p>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{message.audience}</span>
                    <Badge variant="secondary">
                      {message.audienceCount.toLocaleString()} recipients
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Timing</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Sent:</span>
                      <span className="font-medium">
                        {new Date(message.sentAt).toLocaleString()}
                      </span>
                    </div>
                    {message.completedAt && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Completed:</span>
                        <span className="font-medium">
                          {new Date(message.completedAt).toLocaleString()}
                        </span>
                      </div>
                    )}
                    {message.scheduledFor && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Scheduled for:</span>
                        <span className="font-medium">
                          {new Date(message.scheduledFor).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Total Sent</span>
                      <span className="font-medium">
                        {message.stats.totalSent.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Delivered</span>
                      <span className="font-medium">
                        {message.stats.delivered.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Failed</span>
                      <span className="font-medium">
                        {message.stats.failed.toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reply Rate</span>
                      <span className="font-medium">
                        {(message.stats.replyRate * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Opt-Out Rate</span>
                      <span className="font-medium">
                        {(message.stats.optOutRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {message.replies.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Replies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {message.replies.map((reply) => (
                      <div
                        key={reply.id}
                        className="flex items-start gap-4 p-3 border rounded-lg"
                      >
                        <MessageSquare className="h-4 w-4 mt-1 text-muted-foreground" />
                        <div className="flex-1">
                          <div className="text-sm">{reply.content}</div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(reply.timestamp).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default function BlastHistoryPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [dateFilter, setDateFilter] = React.useState("all");

  const filteredMessages = mockMessages.filter((message) => {
    const matchesSearch = message.content
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">SMS History</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your SMS message history
          </p>
        </div>
        <Button>
          <MessageSquare className="h-4 w-4 mr-2" />
          Send New Message
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search messages..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="scheduled">Scheduled</SelectItem>
            <SelectItem value="failed">Failed</SelectItem>
            <SelectItem value="sending">Sending</SelectItem>
          </SelectContent>
        </Select>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by date" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Time</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="week">This Week</SelectItem>
            <SelectItem value="month">This Month</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Content</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Sent</TableHead>
              <TableHead>Performance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.map((message) => (
              <TableRow key={message.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium line-clamp-2">{message.content}</div>
                    <div className="text-sm text-muted-foreground">
                      {message.audienceCount.toLocaleString()} recipients
                    </div>
                  </div>
                </TableCell>
                <TableCell>{message.audience}</TableCell>
                <TableCell>
                  <MessageStatusBadge status={message.status} />
                </TableCell>
                <TableCell>
                  {new Date(message.sentAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Delivered:</span>
                      <span className="font-medium">
                        {message.stats.delivered.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Replies:</span>
                      <span className="font-medium">
                        {(message.stats.replyRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <MessageDetailsDialog message={message} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Copy className="h-4 w-4 mr-2" />
                          Duplicate
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart2 className="h-4 w-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 