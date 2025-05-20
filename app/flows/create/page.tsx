"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Plus,
  Trash2,
  Save,
  Info,
  ArrowLeft,
  Mail,
  MessageSquare,
  Clock,
  ChevronUp,
  ChevronDown,
  Copy,
  Settings,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type FlowItem = {
  id: string;
  type: "email" | "sms" | "delay";
  content?: string;
  subject?: string;
  delayValue?: number;
  delayUnit?: "hours" | "days";
  order: number;
};

type FlowSettings = {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  timezone: string;
  active: boolean;
  allowUnsubscribe: boolean;
  maxEmailsPerDay: number;
  maxSMSPerDay: number;
};

const FlowItem = ({
  item,
  onUpdate,
  onDelete,
  onMove,
  isFirst,
  isLast,
}: {
  item: FlowItem;
  onUpdate: (updatedItem: FlowItem) => void;
  onDelete: () => void;
  onMove: (direction: "up" | "down") => void;
  isFirst: boolean;
  isLast: boolean;
}) => {
  const renderContent = () => {
    switch (item.type) {
      case "email":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Subject</Label>
              <Input
                value={item.subject}
                onChange={(e) => onUpdate({ ...item, subject: e.target.value })}
                placeholder="Enter email subject..."
              />
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea
                value={item.content}
                onChange={(e) => onUpdate({ ...item, content: e.target.value })}
                placeholder="Enter email content..."
                className="min-h-[200px]"
              />
            </div>
          </div>
        );
      case "sms":
        return (
          <div className="space-y-2">
            <Label>Message</Label>
            <Textarea
              value={item.content}
              onChange={(e) => onUpdate({ ...item, content: e.target.value })}
              placeholder="Enter SMS message..."
              className="min-h-[100px]"
            />
            <p className="text-xs text-muted-foreground">
              {item.content?.length || 0} characters
            </p>
          </div>
        );
      case "delay":
        return (
          <div className="flex items-center gap-4">
            <div className="space-y-2">
              <Label>Delay</Label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={item.delayValue}
                  onChange={(e) =>
                    onUpdate({ ...item, delayValue: parseInt(e.target.value) })
                  }
                  className="w-24"
                  min={1}
                />
                <Select
                  value={item.delayUnit}
                  onValueChange={(value) =>
                    onUpdate({ ...item, delayUnit: value as "hours" | "days" })
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hours">Hours</SelectItem>
                    <SelectItem value="days">Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Card className="relative">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">
              {item.type === "email" && <Mail className="h-3 w-3 mr-1" />}
              {item.type === "sms" && <MessageSquare className="h-3 w-3 mr-1" />}
              {item.type === "delay" && <Clock className="h-3 w-3 mr-1" />}
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
            {item.type === "delay" && (
              <span className="text-sm text-muted-foreground">
                {item.delayValue} {item.delayUnit}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMove("up")}
                    disabled={isFirst}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move up</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onMove("down")}
                    disabled={isLast}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Move down</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete()}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Delete</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        {renderContent()}
      </CardContent>
    </Card>
  );
};

const FlowSettingsDialog = ({
  settings,
  onUpdate,
}: {
  settings: FlowSettings;
  onUpdate: (settings: FlowSettings) => void;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Flow Settings</DialogTitle>
          <DialogDescription>
            Configure your flow's behavior and limits
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Start Date (Optional)</Label>
            <Input
              type="datetime-local"
              value={settings.startDate}
              onChange={(e) =>
                onUpdate({ ...settings, startDate: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>End Date (Optional)</Label>
            <Input
              type="datetime-local"
              value={settings.endDate}
              onChange={(e) => onUpdate({ ...settings, endDate: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label>Timezone</Label>
            <Select
              value={settings.timezone}
              onValueChange={(value) =>
                onUpdate({ ...settings, timezone: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="America/New_York">Eastern Time</SelectItem>
                <SelectItem value="America/Chicago">Central Time</SelectItem>
                <SelectItem value="America/Denver">Mountain Time</SelectItem>
                <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <Label>Active</Label>
            <Switch
              checked={settings.active}
              onCheckedChange={(checked) =>
                onUpdate({ ...settings, active: checked })
              }
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Allow Unsubscribe</Label>
            <Switch
              checked={settings.allowUnsubscribe}
              onCheckedChange={(checked) =>
                onUpdate({ ...settings, allowUnsubscribe: checked })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Max Emails Per Day</Label>
            <Input
              type="number"
              value={settings.maxEmailsPerDay}
              onChange={(e) =>
                onUpdate({
                  ...settings,
                  maxEmailsPerDay: parseInt(e.target.value),
                })
              }
              min={1}
            />
          </div>
          <div className="space-y-2">
            <Label>Max SMS Per Day</Label>
            <Input
              type="number"
              value={settings.maxSMSPerDay}
              onChange={(e) =>
                onUpdate({
                  ...settings,
                  maxSMSPerDay: parseInt(e.target.value),
                })
              }
              min={1}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function CreateFlowPage() {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const [items, setItems] = React.useState<FlowItem[]>([]);
  const [settings, setSettings] = React.useState<FlowSettings>({
    name: "",
    description: "",
    timezone: "UTC",
    active: true,
    allowUnsubscribe: true,
    maxEmailsPerDay: 3,
    maxSMSPerDay: 2,
  });

  const handleAddItem = (type: "email" | "sms" | "delay") => {
    const newItem: FlowItem = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      order: items.length,
    };
    setItems([...items, newItem]);
  };

  const handleUpdateItem = (updatedItem: FlowItem) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleMoveItem = (id: string, direction: "up" | "down") => {
    const index = items.findIndex((item) => item.id === id);
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === items.length - 1)
    ) {
      return;
    }

    const newItems = [...items];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setItems(newItems);
  };

  const handleSaveFlow = () => {
    const formData = form.getValues();
    console.log("Saving flow:", {
      ...formData,
      items,
      settings,
    });
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-semibold">New Flow</h1>
        </div>
        <div className="flex items-center gap-2">
          <FlowSettingsDialog settings={settings} onUpdate={setSettings} />
          <Button onClick={handleSaveFlow}>
            <Save className="h-4 w-4 mr-2" />
            Save Flow
          </Button>
        </div>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Flow Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter flow name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter flow description..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-medium">Flow Items</h2>
                  <p className="text-sm text-muted-foreground">
                    Add and arrange your flow items
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddItem("email")}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Add Email
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddItem("sms")}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Add SMS
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAddItem("delay")}
                  >
                    <Clock className="h-4 w-4 mr-2" />
                    Add Delay
                  </Button>
                </div>
              </div>

              {items.length > 0 ? (
                <div className="space-y-4">
                  {items.map((item, index) => (
                    <FlowItem
                      key={item.id}
                      item={item}
                      onUpdate={handleUpdateItem}
                      onDelete={() => handleDeleteItem(item.id)}
                      onMove={(direction) => handleMoveItem(item.id, direction)}
                      isFirst={index === 0}
                      isLast={index === items.length - 1}
                    />
                  ))}
                </div>
              ) : (
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>No items added</AlertTitle>
                  <AlertDescription>
                    Add email, SMS, or delay items to create your flow
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      </Form>
    </div>
  );
} 