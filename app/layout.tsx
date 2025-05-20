import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { AppSidebar } from "@/components/app-sidebar";
import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Car Wash CRM",
  description: "CRM for Car Wash Businesses",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${dmSans.className} flex h-screen overflow-hidden`}>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset className="flex-1 overflow-y-auto">
            <main className="min-h-screen w-full">
              <div className="relative w-full p-8 transition-all duration-200 ease-in-out peer-data-[state=expanded]:ml-[19rem] peer-data-[state=collapsed]:ml-[6rem]">
                {children}
              </div>
            </main>
          </SidebarInset>
        </SidebarProvider>
      </body>
    </html>
  );
} 