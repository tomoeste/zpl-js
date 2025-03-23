import { ModeSwitcher } from "@/components/mode-switcher";
import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Link, useLocation } from "react-router";

export function SiteHeader() {
  const location = useLocation();
  return (
    <header className="border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container-wrapper">
        <div className="flex h-14 items-center gap-2 md:gap-4">
          <div className=" flex">
            <Link
              to="/zpl-js/"
              className="mx-4 flex items-center gap-2 lg:mr-2"
            >
              <Terminal />
              <span className="hidden font-bold md:inline-block">ZPL × JS</span>
            </Link>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Badge
                    variant="outline"
                    className="hidden md:inline-block ml-2 mr-4 lg:mr-6"
                  >
                    <code className="pointer-events-none">alpha</code>
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Some things will be broken or missing</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <nav className="flex items-center gap-4 text-sm xl:gap-6">
              <Link
                to="/"
                className={`transition-colors hover:text-foreground/80
                                    ${
                                      location.pathname === "/"
                                        ? "text-foreground"
                                        : "text-foreground/80"
                                    }`}
              >
                Playground
              </Link>
              <Link
                to="/docs/getting-started/introduction"
                className={`transition-colors hover:text-foreground/80
                                    ${
                                      location.pathname === "/docs"
                                        ? "text-foreground"
                                        : "text-foreground/80"
                                    }`}
              >
                Docs
              </Link>
              <Link
                to="/about"
                className={`transition-colors hover:text-foreground/80
                                    ${
                                      location.pathname === "/about"
                                        ? "text-foreground"
                                        : "text-foreground/80"
                                    }`}
              >
                About
              </Link>
            </nav>
          </div>
          <div className="ml-auto mr-4 flex items-center gap-2 md:flex-1 md:justify-end">
            <nav className="flex items-center gap-0.5">
              <Button asChild variant="ghost" size="icon">
                <a
                  href="https://github.com/tomoeste/zpl-js"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img
                    src="/zpl-js/github.svg"
                    alt="GitHub"
                    className="h-5 w-5 dark:invert"
                  />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
              <ModeSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
