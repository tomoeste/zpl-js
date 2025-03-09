import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";

const docPages = {
  navMain: [
    {
      title: "Getting Started",
      items: [
        {
          title: "Introduction",
          url: "/docs/getting-started/introduction",
        },
        {
          title: "Get Started",
          url: "/docs/getting-started/get-started",
        },
        {
          title: "Tutorials",
          url: "/docs/getting-started/tutorials",
        },
      ],
    },
    {
      title: "Playground",
      items: [
        {
          title: "Guide",
          url: "/docs/playground/guide",
        },
        {
          title: "Live print",
          url: "/docs/playground/live-print",
        },
        {
          title: "Supported commands",
          url: "/docs/playground/supported-commands",
        },
        {
          title: "Limitations",
          url: "/docs/playground/limitations",
        },
      ],
    },
    {
      title: "API Reference",
      items: [
        {
          title: "Overview",
          url: "/docs/api-reference/overview",
        },
        {
          title: "ZPLParser",
          url: "/docs/api-reference/zpl-parser",
        },
        {
          title: "ZPLRenderer",
          url: "/docs/api-reference/zpl-renderer",
        },
        {
          title: "zpl",
          url: "/docs/api-reference/zpl",
        },
        {
          title: "PrinterProvider",
          url: "/docs/api-reference/printer-provider",
        },
        {
          title: "usePrinter",
          url: "/docs/api-reference/use-printer",
        },
        {
          title: "useLabel",
          url: "/docs/api-reference/use-label",
        },
        {
          title: "usePrint",
          url: "/docs/api-reference/use-print",
        },
      ],
    },
  ],
};

type DocPage = {
  title: string;
  url: string;
};

// Function to flatten the nested structure into a single array of pages
function getAllPages(): DocPage[] {
  return docPages.navMain.reduce<DocPage[]>((acc, section) => {
    return [...acc, ...section.items];
  }, []);
}

// Function to find the previous and next pages
export function getAdjacentPages(currentUrl: string) {
  const allPages = getAllPages();
  const currentIndex = allPages.findIndex((page) => page.url === currentUrl);

  // If the page is not found, return null for both previous and next
  if (currentIndex === -1) {
    return {
      previousPage: null,
      nextPage: null,
      currentPage: allPages[currentIndex],
    };
  }

  return {
    previousPage: currentIndex > 0 ? allPages[currentIndex - 1] : null,
    nextPage:
      currentIndex < allPages.length - 1 ? allPages[currentIndex + 1] : null,
    currentPage: allPages[currentIndex],
  };
}

export function DocSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarContent className="mt-16">
        <NavMain items={docPages.navMain} />
      </SidebarContent>
    </Sidebar>
  );
}
