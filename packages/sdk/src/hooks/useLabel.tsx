import { useEffect, useState } from "react";
import { ZPLParser } from "../core/parser";
import { ParsedZPL } from "../types/types";

type Props = {
  zpl: ZPLParser;
  variables: Record<string, string>;
};

/**
 * A custom hook that processes and outputs a parsed ZPL (Zebra Programming Language) string based on given input and variables.
 *
 * @function
 * @param {Object} props - The input properties.
 * @param {Object} props.zpl - The ZPL parser or object containing ZPL parsing and producing methods.
 * @param {Object} props.variables - A mapping of variable keys to corresponding values for substitution within the ZPL template.
 * @returns {string} The updated ZPL output as a string after parsing input and applying variables.
 *
 * @remarks
 * - The hook uses React state (`useState`) to manage the parsed ZPL object and the resulting ZPL string.
 * - It performs side effects using React's `useEffect` whenever `zpl` or `variables` values change.
 * - The ZPL variables are modified with the provided values for producing the final output string.
 */
export const useLabel = ({ zpl, variables }: Props) => {
  if (!zpl) return;

  const [parsedZpl, setParsedZpl] = useState<ParsedZPL | null>(null);
  const [zplOutput, setZplOutput] = useState<string>("");

  useEffect(() => {
    if (!parsedZpl) setParsedZpl(zpl.parse());
  }, [zpl, parsedZpl]);

  useEffect(() => {
    if (parsedZpl) {
      const vars = parsedZpl.variables;
      // TODO: Do this immutably
      Object.keys(variables).forEach((key) => {
        if (vars.has(key)) vars.get(key).value = variables[key];
      });
      setZplOutput(zpl.produce());
    }
  }, [parsedZpl, variables]);

  return zplOutput;
};
