import { Ellipsis, File, FileCode2, FileImage } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RefObject } from "react";

type SaveAsProps = {
  zplInput: string;
  canvasRef: RefObject<HTMLCanvasElement | null>;
};

enum SaveAsType {
  ZPL2,
  SVG,
  PNG,
  PDF,
}

export function SaveAs(props: SaveAsProps) {
  const download = async (type: SaveAsType) => {
    const element = document.createElement("a");
    if (type === SaveAsType.ZPL2) {
      element.setAttribute(
        "href",
        "data:text/plain;charset=utf-8," + encodeURIComponent(props.zplInput)
      );
      element.setAttribute("download", "zpl-js.zpl");
    } else if (type === SaveAsType.PNG) {
      const dataUrl = props.canvasRef?.current?.toDataURL("image/png") || "";
      element.setAttribute("href", dataUrl);
      element.setAttribute("download", "zpl-js.png");
    } else if (type === SaveAsType.PDF) {
      const pngDataUrl = props.canvasRef?.current?.toDataURL("image/png") || "";
      const pngImageBytes = dataURLToBytes(pngDataUrl);

      const { PDFDocument } = await import("pdf-lib");
      const pdfDoc = await PDFDocument.create();
      const pngImage = await pdfDoc.embedPng(pngImageBytes);
      const pngDims = pngImage.scale(0.5);
      const page = pdfDoc.addPage();
      page.setSize(pngDims.width, pngDims.height);
      page.drawImage(pngImage, {
        x: 0,
        y: 0,
        width: pngDims.width,
        height: pngDims.height,
      });

      // Serialize the PDFDocument to bytes (a Uint8Array)
      const pdfBytes = await pdfDoc.save();
      const dataUrl = bytesToDataUrl(pdfBytes, "application/pdf");
      element.setAttribute("href", dataUrl);
      element.setAttribute("download", "zpl-js.pdf");
    }

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  };

  function dataURLToBytes(dataURL: string) {
    const base64 = dataURL.split(",")[1];
    const binaryString = atob(base64);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  function bytesToDataUrl(bytes: Uint8Array, mimeType: string) {
    const base64 = btoa(String.fromCharCode(...bytes));
    return `data:${mimeType};base64,${base64}`;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" aria-label="Download">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Save as…</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={download.bind({}, SaveAsType.ZPL2)}>
          <FileCode2 />
          <span>ZPL II</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={download.bind({}, SaveAsType.PNG)}>
          <FileImage />
          <span>PNG</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={download.bind({}, SaveAsType.PDF)}>
          <File />
          <span>PDF</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
