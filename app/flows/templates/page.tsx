"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Workflow,
  Users,
  Clock,
  MessageSquare,
  Mail,
  Copy,
  Play,
  Search,
  Filter,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Mock data for flow templates
const mockTemplates = [
  {
    id: "1",
    name: "Welcome Series",
    description: "A comprehensive onboarding flow for new members",
    category: "Onboarding",
    audience: "New Members",
    steps: 5,
    channels: ["email", "sms"],
    duration: "7 days",
    useCases: ["New member onboarding", "First wash experience", "Membership benefits"],
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
    description: "Re-engage members who haven't visited in a while",
    category: "Retention",
    audience: "At Risk Members",
    steps: 3,
    channels: ["email"],
    duration: "5 days",
    useCases: ["Member retention", "Re-engagement", "Special offers"],
    items: [
      { type: "email", delay: "0", subject: "We Miss You!" },
      { type: "delay", value: 2, unit: "days" },
      { type: "email", delay: "2 days", subject: "Special Offer Just for You" },
    ],
  },
  {
    id: "3",
    name: "Monthly Newsletter",
    description: "Regular updates and promotions for all members",
    category: "Marketing",
    audience: "All Members",
    steps: 1,
    channels: ["email"],
    duration: "1 day",
    useCases: ["Monthly updates", "Promotions", "News"],
    items: [
      { type: "email", delay: "0", subject: "Monthly Newsletter" },
    ],
  },
  {
    id: "4",
    name: "Service Reminder",
    description: "Remind members about upcoming service appointments",
    category: "Service",
    audience: "Scheduled Members",
    steps: 2,
    channels: ["sms"],
    duration: "2 days",
    useCases: ["Appointment reminders", "Service scheduling"],
    items: [
      { type: "sms", delay: "0", content: "Your wash is scheduled for tomorrow!" },
      { type: "delay", value: 1, unit: "day" },
      { type: "sms", delay: "1 day", content: "Your appointment is in 2 hours" },
    ],
  },
];

const TemplateCard = ({ template }: { template: typeof mockTemplates[0] }) => {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg">{template.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </div>
          <Badge variant="secondary">{template.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{template.audience}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{template.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Workflow className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">{template.steps} steps</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {template.channels.map((channel) => (
              <Badge key={channel} variant="outline" className="flex items-center gap-1">
                {channel === "email" ? (
                  <Mail className="h-3 w-3" />
                ) : (
                  <MessageSquare className="h-3 w-3" />
                )}
                {channel.toUpperCase()}
              </Badge>
            ))}
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Use Cases</h4>
            <div className="flex flex-wrap gap-2">
              {template.useCases.map((useCase) => (
                <Badge key={useCase} variant="secondary">
                  {useCase}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh]">
                <DialogHeader>
                  <DialogTitle>{template.name}</DialogTitle>
                  <DialogDescription>{template.description}</DialogDescription>
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
                            <span>{template.audience}</span>
                          </div>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm font-medium">Timing</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>Duration: {template.duration}</span>
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
                          {template.items.map((item, index) => (
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
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>
            <Button size="sm">
              <Copy className="h-4 w-4 mr-2" />
              Use Template
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function FlowTemplatesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [categoryFilter, setCategoryFilter] = React.useState("all");

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch = template.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || template.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold">Flow Templates</h1>
          <p className="text-sm text-muted-foreground">
            Browse and use pre-built flow templates
          </p>
        </div>
        <Button>
          <Workflow className="h-4 w-4 mr-2" />
          Create Custom Flow
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Onboarding">Onboarding</SelectItem>
            <SelectItem value="Retention">Retention</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
            <SelectItem value="Service">Service</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredTemplates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
} 