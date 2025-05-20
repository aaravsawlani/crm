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
  Send,
  Clock,
  Users,
  Mail,
  MessageSquare,
  Calendar,
  Info,
  ArrowLeft,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Mock data for audiences
const mockAudiences = [
  { id: "1", name: "High Value Members", count: 1250 },
  { id: "2", name: "At Risk Members", count: 850 },
  { id: "3", name: "New Basic Members", count: 320 },
  { id: "4", name: "Price Conscious Washers", count: 2100 },
  { id: "5", name: "Weekend Washers", count: 1800 },
];

type BlastFormData = {
  audience: string;
  channels: ("email" | "sms")[];
  subject?: string;
  content?: string;
  smsContent?: string;
  sendType: "now" | "scheduled";
  scheduledDate?: string;
  scheduledTime?: string;
};

const AudiencePreview = ({ audienceId }: { audienceId: string }) => {
  const audience = mockAudiences.find((a) => a.id === audienceId);
  if (!audience) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Users className="h-4 w-4" />
      <span>{audience.name}</span>
      <Badge variant="secondary">{audience.count.toLocaleString()} members</Badge>
    </div>
  );
};

const ContentPreview = ({ content }: { content: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Preview
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Content Preview</DialogTitle>
          <DialogDescription>
            This is how your message will appear to recipients
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 p-4 border rounded-lg bg-muted/50">
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default function SendBlastPage() {
  const form = useForm<BlastFormData>({
    defaultValues: {
      audience: "",
      channels: ["email"],
      subject: "",
      content: "",
      sendType: "now",
    },
  });

  const [isSending, setIsSending] = React.useState(false);
  const watchChannels = form.watch("channels");
  const watchSendType = form.watch("sendType");

  const handleSend = async (data: BlastFormData) => {
    setIsSending(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log("Sending blast:", data);
      // Handle success
    } catch (error) {
      console.error("Error sending blast:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-semibold">Send Blast</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSend)} className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="audience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Audience</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Choose an audience" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {mockAudiences.map((audience) => (
                            <SelectItem key={audience.id} value={audience.id}>
                              <div className="flex items-center gap-2">
                                <span>{audience.name}</span>
                                <Badge variant="secondary">
                                  {audience.count.toLocaleString()}
                                </Badge>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.watch("audience") && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Info className="h-4 w-4" />
                    <span>Selected audience:</span>
                    <AudiencePreview audienceId={form.watch("audience")} />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="channels"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Communication Channels</FormLabel>
                      <FormControl>
                        <div className="flex gap-4">
                          <Button
                            type="button"
                            variant={field.value.includes("email") ? "default" : "outline"}
                            onClick={() => {
                              const newChannels = field.value.includes("email")
                                ? field.value.filter((c) => c !== "email")
                                : [...field.value, "email"];
                              field.onChange(newChannels);
                            }}
                            className="flex-1"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                          <Button
                            type="button"
                            variant={field.value.includes("sms") ? "default" : "outline"}
                            onClick={() => {
                              const newChannels = field.value.includes("sms")
                                ? field.value.filter((c) => c !== "sms")
                                : [...field.value, "sms"];
                              field.onChange(newChannels);
                            }}
                            className="flex-1"
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            SMS
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchChannels.includes("email") && (
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Subject</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter email subject..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center justify-between">
                            <FormLabel>Email Content</FormLabel>
                            <ContentPreview content={field.value} />
                          </div>
                          <FormControl>
                            <Textarea
                              placeholder="Enter your email message..."
                              className="min-h-[200px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {watchChannels.includes("sms") && (
                  <FormField
                    control={form.control}
                    name="smsContent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>SMS Content</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter SMS message..."
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          {field.value?.length || 0} characters
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="sendType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>When to Send</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="now" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Send Now
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="scheduled" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Schedule for Later
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {watchSendType === "scheduled" && (
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="scheduledDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="scheduledTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button type="submit" disabled={isSending}>
              {isSending ? (
                <>
                  <Clock className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : watchSendType === "now" ? (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Now
                </>
              ) : (
                <>
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 