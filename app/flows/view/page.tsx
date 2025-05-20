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
  Mail,
  MessageSquare,
  MoreVertical,
  Play,
  Pause,
  Trash2,
  Copy,
  Edit,
  BarChart2,
  Users,
  Clock,
  Calendar,
  CheckCircle2,
  XCircle,
  AlertCircle,
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

// Mock data for flows
const mockFlows = [
  {
    id: "1",
    name: "Welcome Series",
    description: "New member onboarding flow",
    status: "active",
    channels: ["email", "sms"],
    audience: "New Basic Members",
    audienceCount: 320,
    steps: 5,
    lastSent: "2024-03-15T10:30:00",
    nextSend: "2024-03-16T09:00:00",
    stats: {
      totalSent: 1250,
      openRate: 0.78,
      clickRate: 0.45,
      replyRate: 0.12,
      unsubscribeRate: 0.02,
    },
    items: [
      { type: "email", delay: "0", subject: "Welcome to Our Wash Club!" },
      { type: "delay", value: 1, unit: "day" },
      { type: "sms", delay: "1 day", content: "Your first wash is on us!" },
      { type: "delay", value: 3, unit: "days" },
      { type: "email", delay: "4 days", subject: "How's your experience so far?" },
    ],
  },
  {
    id: "2",
    name: "At Risk Recovery",
    description: "Re-engage at-risk members",
    status: "paused",
    channels: ["email"],
    audience: "At Risk Members",
    audienceCount: 850,
    steps: 3,
    lastSent: "2024-03-10T14:15:00",
    nextSend: null,
    stats: {
      totalSent: 3200,
      openRate: 0.65,
      clickRate: 0.32,
      replyRate: 0.08,
      unsubscribeRate: 0.05,
    },
    items: [
      { type: "email", delay: "0", subject: "We Miss You!" },
      { type: "delay", value: 2, unit: "days" },
      { type: "email", delay: "2 days", subject: "Special Offer Just for You" },
    ],
  },
  {
    id: "3",
    name: "Monthly Newsletter",
    description: "Monthly updates and promotions",
    status: "active",
    channels: ["email"],
    audience: "All Members",
    audienceCount: 4500,
    steps: 1,
    lastSent: "2024-03-01T08:00:00",
    nextSend: "2024-04-01T08:00:00",
    stats: {
      totalSent: 13500,
      openRate: 0.82,
      clickRate: 0.38,
      replyRate: 0.15,
      unsubscribeRate: 0.01,
    },
    items: [
      { type: "email", delay: "0", subject: "Monthly Newsletter" },
    ],
  },
];

const FlowStatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    active: {
      label: "Active",
      variant: "success",
      icon: <Play className="h-3 w-3" />,
    },
    paused: {
      label: "Paused",
      variant: "warning",
      icon: <Pause className="h-3 w-3" />,
    },
    draft: {
      label: "Draft",
      variant: "secondary",
      icon: <Edit className="h-3 w-3" />,
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

const ChannelBadge = ({ channel }: { channel: string }) => {
  const icon = channel === "email" ? (
    <Mail className="h-3 w-3" />
  ) : (
    <MessageSquare className="h-3 w-3" />
  );

  return (
    <Badge variant="outline" className="flex items-center gap-1">
      {icon}
      {channel.toUpperCase()}
    </Badge>
  );
};

const FlowDetailsDialog = ({ flow }: { flow: typeof mockFlows[0] }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{flow.name}</DialogTitle>
          <DialogDescription>{flow.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[calc(90vh-120px)] pr-4">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Audience</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>{flow.audience}</span>
                    <Badge variant="secondary">
                      {flow.audienceCount.toLocaleString()} members
                    </Badge>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium">Schedule</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Last sent:</span>
                      <span className="font-medium">
                        {new Date(flow.lastSent).toLocaleString()}
                      </span>
                    </div>
                    {flow.nextSend && (
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>Next send:</span>
                        <span className="font-medium">
                          {new Date(flow.nextSend).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Flow Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {flow.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-4 p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{index + 1}</Badge>
                        {item.type === "email" && <Mail className="h-4 w-4" />}
                        {item.type === "sms" && <MessageSquare className="h-4 w-4" />}
                        {item.type === "delay" && <Clock className="h-4 w-4" />}
                      </div>
                      <div className="flex-1">
                        {item.type === "email" && (
                          <div className="space-y-1">
                            <div className="font-medium">{item.subject}</div>
                            <div className="text-sm text-muted-foreground">
                              Sent {item.delay} after previous step
                            </div>
                          </div>
                        )}
                        {item.type === "sms" && (
                          <div className="space-y-1">
                            <div className="font-medium">SMS Message</div>
                            <div className="text-sm text-muted-foreground">
                              {item.content}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Sent {item.delay} after previous step
                            </div>
                          </div>
                        )}
                        {item.type === "delay" && (
                          <div className="text-sm text-muted-foreground">
                            Wait {item.value} {item.unit}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Open Rate</span>
                      <span className="font-medium">
                        {(flow.stats.openRate * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Click Rate</span>
                      <span className="font-medium">
                        {(flow.stats.clickRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Reply Rate</span>
                      <span className="font-medium">
                        {(flow.stats.replyRate * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Unsubscribe Rate</span>
                      <span className="font-medium">
                        {(flow.stats.unsubscribeRate * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default function ViewFlowsPage() {
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredFlows = mockFlows.filter((flow) =>
    flow.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Flows</h1>
          <p className="text-sm text-muted-foreground">
            Manage your automated communication flows
          </p>
        </div>
        <Button>
          <Play className="h-4 w-4 mr-2" />
          Create Flow
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Input
          placeholder="Search flows..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />
        <Tabs defaultValue="all" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="paused">Paused</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Channels</TableHead>
              <TableHead>Audience</TableHead>
              <TableHead>Steps</TableHead>
              <TableHead>Last Sent</TableHead>
              <TableHead>Next Send</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredFlows.map((flow) => (
              <TableRow key={flow.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="font-medium">{flow.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {flow.description}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <FlowStatusBadge status={flow.status} />
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {flow.channels.map((channel) => (
                      <ChannelBadge key={channel} channel={channel} />
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span>{flow.audience}</span>
                    <Badge variant="secondary">
                      {flow.audienceCount.toLocaleString()}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell>{flow.steps}</TableCell>
                <TableCell>
                  {new Date(flow.lastSent).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {flow.nextSend
                    ? new Date(flow.nextSend).toLocaleDateString()
                    : "-"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FlowDetailsDialog flow={flow} />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
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