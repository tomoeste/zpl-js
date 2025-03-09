import { zpl } from "../tag";
import { ParsedZPL } from "../../types/types";

describe("zpl function", () => {
  it("should successfully parse a simple ZPL string", () => {
    const parser = zpl`^XA^FO50,50^FDHello, World!^FS^XZ`;
    const result = parser.parse();
    expect(result).toEqual<ParsedZPL>({
      label: expect.any(Object),
      isValid: true,
      errors: [],
      variables: new Map(),
    });
  });

  it("should successfully parse a multiline ZPL string", () => {
    const parser = zpl`^XA
        ^FO50,50
        ^FDHello, World!
        ^FS
        ^XZ`;
    const result = parser.parse();
    expect(result).toEqual<ParsedZPL>({
      label: expect.any(Object),
      isValid: true,
      errors: [],
      variables: new Map(),
    });
  });

  it("should handle ZPL syntax with variables", () => {
    const parser = zpl`label Name(message: string) { ^XA^FO50,50^FDmessage^FS^XZ }`;
    const result = parser.parse();
    expect(result).toEqual<ParsedZPL>({
      label: expect.any(Object),
      isValid: true,
      errors: [],
      variables: new Map([
        ["message", { name: "message", type: "string", value: "" }],
      ]),
    });
  });

  it("should produce ZPL with variable substitutions", () => {
    const parser = zpl`label Name(message: string) { ^XA^FO50,50^FDmessage^FS^XZ }`;
    parser.parse();
    parser.variables.set("message", {
      name: "message",
      type: "string",
      value: "Hello, World!",
    });
    const result = parser.produce();
    expect(result).toEqual<string>(`^XA^FO50,50^FDHello, World!^FS^XZ`);
  });

  it("should return invalid result for malformed ZPL", () => {
    const parser = zpl`^XA^FO50,50^INVALID_COMMAND^FS^XZ`;
    const result = parser.parse();
    expect(result).toEqual<ParsedZPL>({
      label: expect.any(Object),
      isValid: false,
      errors: expect.arrayContaining([expect.stringContaining("")]),
      variables: new Map(),
    });
  });

  it("should handle empty input gracefully", () => {
    const parser = zpl``;
    const result = parser.parse();
    expect(result).toEqual<ParsedZPL>({
      label: expect.any(Object),
      isValid: false,
      errors: expect.arrayContaining(["Missing ^XA start command"]),
      variables: new Map(),
    });
  });

  it("should parse short label syntax", () => {
    const parser = zpl`label { ^XA^FO50,50^FDLabel^FS^XZ }`;
    const result = parser.parse();
    expect(result).toEqual<ParsedZPL>({
      label: expect.any(Object),
      isValid: true,
      errors: [],
      variables: new Map(),
    });
  });

  it("should handle ZPL without variable definitions", () => {
    const parser = zpl`label Name() { ^XA^FO50,50^FDStatic^FS^XZ }`;
    const result = parser.parse();
    expect(result).toEqual<ParsedZPL>({
      label: expect.any(Object),
      isValid: true,
      errors: [],
      variables: new Map(),
    });
  });

  it("should return an error for unmatched curly braces", () => {
    const parser = zpl`label Name(text: string) { ^XA^FO50,50^FD${"Hello"}`;
    const result = parser.parse();
    expect(result).toEqual<ParsedZPL>({
      label: expect.any(Object),
      isValid: false,
      errors: expect.arrayContaining(["Missing ^XA start command"]),
      variables: new Map(),
    });
  });
});
