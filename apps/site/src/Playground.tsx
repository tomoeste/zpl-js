import { Separator } from "@/components/ui/separator";
import { useCallback, useEffect, useRef, useState } from "react";
import { ZPLParser, ZPLRenderer } from "zpl-js";
import { PresetSelector } from "@/components/preset-selector";
import { Preset, presets } from "@/data/presets.ts";
import * as React from "react";
import CodeHighlight from "zpl-js-editor";
import { Label } from "@radix-ui/react-label";
import { LabelDimensions } from "@/components/label-dimensions";
import { LabelDPI } from "@/components/label-dpi";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  RectangleHorizontal,
  RectangleVertical,
  XCircle,
} from "lucide-react";
import { SaveAs } from "@/components/save-as";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { useLivePrint } from "@/hooks/use-live-print";
import { useFontRefresh } from "@/hooks/useFontRefresh";
import { Link, useSearchParams } from "react-router";
import { SiteFooter } from "@/components/site-footer";
import { useNavigate } from "react-router";

const defaultPreset = presets.find((p) => p.name === "Kitchen sink")!;

export default function Playground() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = searchParams.get("redirect") || "";

  useEffect(() => {
    if (redirect) {
      try {
        const url = new URL(redirect, window.location.origin);
        if (url.pathname.startsWith("/")) {
          navigate(url.pathname);
        }
      } catch {
        toast.warning("Invalid redirect URL in query string");
      }
    }
  }, [redirect]);

  const [selectedPreset, setSelectedPreset] =
    React.useState<Preset>(defaultPreset);
  const [livePrints, setLivePrints] = useState<Preset[]>([]);
  const [zplInput, setZplInput] = useState(defaultPreset.zpl);
  const handleSetSelectedPreset = (preset: Preset) => {
    if (preset.name.startsWith("Live print")) {
      setLivePrints((prints) => Array.from(new Set(prints).add(preset)));
    }
    setSelectedPreset(preset);
    if (preset) {
      setZplInput(preset.zpl);
    }
  };
  const [dimensions, setDimensions] = useState("4x6");
  const [orientation, setOrientation] = useState("portrait");
  const [dpi, setDpi] = useState("203");
  const [livePrint, setLivePrint] = useState(false);
  const { livePrintConnected } = useLivePrint({
    livePrint,
    handleSetSelectedPreset,
  });
  const fontsLoaded = useFontRefresh();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderZPL = useCallback(
    (zpl: string) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      try {
        const parser = new ZPLParser(zpl);
        const renderer = new ZPLRenderer(canvas, {
          dpi,
          dimensions,
          orientation,
          scale: 1,
        });

        const parsedZpl = parser.parse();
        if (parsedZpl.label) {
          renderer.render(parsedZpl.label);
        } else if (parsedZpl.errors) {
          toast.error(
            "An error occurred while rendering the ZPL code. See console for details."
          );
          console.error(parsedZpl.errors.join("\n"));
        }
      } catch (err) {
        toast.error(
          "An error occurred while rendering the ZPL code. See console for details."
        );
        console.error(err instanceof Error ? err.message : "An error occurred");
      }
    },
    [dpi, dimensions, orientation, canvasRef]
  );

  const handleZplInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setZplInput(e.target.value);
  };

  useEffect(() => {
    renderZPL(zplInput);
  }, [dimensions, orientation, dpi, zplInput, fontsLoaded]);

  return (
    <div className="flex flex-col m-2 drop-shadow-md rounded-xl bg-white dark:bg-black">
      <div className="flex flex-col">
        <div className="flex-col flex">
          <div className="flex flex-col items-start justify-between space-y-2 p-4 md:p-6 md:h-16">
            <h2 className="md:hidden text-lg font-semibold w-full text-center mb-3">
              ZPL × JS Playground
            </h2>
            <h2 className="hidden md:inline-block text-lg font-semibold shrink-0">
              Playground
            </h2>
            <div className="ml-auto flex w-full gap-2 sm:justify-end">
              <PresetSelector
                presets={presets}
                livePrints={livePrints}
                selectedPreset={selectedPreset}
                setSelectedPreset={handleSetSelectedPreset}
              />
              <div
                className="flex items-center gap-2 relative"
                style={{ marginLeft: "1em" }}
              >
                <Switch
                  id="live-print"
                  checked={livePrint}
                  onCheckedChange={setLivePrint}
                  className={
                    livePrint && livePrintConnected
                      ? "data-[state=checked]:bg-green-500 data-[state=checked]:ring-2 data-[state=checked]:ring-green-300"
                      : ""
                  }
                />
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <div className="relative flex items-center gap-2 cursor-pointer">
                      <Label
                        htmlFor="live-print"
                        className="flex items-center relative text-sm font-medium leading-none"
                      >
                        Live print
                      </Label>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="bottom">
                    <p className="mb-4">
                      Show live previews from HTTP Post requests. See the{" "}
                      <Link
                        to="/docs/playground/live-print"
                        target="_blank"
                        className="font-medium underline underline-offset-3 hover:no-underline"
                      >
                        docs
                      </Link>{" "}
                      for more info.
                    </p>
                    <p>
                      Listens on a WebSocket connection for print requests. In
                      your terminal, run:
                      <pre className="bg-sidebar-accent rounded-sm p-2 my-2">
                        <code>{` > npx zpl-js-listener`}</code>
                      </pre>
                      and send your labels to the HTTP server:
                      <pre className="bg-sidebar-accent rounded-sm p-2 my-2 overflow-x-auto">
                        <code>{` ➜  HTTP server: http://127.0.0.1:3000`}</code>
                      </pre>
                    </p>
                    <Separator className="my-4" />

                    {livePrint ? (
                      livePrintConnected ? (
                        <p className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          You are connected to the zpl-js-listener.
                        </p>
                      ) : (
                        <p className="flex items-center gap-2">
                          <XCircle className="w-4 h-4 mr-1" />
                          You are not connected to the zpl-js-listener.
                        </p>
                      )
                    ) : (
                      <p>Tap the switch enable live print.</p>
                    )}
                  </HoverCardContent>
                </HoverCard>
              </div>
              <SaveAs zplInput={zplInput} canvasRef={canvasRef} />
            </div>
          </div>
          <Separator />
          <div className="flex flex-col md:flex-row grow-1 w-full p-6 overflow-hidden">
            <div className="sm:flex sm:flex-col md:grid md:grid-cols-2 w-full gap-6 min-h-[400px] overflow-hidden">
              <CodeHighlight
                input={zplInput}
                onChange={handleZplInputChange}
                fontsLoaded={fontsLoaded}
              />
              <div style={{ padding: "3px" }} className="my-4 md:my-0">
                <div
                  className="rounded-md border bg-sidebar overflow-auto"
                  style={{ height: "calc(100vh - 180px)", minHeight: "400px" }}
                  tabIndex={-1}
                >
                  <canvas
                    ref={canvasRef}
                    width={400}
                    height={600}
                    style={{ margin: "1em" }}
                    className="rounded-md border-1 shadow-xs"
                  />
                </div>
              </div>
            </div>
            <div
              className="flex flex-col gap-6 max-w-[300px]"
              style={{ padding: "1em 0 0 1.5em" }}
            >
              <div className="flex flex-col gap-2">
                <HoverCard openDelay={200}>
                  <HoverCardTrigger asChild>
                    <Label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Orientation
                    </Label>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-[320px] text-sm" side="left">
                    The label orientation, either portrait (vertical) or
                    landscape (horizontal).
                  </HoverCardContent>
                </HoverCard>
                <Tabs value={orientation} onValueChange={setOrientation}>
                  <TabsList className="flex flex-row gap-2">
                    <TabsTrigger value="portrait" aria-label="Portrait">
                      <RectangleVertical />
                    </TabsTrigger>
                    <TabsTrigger value="landscape" aria-label="Landscape">
                      <RectangleHorizontal />
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <Label
                        className="text-sm font-medium leading-none"
                        id="dimensions-label"
                      >
                        Size
                      </Label>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      The label dimensions (in inches). You can set the label
                      orientation above.
                    </HoverCardContent>
                  </HoverCard>
                  <LabelDimensions
                    value={dimensions}
                    setValue={setDimensions}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <HoverCard openDelay={200}>
                    <HoverCardTrigger asChild>
                      <Label
                        className="text-sm font-medium leading-none"
                        id="dpi-label"
                      >
                        DPI
                      </Label>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-[320px] text-sm" side="left">
                      The print density in dots per inch (DPI).
                    </HoverCardContent>
                  </HoverCard>
                  <LabelDPI value={dpi} setValue={setDpi} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}
