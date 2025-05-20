"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import Link from "next/link"
import { useRef, useEffect } from "react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Define the color palette for navigation items
const navColors: Record<string, string> = {
  "Member Lookup": "#2563eb",       // Blue
  "Members List": "#60a5fa",        // Light Blue
  "Live Analytics": "#22c55e",      // Green
  "Customer Segmentation": "#f472b6", // Neon Pink
  "SMS + Email Flows": "#ef4444",   // Red
  "Blast SMS": "#a855f7",           // Purple
  "Email / SMS Inbox": "#eab308"    // Yellow/Gold
}

// Custom styles for the nav icons
const NAV_ICON_STYLES = `
  .nav-icon {
    width: 1.25rem !important;
    height: 1.25rem !important;
    min-width: 1.25rem !important;
    min-height: 1.25rem !important;
  }
  
  [data-state="collapsed"] .nav-icon {
    width: 2.5rem !important;
    height: 2.5rem !important;
    min-width: 2.5rem !important;
    min-height: 2.5rem !important;
  }
  
  [data-state="collapsed"] .nav-menu-btn {
    display: flex;
    justify-content: center;
    padding: 1rem !important;
    height: 4rem !important;
  }
  
  /* Basic hover styles */
  [data-sidebar="menu-button"].nav-menu-btn:hover {
    background-color: var(--nav-color, currentColor) !important;
    color: white !important;
  }
`;

// Add some custom styles to the head to override the default hover styles
// This is needed because the default styles have high specificity
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    [data-sidebar="menu-button"].custom-menu-button {
      @apply hover:!bg-current hover:!bg-opacity-100 hover:!text-white;
    }
    [data-sidebar="menu-button"].custom-menu-button[data-state="open"] {
      @apply bg-transparent text-current;
    }
    .sidebar-menu-sub-button {
      @apply hover:!bg-current hover:!bg-opacity-100 hover:!text-white;
    }
  `;
  document.head.appendChild(style);
}

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  // Get the sidebar context to check if it's collapsed
  const { state } = useSidebar();
  const isCollapsed = state === "collapsed";
  
  // Add the custom styles to the document
  useEffect(() => {
    const styleEl = document.createElement('style');
    styleEl.textContent = NAV_ICON_STYLES;
    document.head.appendChild(styleEl);
    
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {items.map((item) => {
          // Get the color for this item or default to current text color
          const itemColor = navColors[item.title] || "currentColor";
          
          const activeHoverStyle = {
            "--hover-bg-color": itemColor,
            "--nav-color": itemColor,
            color: itemColor,
            backgroundColor: "transparent !important"
          } as React.CSSProperties;
          
          const hoverStyle = (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            target.style.backgroundColor = itemColor;
            target.style.color = "white";
          };
          
          const resetStyle = (e: React.MouseEvent) => {
            const target = e.currentTarget as HTMLElement;
            target.style.backgroundColor = "transparent";
            target.style.color = itemColor;
          };
          
          // Set icon size based on collapsed state
          const iconStyle = {
            width: isCollapsed ? '2.5rem' : '1.25rem',
            height: isCollapsed ? '2.5rem' : '1.25rem',
            minWidth: isCollapsed ? '2.5rem' : '1.25rem',
            minHeight: isCollapsed ? '2.5rem' : '1.25rem',
            color: "currentColor",
          };

          return item.items && item.items.length > 0 ? (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton 
                    tooltip={item.title} 
                    style={activeHoverStyle}
                    onMouseEnter={hoverStyle}
                    onMouseLeave={resetStyle}
                    className="nav-menu-btn"
                  >
                    {item.icon && (
                      <item.icon 
                        className="nav-icon" 
                        style={iconStyle}
                      />
                    )}
                    <span>{item.title}</span>
                    <ChevronRight className="transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90 chevron-icon w-4 h-4" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                          asChild 
                          style={activeHoverStyle}
                          onMouseEnter={hoverStyle}
                          onMouseLeave={resetStyle}
                        >
                          <Link href={subItem.url}>
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          ) : (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton 
                asChild 
                tooltip={item.title}
                style={activeHoverStyle}
                onMouseEnter={hoverStyle}
                onMouseLeave={resetStyle}
                className="nav-menu-btn"
              >
                <Link href={item.url}>
                  {item.icon && (
                    <item.icon 
                      className="nav-icon" 
                      style={iconStyle}
                    />
                  )}
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
