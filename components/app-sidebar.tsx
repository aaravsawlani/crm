"use client"

import * as React from "react"
import {
  Users,
  AreaChart,
  MessagesSquare,
  Send,
  Inbox,
  Settings,
  LogOut,
  ClipboardList,
  Search
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { cn } from "@/lib/utils"

// Override sidebar width constants
const CUSTOM_SIDEBAR_WIDTH = "19rem"       // Moderate width for expanded sidebar
const CUSTOM_SIDEBAR_WIDTH_ICON = "5rem"   // Adjusted width for collapsed sidebar

// Define custom styles for the sidebar
const customSidebarStyles = {
  "--sidebar-width": CUSTOM_SIDEBAR_WIDTH,
  "--sidebar-width-icon": CUSTOM_SIDEBAR_WIDTH_ICON,
} as React.CSSProperties;

// Define custom styles for larger text and icons
const customIconStyles = `
  /* Base styles for the sidebar */
  .app-sidebar {
    transition: width 0.2s ease-in-out;
  }

  /* Expanded sidebar styles */
  .app-sidebar [data-sidebar="menu-button"] {
    font-size: 1rem;
    padding: 0.75rem 1rem;
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.75rem;
  }
  
  .app-sidebar [data-sidebar="menu-button"] > svg {
    width: 1.25rem;
    height: 1.25rem;
    min-width: 1.25rem;
    min-height: 1.25rem;
  }

  /* Collapsed sidebar styles */
  .app-sidebar[data-state="collapsed"] {
    width: var(--sidebar-width-icon) !important;
  }

  .app-sidebar[data-state="collapsed"] [data-sidebar="menu-button"] {
    padding: 0.875rem 0;
    justify-content: center;
    height: auto;
  }

  .app-sidebar[data-state="collapsed"] [data-sidebar="menu-button"] > svg {
    width: 1.75rem !important;
    height: 1.75rem !important;
    min-width: 1.75rem !important;
    min-height: 1.75rem !important;
    margin: 0 !important;
  }

  /* Hide text and chevrons in collapsed mode */
  .app-sidebar[data-state="collapsed"] [data-sidebar="menu-button"] > span,
  .app-sidebar[data-state="collapsed"] [data-sidebar="menu-button"] .chevron-icon,
  .app-sidebar[data-state="collapsed"] [data-sidebar="header"] span {
    display: none;
  }

  /* Header styles */
  .app-sidebar [data-sidebar="header"] a {
    font-size: 1.25rem;
    padding: 1rem;
    display: flex;
    align-items: center;
  }

  .app-sidebar[data-state="collapsed"] [data-sidebar="header"] a {
    justify-content: center;
    padding: 1rem 0;
  }

  /* Submenu and active state styles */
  .app-sidebar [data-sidebar="menu-sub-button"],
  .app-sidebar .sidebar-menu-sub-button {
    font-size: 0.9rem !important;
    padding-left: 1rem;
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
  }

  .app-sidebar [data-sidebar="menu-sub-item"] a {
    font-size: 0.9rem !important;
  }

  .app-sidebar [data-sidebar="menu-button"][data-active="true"] {
    background-color: var(--accent);
  }

  /* Hover effects */
  .app-sidebar [data-sidebar="menu-button"]:hover {
    background-color: var(--accent);
    opacity: 0.8;
  }
`;

// Define CRM Navigation Items
const crmNavItems = [
  {
    title: "Member Lookup",
    url: "/members/lookup",
    icon: Search,
  },
  {
    title: "Members List",
    url: "/members",
    icon: ClipboardList,
  },
  {
    title: "Live Analytics",
    url: "/analytics",
    icon: AreaChart,
    items: [
      { title: "Today", url: "/analytics/today" },
      { title: "Marketing", url: "/analytics/marketing" },
      { title: "Retail Wash", url: "/analytics/retail-wash" },
      { title: "Overview", url: "/analytics/overview" },
      { title: "Online Sales", url: "/analytics/online-sales" },
      { title: "Members", url: "/analytics/members" },
      { title: "CC Decline", url: "/analytics/cc-decline" },
      { title: "Detail Services", url: "/analytics/detail-services" },
    ],
  },
  {
    title: "Customer Segmentation",
    url: "/segmentation",
    icon: Users,
    items: [
      { title: "View Segments", url: "/segmentation/view" },
      { title: "Create Segment", url: "/segmentation/create" },
    ],
  },
  {
    title: "SMS + Email Flows",
    url: "/flows",
    icon: MessagesSquare,
    items: [
      { title: "View Flows", url: "/flows/view" },
      { title: "Create Flow", url: "/flows/create" },
      { title: "Templates", url: "/flows/templates" },
    ],
  },
  {
    title: "Blast SMS",
    url: "/blast",
    icon: Send,
    items: [
      { title: "Send Blast", url: "/blast/send" },
      { title: "History", url: "/blast/history" },
    ],
  },
  {
    title: "Email / SMS Inbox",
    url: "/inbox",
    icon: Inbox,
    items: [
      { title: "View Inbox", url: "/inbox/view" },
    ],
  },
]

// Define User Nav Items (optional, for footer)
const userNavItems = [
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Log out", url: "/logout", icon: LogOut },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // You might want to fetch actual user data here later
  const user = { 
    name: "User Name", 
    email: "user@example.com",
    avatar: "/placeholder-avatar.jpg"
  } // Placeholder user

  // Add custom styles to the document
  React.useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = customIconStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  return (
    <Sidebar 
      collapsible="icon" 
      className="app-sidebar"
      style={customSidebarStyles}
      {...props}
    >
      <SidebarHeader>
        <Link href="/" className="font-semibold text-lg px-4 py-2 block">
          <span>Car Wash CRM</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={crmNavItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} items={userNavItems} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
