"use client";

import { type LucideIcon } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "react-router";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url?: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  const location = useLocation();
  return items.map((item) => (
    <SidebarGroup key={item.title}>
      <SidebarGroupLabel className="px-2 m-0 text-sm font-semibold text-gray-800 dark:text-gray-100">
        {item.title}
      </SidebarGroupLabel>
      <SidebarMenu className="gap-0 m-0 p-0">
        {item.items?.length
          ? item.items.map((i) => (
              <SidebarMenuItem
                key={i.title}
                className={`p-2 rounded-lg ${location.pathname.endsWith(i.url) ? "bg-gray-100 dark:bg-background font-medium" : ""}`}
              >
                <Link to={i.url} className="text-sm">
                  {i.title}
                </Link>
              </SidebarMenuItem>
            ))
          : null}
      </SidebarMenu>
    </SidebarGroup>
  ));
}
