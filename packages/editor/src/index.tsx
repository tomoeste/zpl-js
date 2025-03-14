import { Textarea } from "./components/ui/textarea.tsx";
import {
  ChangeEvent,
  JSX,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "./components/ui/hover-card";
import {
  ZPLCommand,
  ZPLCommands,
  ZPLImplementationMessages,
  ZplReferences,
} from "zpl-js";
import debounce from "lodash.debounce";
import { Separator } from "./components/ui/separator";
import { useTheme } from "./components/theme-provider.tsx";

const FRAME_RATE = 1000 / 60; // 60 FPS
const HEADER_HEIGHT = 70;

function levenshteinDistance(a: string, b: string) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = Array(b.length + 1)
    .fill(null)
    .map(() => Array(a.length + 1).fill(null));

  for (let i = 0; i <= a.length; i++) {
    matrix[0][i] = i;
  }
  for (let j = 0; j <= b.length; j++) {
    matrix[j][0] = j;
  }

  for (let j = 1; j <= b.length; j++) {
    for (let i = 1; i <= a.length; i++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1, // deletion
        matrix[j - 1][i] + 1, // insertion
        matrix[j - 1][i - 1] + cost // substitution
      );
    }
  }

  return matrix[b.length][a.length];
}

function findClosestMatch(inputString: string, stringArray: string[]) {
  let closestMatch = null;
  let minDistance = Infinity;

  for (const str of stringArray) {
    const distance = levenshteinDistance(inputString, str);
    if (distance < minDistance) {
      minDistance = distance;
      closestMatch = str;
    }
  }

  return closestMatch;
}

type CodeHighlightProps = {
  input: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  fontsLoaded?: boolean;
};

