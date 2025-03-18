import { ZPLParser } from "../core/parser";
import { usePrinter } from "./usePrinter";
import { useLabel } from "./useLabel";

type Props = {
  zpl: ZPLParser;
  variables: Record<string, string>;
};

/**
 * A custom hook that creates a printing action using the provided properties.
 *
 * This hook utilizes a printer instance and a label derived from the given props.
 * It returns a function that, when executed, performs the print operation with the generated label.
 */
export const usePrint = (props: Props) => {
  const printer = usePrinter();
  const label = useLabel(props);
  return () => {
    try {
      return printer.print(label?.produce());
    } catch (e) {
      console.error("Error printing ZPL", label, e);
    }
  };
};
