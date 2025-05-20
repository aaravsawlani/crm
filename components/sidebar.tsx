"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  Users,
  AreaChart,
  MessagesSquare,
  Mail,
  Send,
  Inbox,
  History,
  Workflow,
  ListTodo,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";

const Sidebar = () => {
  const router = useRouter();

  const handleKeyDown = (event: React.KeyboardEvent, path: string) => {
    if (event.key === "Enter" || event.key === " ") {
      // Navigate on Enter or Space key press
      // This requires handling navigation appropriately, perhaps using next/router
      // For simplicity, we'll just log it here.
      console.log(`Navigate to ${path}`);
    }
  };

  return (
    <aside className="w-64 bg-gray-100 p-4 border-r h-screen overflow-y-auto flex flex-col">
      <h2 className="text-xl font-semibold mb-6">Car Wash CRM</h2>
      <nav className="flex flex-col space-y-2 flex-grow">
        <Link href="/member-lookup" passHref>
          <Button
            variant="ghost"
            className="w-full justify-start"
            aria-label="Member Lookup"
            tabIndex={0}
            onKeyDown={(e) => handleKeyDown(e, "/member-lookup")}
          >
            <Users className="mr-2 h-4 w-4" />
            Member Lookup
          </Button>
        </Link>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center">
                <AreaChart className="mr-2 h-4 w-4" />
                Live Analytics
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-6 flex flex-col space-y-1">
              {/* Add specific links for Live Analytics here if needed */}
              <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                Overview
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                Sales Trends
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Customer Segmentation
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-6 flex flex-col space-y-1">
              <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                View Segments
              </Button>
              <Button variant="ghost" className="w-full justify-start h-8 text-sm">
                Create Segment
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center">
                <MessagesSquare className="mr-2 h-4 w-4" />
                SMS + Email Flows
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-6 flex flex-col space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/flows/create")}
              >
                <Workflow className="mr-2 h-4 w-4" />
                Create Flow
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/flows/view")}
              >
                <ListTodo className="mr-2 h-4 w-4" />
                View Flows
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/flows/templates")}
              >
                <FileText className="mr-2 h-4 w-4" />
                Flow Templates
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center">
                <Send className="mr-2 h-4 w-4" />
                Blast SMS
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-6 flex flex-col space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/blast/send")}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Blast
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/blast/history")}
              >
                <History className="mr-2 h-4 w-4" />
                Blast History
              </Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5">
            <AccordionTrigger className="hover:no-underline">
              <span className="flex items-center">
                <Inbox className="mr-2 h-4 w-4" />
                Email / SMS Inbox
              </span>
            </AccordionTrigger>
            <AccordionContent className="pl-6 flex flex-col space-y-1">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/inbox/view")}
              >
                <Inbox className="mr-2 h-4 w-4" />
                View Inbox
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </nav>
      {/* Optional: Add footer or user profile section here */}
    </aside>
  );
};

export default Sidebar; 