import { Variable, VariableType } from "../types/types";
import { ZPLParser } from "./parser";
import { ZplJsConfig } from "./config";

const fullPattern =
  /^label\s+(?<name>[a-zA-Z0-9\-_]+)\((?<params>.*)\)\s*\{(?<zpl>.*)}$/;
const shortPattern = /^label\s+(?<name>[a-zA-Z0-9\-_]+)?\s*\{(?<zpl>.*)}$/;

/**
 * Tag function for parsing ZPL with variables
 */
export function zpl(
  strings: TemplateStringsArray,
  ...values: any[]
): ZPLParser {
  let parser: ZPLParser | null = null;

  let input = strings
    .reduce((result, str, i) => result + str + (values[i] ?? ""), "")
    .replace(/\n/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (input.length > ZplJsConfig.zplMaxLength) {
    console.warn(
      `ZPL string will be truncated to ${ZplJsConfig.zplMaxLength} characters.`
    );
  }

  input = input.substring(0, ZplJsConfig.zplMaxLength);

  if (fullPattern.test(input)) {
    // Handle case where label Name(...) {...}
    const results = fullPattern.exec(input);
    if (!results?.groups) throw new Error("Invalid ZPL");
    const name = results.groups.name;
    const params = results.groups.params.split(",").reduce((map, p) => {
      if (!p) return map;
      const [key, value] = p.split(":");
      const name = key.trim();
      const type: VariableType = ["string", "number", "boolean"].includes(
        value.trim()
      )
        ? (value.trim() as VariableType)
        : "string";

      map.set(name, { name, type, value: "" } as Variable);
      return map;
    }, new Map<string, Variable>());
    const zpl = results.groups.zpl;

    parser = new ZPLParser(zpl);
    parser.name = name;
    parser.variables = params;
  } else if (shortPattern.test(input)) {
    // Handle case where label Name{...} or label {...} syntax is used
    const results = shortPattern.exec(input);
    if (!results?.groups) throw new Error("Invalid ZPL");
    const name = results.groups.name || "Label";
    const zpl = results.groups.zpl;

    parser = new ZPLParser(zpl);
    parser.name = name;
  } else {
    // Handle case where plain ZPL is used
    parser = new ZPLParser(input);
  }

  return parser;
}