export function CodeHighlight(props: CodeHighlightProps) {
  const { theme } = useTheme();
  const darkMode =
    theme === "dark" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [currentLine, setCurrentLine] = useState<number>(-1);
  const commandMap = useRef<Map<string, string>>(new Map());
  const [commandHoverCard, setCommandHoverCard] = useState<JSX.Element | null>(
    null
  );
  const [hoveredPosition, setHoveredPosition] = useState<[number, number]>([
    0, 0,
  ]);

  // Text styling constants
  const TEXT_STYLE = {
    fontSize: "14px",
    fontFamily: "JetBrains Mono",
    lineHeight: "24px",
    paddingX: "54px",
    paddingY: "4px",
  };

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

  // Draw highlighted line
  const renderHighlightedRow = (
    ctx: CanvasRenderingContext2D,
    index: number,
    lineHeight: number,
    yOrigin: number
  ) => {
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)";
    const y =
      2 * parseInt(TEXT_STYLE.paddingY) + index * lineHeight + 2 + yOrigin;
    ctx.fillRect(3, y, ctx.canvas.width, lineHeight);
  };

  const renderZplReference = (reference: Record<string, number>) => {
    if (!reference) return;
    const referenceId = Object.keys(reference)[0];
    const { name, url } = ZplReferences[referenceId];
    return (
      <a
        className="text-xs font-medium underline underline-offset-4"
        style={{ color: COLORS.zplComment }}
        href={`${url}#page=${reference[referenceId]}`}
        target="_blank"
        rel="noreferrer"
      >
        {name}
      </a>
    );
  };

  const renderCommand = (command: string, x: number, y: number) => {
    const isNotValid = !ZPLCommands[command as ZPLCommand];
    const isNotImplemented =
      ZPLCommands[command as ZPLCommand]?.implemented === "NOT_IMPLEMENTED";
    const isNotApplicable =
      ZPLCommands[command as ZPLCommand]?.implemented === "NOT_APPLICABLE";
    let color = COLORS.zplCommand;
    if (isNotValid) color = COLORS.error;
    else if (isNotImplemented) color = COLORS.warning;
    else if (isNotApplicable) color = COLORS.zplComment;
    return (
      <HoverCard defaultOpen={true}>
        <HoverCardTrigger asChild>
          <span
            style={{
              position: "absolute",
              left: `${x}px`,
              top: `${y}px`,
              height: "14px",
            }}
          ></span>
        </HoverCardTrigger>
        <HoverCardContent
          className="p-4 w-80 rounded-md shadow-xl border dark:border-stone-700"
          style={{ backgroundColor: COLORS.backgroundActive }}
          sideOffset={5}
        >
          <div className="space-y-3 mb-3" style={{ margin: "4px 0" }}>
            <h4 className="font-normal" style={{ color: COLORS.color }}>
              <code
                className="font-sm pr-3"
                style={{ color, paddingRight: "4px" }}
              >
                {command}
              </code>
              {ZPLCommands[command as ZPLCommand]?.name}
            </h4>
            <Separator style={{ margin: "4px 0" }} />
            {isNotValid && (
              <div className="text-sm" style={{ color: COLORS.error }}>
                This is not a valid ZPL II command. Did you mean{" "}
                {findClosestMatch(command, Object.keys(ZPLCommands))}?
              </div>
            )}
            {ZPLCommands[command as ZPLCommand] && (
              <div
                style={{
                  margin: "4px 0",
                  maxWidth: "400px",
                }}
              >
                <div
                  className="text-sm"
                  style={{ margin: "8px 0", color: COLORS.warning }}
                >
                  {ZPLCommands[command as ZPLCommand].implemented ===
                  "NOT_IMPLEMENTED"
                    ? ZPLImplementationMessages.NOT_IMPLEMENTED
                    : ""}
                </div>
                <div
                  className="text-sm"
                  style={{ margin: "16px 0", color: COLORS.warning }}
                >
                  {ZPLCommands[command as ZPLCommand].implemented ===
                  "PARTIALLY_IMPLEMENTED"
                    ? ZPLImplementationMessages.PARTIALLY_IMPLEMENTED
                    : ""}
                </div>
                <div
                  className="text-sm"
                  style={{ color: COLORS.zplComment, margin: "8px 0" }}
                >
                  {ZPLCommands[command as ZPLCommand].implemented ===
                  "NOT_APPLICABLE"
                    ? ZPLImplementationMessages.NOT_APPLICABLE
                    : ""}
                </div>
                <div
                  className="text-sm"
                  style={{
                    color: COLORS.zplComment,
                    margin: "16px 0",
                  }}
                >
                  {ZPLCommands[command as ZPLCommand].description || (
                    <i>Description not available.</i>
                  )}
                </div>
                {ZPLCommands[command as ZPLCommand].format && (
                  <div
                    className="text-xs my-4"
                    style={{ margin: "16px 0", color: COLORS.zplComment }}
                  >
                    Format:{" "}
                    <code
                      className="rounded-sm p-1"
                      style={{
                        backgroundColor: COLORS.backgroundCode,
                        color: COLORS.colorActive,
                      }}
                    >
                      {ZPLCommands[command as ZPLCommand].format}
                    </code>
                  </div>
                )}
                <div
                  className="text-xs"
                  style={{ color: COLORS.zplComment, margin: "4px 0" }}
                >
                  See also:{" "}
                  {ZPLCommands[command as ZPLCommand]?.reference &&
                    renderZplReference(
                      ZPLCommands[command as ZPLCommand].reference!
                    )}
                </div>
              </div>
            )}
          </div>
        </HoverCardContent>
      </HoverCard>
    );
  };

  // Draw text on canvas
  const renderText = (
    ctx: CanvasRenderingContext2D,
    lines: string[],
    lineHeight: number
  ) => {
    // Cache these values outside the loop
    const xOrigin = -(textareaRef.current?.scrollLeft ?? 0);
    const yOrigin = -(textareaRef.current?.scrollTop ?? 0);
    const paddingX = parseInt(TEXT_STYLE.paddingX);
    const paddingY = parseInt(TEXT_STYLE.paddingY);
    const baseFont = `${TEXT_STYLE.fontSize} ${TEXT_STYLE.fontFamily}`;
    const commandRegex = /([~^][A-Z][A-Z0-9@])([^~^]*?)(?=[~^]|$)/g;

    commandMap.current.clear();

    // Pre-calculate common Y positions
    const getLineY = (index: number) =>
      paddingY + (index + 1) * lineHeight + yOrigin;

    // Render all highlights first to prevent layering issues
    if (currentLine >= 0 && currentLine < lines.length) {
      renderHighlightedRow(ctx, currentLine, lineHeight, yOrigin);
    }

    // Reusable render text function
    const renderTextSegment = (
      text: string,
      x: number,
      y: number,
      color: string,
      isItalic = false
    ) => {
      ctx.fillStyle = color;
      ctx.font = `${isItalic ? "italic" : ""} ${baseFont}`.trim();
      ctx.fillText(text, x, y);
      return ctx.measureText(text).width;
    };

    lines.forEach((line, index) => {
      // Render line number
      const lineNumberX = 16 + xOrigin;
      const lineY = getLineY(index);
      renderTextSegment(
        (index + 1).toString(),
        lineNumberX,
        lineY,
        index === currentLine ? COLORS.color : COLORS.zplComment
      );

      let charIndex = 0;
      let charXPosition = 0;
      let lastIndex = 0;
      let match;

      // Reset regex
      commandRegex.lastIndex = 0;

      // Calculate the starting X position for the text content
      const textStartX = paddingX + xOrigin;

      while ((match = commandRegex.exec(line)) !== null) {
        let [, command, _paramString] = match;

        if (command.startsWith("^A") && !command.endsWith("@")) {
          _paramString = command.substring(2, 3).concat(_paramString);
          command = "^A";
        }
        const paramString = _paramString.trim();

        if (match.index > lastIndex) {
          const unmatchedText = line.substring(lastIndex, match.index);
          charXPosition += renderTextSegment(
            unmatchedText,
            textStartX + charXPosition,
            lineY,
            COLORS.color
          );
          charIndex += unmatchedText.length;
        }

        lastIndex = match.index + match[0].length;
        commandMap.current.set(`${charIndex},${index}`, command);

        const commandStatus = ZPLCommands[command as ZPLCommand]?.implemented;
        const color = !ZPLCommands[command as ZPLCommand]
          ? COLORS.error
          : commandStatus === "NOT_IMPLEMENTED"
            ? COLORS.warning
            : commandStatus === "NOT_APPLICABLE"
              ? COLORS.zplComment
              : COLORS.zplCommand;

        charXPosition += renderTextSegment(
          command,
          textStartX + charXPosition,
          lineY,
          color
        );
        charIndex += command.length;

        const isComment = command === "^FX";
        const isText = command === "^FD";
        const paramColor = isComment
          ? COLORS.zplComment
          : isText
            ? COLORS.zplText
            : COLORS.color;

        charXPosition += renderTextSegment(
          paramString,
          textStartX + charXPosition,
          lineY,
          paramColor,
          isComment
        );
        charIndex += paramString.length;
      }

      if (lastIndex < line.length) {
        const unmatchedText = line.substring(lastIndex);
        renderTextSegment(
          unmatchedText,
          textStartX + charXPosition,
          lineY,
          COLORS.color
        );
      }
    });
  };

  // Create a debounced version of the line update
  const handleSelect = useCallback(() => {
    if (!textareaRef.current) return;

    const cursorPosition = textareaRef.current.selectionStart;
    const textBeforeCursor = props.input.substring(0, cursorPosition);
    const newLine = textBeforeCursor.split("\n").length - 1;

    // Only update if the line has actually changed
    if (newLine !== currentLine) {
      // Use requestAnimationFrame to sync the state update with rendering
      requestAnimationFrame(() => {
        setCurrentLine(newLine);
      });
    }
  }, [currentLine, props.input]);

  // Optimize event handling
  const debouncedHandleSelect = useMemo(
    () => debounce(handleSelect, 16), // roughly one frame at 60fps
    [handleSelect]
  );

  // Clean up the debounced function
  useEffect(() => {
    return () => {
      debouncedHandleSelect.cancel();
    };
  }, [debouncedHandleSelect]);

  useLayoutEffect(() => {
    let animationFrameId: number | null = null;
    let lastDrawTime = 0;

    const canvas = canvasRef.current;
    const textarea = textareaRef.current;
    if (!canvas || !textarea) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Create an off-screen canvas for double buffering
    const offscreenCanvas = document.createElement("canvas");
    const offscreenCtx = offscreenCanvas.getContext("2d", { alpha: true });
    if (!offscreenCtx) return;

    const updateCanvasSizes = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = textarea.getBoundingClientRect();

      // Update both canvases
      [canvas, offscreenCanvas].forEach((canv) => {
        canv.width = rect.width * dpr;
        canv.height = (rect.height - 2) * dpr;

        // Set the CSS size for the main canvas only
        if (canv === canvas) {
          canv.style.width = `${rect.width}px`;
          canv.style.height = `${rect.height - 2}px`;
        }
      });

      // Scale both contexts
      [ctx, offscreenCtx].forEach((context) => {
        context.scale(dpr, dpr);
      });
    };

    const drawText = () => {
      const currentTime = performance.now();
      if (currentTime - lastDrawTime < FRAME_RATE) {
        animationFrameId = requestAnimationFrame(drawText);
        return;
      }

      // Update sizes if needed
      updateCanvasSizes();

      const rect = textarea.getBoundingClientRect();

      // Clear both canvases
      offscreenCtx.clearRect(0, 0, rect.width, rect.height);
      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw to offscreen canvas
      const lines = props.input.split("\n");
      const lineHeight = parseInt(TEXT_STYLE.lineHeight);
      renderText(offscreenCtx, lines, lineHeight);

      // Copy from offscreen to main canvas - using the rect dimensions, not canvas dimensions
      ctx.drawImage(offscreenCanvas, 0, 0, rect.width, rect.height);

      lastDrawTime = currentTime;
      animationFrameId = null;
    };

    const queueDraw = () => {
      if (animationFrameId === null) {
        animationFrameId = requestAnimationFrame(drawText);
      }
    };

    // Initial draw
    queueDraw();

    // Handle resize
    const resizeObserver = new ResizeObserver(queueDraw);
    resizeObserver.observe(textarea);

    // Handle scroll with throttling
    const handleScroll = () => queueDraw();
    textarea.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      resizeObserver.disconnect();
      textarea.removeEventListener("scroll", handleScroll);
    };
  }, [props.input, currentLine, darkMode, props.fontsLoaded]);

  const handleTextHover = (e: MouseEvent) => {
    setCommandHoverCard(null);
    setHoveredPosition([e.x - 31.6, e.y - 88.5]);
  };

  const debouncedHandleTextHover = debounce(handleTextHover, 500);

  const handlePointerLeave = () => {
    debouncedHandleTextHover.cancel();
  };

  const handleScrollMove = () => {
    setCommandHoverCard(null);
  };

  useEffect(() => {
    if (textareaRef?.current) {
      textareaRef.current.addEventListener(
        "pointermove",
        debouncedHandleTextHover
      );
      textareaRef.current.addEventListener("pointerleave", handlePointerLeave);
      textareaRef.current.addEventListener("scroll", handleScrollMove);
    }
    window.addEventListener("scroll", handleScrollMove);

    return () => {
      if (textareaRef?.current) {
        textareaRef.current.removeEventListener(
          "pointermove",
          debouncedHandleTextHover
        );
        textareaRef.current.removeEventListener(
          "pointerleave",
          handlePointerLeave
        );
        textareaRef.current.removeEventListener("scroll", handleScrollMove);
      }
      window.removeEventListener("scroll", handleScrollMove);
    };
  }, [textareaRef?.current]);

  useLayoutEffect(() => {
    const [_x, _y] = hoveredPosition;
    if (_x === 0 && _y === 0) return;

    const x = _x + (textareaRef.current?.scrollLeft ?? 0);
    const y = _y - HEADER_HEIGHT + (window.scrollY ?? 0) - 2;

    const lineNumber = Math.floor(
      (y +
        (textareaRef.current?.scrollTop ?? 0) -
        parseInt(TEXT_STYLE.paddingY)) /
        parseInt(TEXT_STYLE.lineHeight)
    );
    const charIndex = (() => {
      const ctx = canvasRef.current?.getContext("2d");
      if (!ctx) return 0;

      const line = textareaRef.current?.value.split("\n")[lineNumber] || "";
      ctx.font = `${TEXT_STYLE.fontSize} ${TEXT_STYLE.fontFamily}`;

      let totalWidth = parseInt(TEXT_STYLE.paddingX);
      for (let i = 0; i < line.length; i++) {
        const charWidth = ctx.measureText(line[i]).width;
        if (totalWidth + charWidth > x) {
          return i;
        }
        totalWidth += charWidth;
      }
      return line.length;
    })();

    let command;

    for (let i = 0; i < 3; i++) {
      const key = `${charIndex - i},${lineNumber}`;
      if (commandMap.current.has(key)) command = commandMap.current.get(key);
    }

    if (command === undefined) return;

    setCommandHoverCard(renderCommand(command, x, y));
  }, [hoveredPosition, theme]);

  return (
    <div ref={containerRef} className="relative" style={{ padding: "3px" }}>
      <Textarea
        ref={textareaRef}
        value={props.input}
        spellCheck={false}
        onChange={props.onChange}
        onMouseDown={debouncedHandleSelect}
        onSelect={debouncedHandleSelect}
        onKeyDown={(e) => {
          // Handle all navigation keys immediately
          if (
            [
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
              "Home",
              "End",
              "PageUp",
              "PageDown",
              "Enter",
              "Backspace",
              "Delete",
            ].includes(e.key)
          ) {
            // Use requestAnimationFrame to ensure the cursor position has updated
            requestAnimationFrame(() => {
              handleSelect();
            });
          }
        }}
        onKeyUp={(e) => {
          // For non-navigation keys, use the debounced version
          if (
            ![
              "ArrowUp",
              "ArrowDown",
              "ArrowLeft",
              "ArrowRight",
              "Home",
              "End",
              "PageUp",
              "PageDown",
              "Enter",
              "Backspace",
              "Delete",
            ].includes(e.key)
          ) {
            debouncedHandleSelect();
          }
        }}
        style={{
          caretColor: COLORS.color,
          background: COLORS.background,
          fontSize: TEXT_STYLE.fontSize,
          fontFamily: TEXT_STYLE.fontFamily,
          lineHeight: TEXT_STYLE.lineHeight,
          resize: "none",
          whiteSpace: "pre",
          overflow: "auto",
          paddingLeft: parseInt(TEXT_STYLE.paddingX) - 4,
          color: "transparent",
          height: "calc(100vh - 180px)",
          minHeight: "400px",
          scrollBehavior: "smooth",
        }}
      />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none rounded-md"
        style={{ top: "4px" }}
      />
      {commandHoverCard}
    </div>
  );
}
