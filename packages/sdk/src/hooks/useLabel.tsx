import { useEffect } from "react";
import { ZPLParser } from "../core/parser";

type UseLabelProps = {
  zpl: ZPLParser;
  variables: Record<string, string>;
};

/**
 * A hook that processes and outputs a parsed ZPL object based on given input and variables.
 *
 * @function
 * @param {Object} props - The input properties.
 * @param {Object} props.zpl - The ZPL parser or object containing ZPL parsing and producing methods.
 * @param {Object} props.variables - A mapping of variable keys to corresponding values for substitution within the ZPL template.
 * @returns {Object} The parsed ZPL object. Call `produce` to generate a printable string.
 */
export const useLabel = ({ zpl, variables }: UseLabelProps) => {
  if (!zpl) return;

  useEffect(() => {
    try {
      zpl.parse();
    } catch (e) {
      console.error("Error parsing ZPL", zpl, e);
    }
  }, [zpl]);

  useEffect(() => {
    if (variables) {
      const vars = zpl.variables;
      if (vars)
        Object.keys(variables).forEach((key) => {
          if (vars.has(key))
            vars.set(key, {
              ...vars.get(key)!,
              value: variables[key],
            });
        });
    }
  }, [zpl, variables]);

  return zpl;
};
