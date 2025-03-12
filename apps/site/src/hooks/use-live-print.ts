import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Preset } from "@/data/presets.ts";

type LivePrintProps = {
  livePrint: boolean;
  handleSetSelectedPreset: (preset: Preset) => void;
};

const RETRY_TIMEOUT = 5;

const getShortDateTime = (date: Date) =>
  `${date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })}.${date.getMilliseconds().toString().padStart(3, "0")}`;

export function useLivePrint({
  livePrint,
  handleSetSelectedPreset,
}: LivePrintProps) {
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const [livePrintConnected, setLivePrintConnected] = useState(false);

  useEffect(() => {
    const connectWebsocket = () => {
      if (
        websocket?.readyState === WebSocket.OPEN ||
        websocket?.readyState === WebSocket.CONNECTING
      )
        return websocket;
      const ws = new WebSocket("ws://localhost:8080");
      ws.onopen = () => {
        if (timeoutId) clearTimeout(timeoutId);
        setLivePrintConnected(true);
        toast.success("Connected to zpl-js-listener");
      };
      ws.onmessage = (event) => {
        if (event.data && typeof event.data === "string") {
          handleSetSelectedPreset({
            id: Date.now().toString(),
            zpl: event.data,
            name: `Live print (${getShortDateTime(new Date())})`,
          });
          toast.success("ZPL label data received");
        }
      };
      ws.onerror = (event) => {
        console.error("Error connecting to zpl-js-listener", event);
      };
      ws.onclose = (event) => {
        setLivePrintConnected(false);
        if (event.wasClean) {
          toast.info("Disconnected from zpl-js-listener.");
        } else {
          toast.info(
            `Not connected to zpl-js-listener. Retrying in ${RETRY_TIMEOUT} seconds…`
          );
          setTimeoutId(
            setTimeout(() => setWebsocket(null), RETRY_TIMEOUT * 1000)
          );
        }
      };
      return ws;
    };

    if (livePrint) setWebsocket(connectWebsocket());
    else {
      websocket?.close?.();
      toast.dismiss();
    }

    return () => websocket?.close?.();
  }, [livePrint, websocket]);

  return { livePrintConnected };
}
