"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  ArchiveX,
  Archive,
  Trash2,
  Clock,
  MoreVertical,
  Search,
  Mail,
  MessageSquare,
  Reply,
  CornerUpLeft,
  CornerUpRight,
} from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

// Mock data for emails
const mockEmails = [
  {
    id: 1,
    sender: "William Smith",
    email: "williamsmith@example.com",
    subject: "Meeting Tomorrow",
    preview: "Hi, let's have a meeting tomorrow to discuss the project. I've been reviewing the project details and have some ideas I'd like to share...",
    timestamp: "Oct 22, 2023, 9:00:00 AM",
    tags: ["meeting", "work", "important"],
    read: false,
  },
  {
    id: 2,
    sender: "Alice Smith",
    email: "alicesmith@example.com",
    subject: "Re: Project Update",
    preview: "Thank you for the project update. It looks great! I've gone through the report, and the progress is impressive. The team has done a...",
    timestamp: "over 1 year ago",
    tags: ["work", "important"],
    read: true,
  },
  {
    id: 3,
    sender: "Bob Johnson",
    email: "bjohnson@example.com",
    subject: "Weekend Plans",
    preview: "Any plans for the weekend? I was thinking of going hiking in the nearby mountains. It's been a while since we had some outdoor...",
    timestamp: "almost 2 years ago",
    tags: ["personal"],
    read: true,
  },
  {
    id: 4,
    sender: "Emily Davis",
    email: "emilydavis@example.com",
    subject: "Re: Question about Budget",
    preview: "I have a question about the budget for the upcoming project. It seems like there's a discrepancy in the allocation of resources. I've...",
    timestamp: "about 2 years ago",
    tags: ["work", "budget"],
    read: true,
  },
];

// Mock data for SMS
const mockSMS = [
  {
    id: 1,
    sender: "+1 (555) 123-4567",
    name: "John Doe",
    preview: "Your appointment is confirmed for tomorrow at 2 PM",
    timestamp: "Just now",
    read: false,
  },
  {
    id: 2,
    sender: "+1 (555) 987-6543",
    name: "Car Wash",
    preview: "Your vehicle is ready for pickup",
    timestamp: "2 hours ago",
    read: true,
  },
];

type Message = {
  id: number;
  sender: string;
  preview: string;
  timestamp: string;
  read: boolean;
  email?: string;
  subject?: string;
  tags?: string[];
  name?: string;
};

const MessageRow = ({ message, type }: { message: Message; type: "email" | "sms" }) => {
  const isEmail = type === "email";

  return (
    <div className={`flex items-start gap-4 p-4 hover:bg-accent/50 cursor-pointer border-b ${!message.read ? "bg-accent/20" : ""}`}>
      {isEmail ? (
        <Avatar className="mt-1">
          <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary font-medium">
            {message.sender.charAt(0).toUpperCase()}
          </div>
        </Avatar>
      ) : (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
          {(message.name || message.sender).charAt(0).toUpperCase()}
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <div className="font-medium truncate">
            {isEmail ? message.sender : (message.name || message.sender)}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground shrink-0">
            <span>{message.timestamp}</span>
          </div>
        </div>

        {isEmail && (
          <>
            <div className="text-sm text-muted-foreground">
              Reply-To: {message.email}
            </div>
            <div className="font-medium">{message.subject}</div>
          </>
        )}

        <div className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {message.preview}
        </div>

        {isEmail && message.tags && message.tags.length > 0 && (
          <div className="flex gap-2 mt-2">
            {message.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function InboxPage() {
  const [view, setView] = React.useState<"email" | "sms">("email");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredMessages = React.useMemo(() => {
    const messages = view === "email" ? mockEmails : mockSMS;
    if (!searchQuery) return messages;

    return messages.filter((message) => {
      const searchText = searchQuery.toLowerCase();
      if (view === "email") {
        const email = message as typeof mockEmails[0];
        return (
          email.sender.toLowerCase().includes(searchText) ||
          email.subject?.toLowerCase().includes(searchText) ||
          email.preview.toLowerCase().includes(searchText)
        );
      } else {
        const sms = message as typeof mockSMS[0];
        return (
          sms.sender.toLowerCase().includes(searchText) ||
          sms.name?.toLowerCase().includes(searchText) ||
          sms.preview.toLowerCase().includes(searchText)
        );
      }
    });
  }, [view, searchQuery]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10">
        <div className="p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Select value={view} onValueChange={(v) => setView(v as "email" | "sms")}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    <span>Email</span>
                  </div>
                </SelectItem>
                <SelectItem value="sms">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>SMS</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Inbox
              <Badge className="ml-auto" variant="secondary">128</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <ArchiveX className="h-4 w-4 mr-2" />
              Drafts
              <Badge className="ml-auto" variant="secondary">9</Badge>
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Reply className="h-4 w-4 mr-2" />
              Sent
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
              Trash
              <Badge className="ml-auto" variant="secondary">23</Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 w-[300px]"
                />
              </div>
              <Tabs defaultValue="all">
                <TabsList>
                  <TabsTrigger value="all">All mail</TabsTrigger>
                  <TabsTrigger value="unread">Unread</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <CornerUpLeft className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <CornerUpRight className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Clock className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Message List */}
        <ScrollArea className="flex-1">
          <div className="divide-y">
            {filteredMessages.map((message) => (
              <MessageRow
                key={message.id}
                message={message}
                type={view}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
} 