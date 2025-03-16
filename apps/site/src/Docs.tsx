import { DocSidebar, getAdjacentPages } from "@/components/doc-sidebar.tsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SiteFooter } from "@/components/site-footer.tsx";
import { Link, useLocation, useParams } from "react-router";
import { Remark } from "react-remark";
import { remarkAlert } from "remark-github-blockquote-alert";
import { useEffect, useMemo, useState } from "react";
import "./Docs.css";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert.tsx";
import {
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Info,
  SearchX,
} from "lucide-react";
import { ZPLCommands } from "zpl-js";
import "remark-github-blockquote-alert/alert.css";
import { useTheme } from "zpl-js-editor";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip.tsx";
import { Progress } from "./components/ui/progress";

export default function Page() {
  const location = useLocation();
  const params = useParams();
  const [markdown, setMarkdown] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    import(`./docs/${params.page}.md?raw`)
      .then((s) => {
        setMarkdown(s.default);
        setError(false);
      })
      .catch(() => {
        setMarkdown("");
        setError(true);
      });
  }, [params]);

  const { previousPage, nextPage, currentPage } = getAdjacentPages(
    location.pathname
  );

  const { theme } = useTheme();
  const darkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const COLORS = useMemo(
    () => ({
      background: darkMode ? "#171717" : "#fafafa",
      backgroundActive: darkMode ? "#292929" : "#f5f5f5",
      backgroundCode: darkMode ? "#3e3e3e" : "#e6e6e6",
      color: darkMode ? "#a9b7c5" : "#000000",
      colorActive: darkMode ? "#a9b7c5" : "#000000",
      warning: darkMode ? "#db8882" : "#ff6666",
      error: darkMode ? "#db8882" : "#ff6666",
      zplText: darkMode ? "#ce8e6d" : "#914d08",
      zplCommand: darkMode ? "#2ebaa3" : "#298c7c",
      zplComment: darkMode ? "#7a7e85" : "#939393",
    }),
    [darkMode]
  );

  const totalImplemented = Object.entries(ZPLCommands).filter(
    ([, cmd]) =>
      cmd.implemented === "FULLY_IMPLEMENTED" ||
      cmd.implemented === "PARTIALLY_IMPLEMENTED"
  ).length;
  const totalNotImplemented = Object.entries(ZPLCommands).filter(
    ([, cmd]) => !cmd.implemented || cmd.implemented === "NOT_IMPLEMENTED"
  ).length;

  return (
    <SidebarProvider>
      <title>{`${currentPage.title} - ZPL × JS`}</title>
      <DocSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <Link to="/docs">Docs</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{currentPage?.title}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col pl-16 pt-0">
          {error && (
            <Alert className="max-w-xl mt-8">
              <SearchX className="h-4 w-4" />
              <AlertTitle>404</AlertTitle>
              <AlertDescription>
                The docs for this page could not be found.
              </AlertDescription>
            </Alert>
          )}
          <div className="max-w-3xl docs">
            {/* @ts-expect-error The plugin types don't like each other */}
            <Remark remarkPlugins={[remarkAlert]}>{markdown}</Remark>

            <div className="flex justify-between my-12">
              {previousPage && (
                <Link to={previousPage.url} className="flex text-sm">
                  <ChevronLeft size="1.5em" className="mr-2" />
                  {previousPage.title}
                </Link>
              )}
              <div className="flex grow-1" />
              {nextPage && (
                <Link to={nextPage.url} className="flex text-sm">
                  {nextPage.title}
                  <ChevronRight size="1.5em" className="ml-2" />
                </Link>
              )}
            </div>

            {currentPage?.title === "Supported commands" && (
              <div>
                <a id="implemented-commands" />
                <Separator className="my-16" />
                <h2 className="text-xl font-bold">Implemented Commands</h2>
                <div>
                  {totalImplemented} of {totalImplemented + totalNotImplemented}{" "}
                  applicable ZPL II commands (i.e., related to label data and
                  config) are implemented so far:
                  <Progress
                    value={
                      (100 * totalImplemented) /
                      (totalImplemented + totalNotImplemented)
                    }
                    className={"mt-4 mb-8"}
                  />
                </div>
                <p>
                  The following commands are implemented in the current version:
                </p>
                {Object.entries(ZPLCommands)
                  .filter(
                    ([, cmd]) =>
                      cmd.implemented === "FULLY_IMPLEMENTED" ||
                      cmd.implemented === "PARTIALLY_IMPLEMENTED"
                  )
                  .map(([name, command]) => (
                    <div key={name} className="mt-4">
                      <h3
                        className="text-xl font-bold flex flex-row items-center gap-2"
                        style={{
                          color:
                            command.implemented === "FULLY_IMPLEMENTED"
                              ? COLORS.zplCommand
                              : COLORS.warning,
                        }}
                      >
                        {name}{" "}
                        {command.implemented === "PARTIALLY_IMPLEMENTED" && (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Info size="0.8em" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>This command is partially implemented.</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </h3>
                      <p className="text-sm">{command.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {!command.description && "No description yet."}
                      </p>
                    </div>
                  ))}
                <a id="non-implemented-commands" />
                <Separator className="my-16" />
                <h2 className="text-xl font-bold">Non-implemented Commands</h2>
                <p>The following commands are not implemented yet:</p>
                {Object.entries(ZPLCommands)
                  .filter(
                    ([, cmd]) =>
                      !cmd.implemented || cmd.implemented === "NOT_IMPLEMENTED"
                  )
                  .map(([name, command]) => (
                    <div key={name} className="mt-4">
                      <h3 className="text-xl font-bold">{name}</h3>
                      <p className="text-sm">{command.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {!command.description && "No description yet."}
                      </p>
                    </div>
                  ))}
                <a id="not-applicable-commands" />
                <Separator className="my-16" />
                <h2 className="text-xl font-bold">Not Applicable Commands</h2>
                <p>
                  The following commands are not applicable to the ZPL renderer
                  (e.g., memory or network related):
                </p>
                {Object.entries(ZPLCommands)
                  .filter(([, cmd]) => cmd.implemented === "NOT_APPLICABLE")
                  .map(([name, command]) => (
                    <div key={name} className="mt-4">
                      <h3
                        className="text-xl font-bold"
                        style={{ color: COLORS.zplComment }}
                      >
                        {name}
                      </h3>
                      <p className="text-sm">{command.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {!command.description && "No description yet."}
                      </p>
                    </div>
                  ))}
                <Separator className="my-16" />
                <div
                  className="flex justify-center mb-8"
                  style={{ gap: "1rem" }}
                >
                  <a
                    className="cursor-pointer flex text-sm"
                    onClick={() => window.scrollTo(0, 0)}
                  >
                    Back to top <ChevronUp size="1.5em" className="ml-2" />
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        <SiteFooter />
      </SidebarInset>
    </SidebarProvider>
  );
}
