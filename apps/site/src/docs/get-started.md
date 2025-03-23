# Get Started

You can get started right now by checking out the [Playground](/zpl-js/) or 
following one of the [Tutorials](/zpl-js/docs/getting-started/tutorials)! Or 
keep reading for general development tips.

## `zpl-js`

Install the library to start using it in your project.

```bash
$ pnpm add zpl-js
```

You're now ready to parse and render ZPL in your application! You can also use
the React hooks to generate and print labels with dynamic data.

### ZPL Parser and Renderer

You can use the ZPLParser and ZPLRenderer for label printing, previewing, and more.

```typescript
import { ZPLParser, ZPLRenderer } from "zpl-js";

// Parse ZPL II into a class we can work with
const zpl = "^XA^FO50,50^FDHello World^FS^XZ";
let parser = new ZPLParser(zpl);
const result = parser.parse();

// Render the parsed ZPL II code to an HTML canvas
const canvas = document.getElementById('canvas');
const renderer = new ZPLRenderer(canvas);
renderer.render(result.label)

// Use ZPL II code with variables to easily print dynamic data with the zpl tag
parser = zpl`label Name(message: string) { ^XA^FO50,50^FDmessage^FS^XZ }`;
parser.parse();
parser.variables.set("message", {
  name: "message",
  type: "string",
  value: "Hello, World!",
});
const finalZpl = parser.produce();

console.log(finalZpl);
// Output: ^XA^FO50,50^FDHello, World!^FS^XZ
```

### React hooks

Define a default printer at the app level, then easily print labels with
dynamic data from anywhere with a single hook.

```typescript jsx
// In App.tsx
import { PrinterProvider } from "zpl-js";

export const App = () => {
  const printer = {
    ip: "192.168.1.1",
    port: 6101
  }
  return (
    <PrinterProvider printer={printer}>
      {children}
    </PrinterProvider>
  )
};

// In Label.tsx
import { zpl } from 'zpl-js'

export const label = zpl`label Name(message: string) { ^XA^FO50,50^FDmessage^FS^XZ }`;

// In PrintScreen.tsx
import { useLabel, usePrint } from "zpl-js";
import { label } from './labels'

export const PrintScreen = () => {
  const print = usePrint(label, {
    message: "Hello, world"
  });
  
  return (
    <button onClick={print}>Print</button>
  );
};
```
