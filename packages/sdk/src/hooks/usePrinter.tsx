import { Printer } from "../types/types";
import { useContext } from "react";
import { PrinterContext } from "./PrinterProvider";

/**
 * A custom hook that provides access to the current Printer context.
 *
 * This hook retrieves the Printer context using the useContext hook. It ensures
 * that the hook is only called within a valid Provider by throwing an error
 * if the context is undefined. This typically occurs if the hook is called
 * outside of a PrinterProvider.
 */
export const usePrinter = (): Printer => {
  const context: Printer = useContext(PrinterContext);
  if (context === undefined) {
    throw new Error("usePrinter must be used within a PrinterProvider");
  }
  return context;
};
