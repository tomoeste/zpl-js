import { FC, createContext, useState, ReactNode } from "react";
import { Printer } from "../types/types";

/**
 * PrinterContext is a React context object designed to hold and provide access
 * to a Printer instance. It enables components within the
 * same context provider tree to share and access the printer configuration or settings.
 */
export const PrinterContext = createContext<Printer | undefined>(undefined);

type PrinterProviderProps = {
  children: ReactNode;
  printer: Printer;
};

/**
 * PrinterProvider is a functional component that provides a context for managing
 * a printer instance within its child components. It sets up a context provider
 * to supply the current printer instance to the component tree.
 */
export const PrinterProvider: FC<PrinterProviderProps> = ({
  children,
  printer,
}) => {
  const [value] = useState<Printer>(printer);

  return (
    <PrinterContext.Provider value={value}>{children}</PrinterContext.Provider>
  );
};
