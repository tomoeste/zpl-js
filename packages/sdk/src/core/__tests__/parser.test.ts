import { ZPLParser } from "../parser";
import { BarcodeItem, TextItem } from "../../types/types";

describe("ZPLParser Tests", () => {
  it("should correctly parse a valid ZPL string", () => {
    const zpl = "^XA^FO50,50^FDHello World^FS^XZ";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(true);
    expect(result.errors?.length).toBe(0);
    expect(result.label?.items.length).toBe(1);
  });

  it("should detect missing ^XA start command", () => {
    const zpl = "^FO50,50^FDHello World^FS^XZ";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Missing ^XA start command");
  });

  it("should detect missing ^XZ end command", () => {
    const zpl = "^XA^FO50,50^FDHello World^FS";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Missing ^XZ end command");
  });

  it("should correctly handle ^FO command parameters", () => {
    const zpl = "^XA^FO100,200^FDLocation Test^FS^XZ";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(true);
    expect(result.errors?.length).toBe(0);
    expect(result.label?.items[0].x).toBe(100);
    expect(result.label?.items[0].y).toBe(200);
  });

  it("should correctly parse ^B3 (Code 39) barcode with parameters", () => {
    const zpl = "^XA^FO10,10^B3N,N,50,Y,N^FD123456^FS^XZ";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(true);
    expect(result.errors?.length).toBe(0);
    expect((result.label?.items[0] as BarcodeItem).barcodeType).toBe("code39");
    expect(
      (result.label?.items[0] as BarcodeItem).getRenderOptions()?.height
    ).toBe(50);
  });

  it("should correctly parse ^BC (Code 128) barcode with parameters", () => {
    const zpl = "^XA^FO10,10^BCN,100,Y,Y,N,N^FDABC123^FS^XZ";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(true);
    expect(result.errors?.length).toBe(0);
    expect((result.label?.items[0] as BarcodeItem).barcodeType).toBe("code128");
    expect(
      (result.label?.items[0] as BarcodeItem).getRenderOptions()?.height
    ).toBe(100);
  });

  it("should throw error for invalid command", () => {
    const zpl = "^XA^INVALIDCMD^XZ";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Invalid command: ^IN");
  });

  it("should correctly handle empty ZPL string", () => {
    const parser = new ZPLParser("");
    const result = parser.parse();
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Missing ^XA start command");
  });

  it("should detect invalid barcode height (^B3)", () => {
    const zpl = "^XA^FO10,10^B3N,N,40000,Y,N^FD123456^FS^XZ";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain(
      "Error processing command ^B3: Error: Barcode height must be between 1 and 32000 dots"
    );
  });

  it("should correctly set default font with ^CF", () => {
    const zpl = "^XA^CF0,30,40^FO10,10^FDTest^FS^XZ";
    const parser = new ZPLParser(zpl);
    const result = parser.parse();
    expect(result.isValid).toBe(true);
    expect((result.label?.items[0] as TextItem).font?.fontName).toBe("0");
    expect((result.label?.items[0] as TextItem).font?.height).toBe(30);
    expect((result.label?.items[0] as TextItem).font?.width).toBe(40);
  });
});
