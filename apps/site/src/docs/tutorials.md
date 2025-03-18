# Tutorials

## A React label printing app

Let's see what it takes to build a quick React app that can print a barcode
label to a network printer based on some form data.

### Installation

For this exercise, let's [scaffold a basic app with Vite](https://vite.dev/guide/#scaffolding-your-first-vite-project):

```bash
# Create the project
pnpm create vite label-printing-app --template react-ts

# Install dependencies
cd label-printing-app
pnpm install

# Add zpl-js
pnpm add zpl-js
```

For a more cohesive style, replace the contents of `App.css` with the following:

<details>
    <summary>Expand to see CSS code</summary>

```css
#root {
  max-width: 1280px;
  margin: 0 auto;
  text-align: center;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 400px;
}

.card > * {
  margin-bottom: 1em;
}

.card > input {
  padding: 0.5em;
  font-size: 1em;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.card > button {
  width: 100%;
  margin-top: 1em;
  border: 1px solid #ccc;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  font-size: 1em;
  text-align: left;
  line-height: 1.5;
  padding: 0;
  border-radius: 4px;
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  width: 100%;
  overflow: hidden;
}

@media (prefers-color-scheme: dark) {
  code {
    background-color: #242424;
    color: #fff;
    border-color: #242424;
  }
}

pre {
  overflow: auto;
  padding: 0 1em;
  text-align: left;
}
```
</details>

### Add PrinterProvider

The first thing we should do is wrap our app with a `PrinterProvider`, which will
allow us to access our printer configuration from anywhere in the app. You can
replace you the `main.tsx` file with the code below.

```typescript jsx
// main.tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PrinterProvider, Printer } from 'zpl-js';

// If you want to print to a physical printer, you can enter its address and port.
// Otherwise, use localhost:3000 to print to the zpl-js Playground (more on that later).
const printer = new Printer('print1', 'localhost', 3000, '', '');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <PrinterProvider printer={printer}>
          <App />
      </PrinterProvider>
  </StrictMode>,
)
```

### Create a label template

Let's define a simple label template using the `zpl` tag. You can add this directly to the default App.tsx file.

```typescript jsx
// In App.tsx
import { jsx } from "zpl-js";

const labelTemplate = zpl`
label Nametag(message: string) { 
    ^XA
    ^CF0,60
    ^FO50,50
    ^FDmessage^FS
    ^FO50,150
    ^BY5,2,270
    ^BQ^FDmessage^FS
    ^XZ 
}`;
```

Let's use the `useLabel` hook to reference our new label template from a React 
component. Replace the contents of the `App` component with this:

```typescript jsx
function App() {
  const label = useLabel({
    zpl: labelTemplate,
    variables: { message: 'John Zebra' } // We'll hook this up to an input soon
  });
  
  const [zpl, setZpl] = useState(''); // For storing the final ZPL code
  
  useEffect(() => {
    setZpl((label?.produce() || '').replace(/ \^/g, '\n^')); // Show each command group on its own line
  }, [label]);

  return (
    <div className="card">
      <h2>Label Print Demo</h2>
      <pre><code>{zpl}</code></pre>
    </div>
  )
}
```

When you run the app, you should see the ZPL code with the variable substituted in.

### Let's make it a form

In practice, you'll want to print dynamic data. Let's write a simple form to collect
a name and print a name tag label.

```typescript jsx
function App() {
  const [text, setText] = useState('John Zebra');

  const label = useLabel({
    zpl: labelTemplate,
    variables: { message: text }
  });

  const [zpl, setZpl] = useState('');

  useEffect(() => {
    setZpl((label?.produce() || '').replace(/ \^/g, '\n^'));
  }, [label, text]);

  return (
    <form className="card">
      <h2>ZPL JS Label Print Demo</h2>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={text} onChange={e => setText(e.target.value)} autoComplete="name" />
      <label>ZPL Output</label>
      <code><pre>{zpl}</pre></code>
    </form>
  )
}
```

Now, when you change the value in the field, you should see the ZPL output
change!

### Print your label!

We're going to introduce the `usePrint` hook to easy print to our configured printer.

> [!Tip]
> Try printing your labels in the [ZPL JS Playground](https://tomoeste.github.io/zpl-js/). In your terminal, run
> `pnpx zpl-js-listener`. Then enable **live print** mode in the Playground. If
> you configured your printer with localhost:3000 in the `PrinterProvider`,
> you're ready to go!

```typescript jsx
function App() {
  const [text, setText] = useState('John Zebra');

  const label = useLabel({
    zpl: labelTemplate,
    variables: { message: text }
  });

  const [zpl, setZpl] = useState('');

  useEffect(() => {
    setZpl((label?.produce() || '').replace(/ \^/g, '\n^'));
  }, [label, text]);

  // Note that the `usePrint` hook has the same inputs as `useLabel`, but it
  // returns a print method you can call, which will trigger an HTTP Post request
  const print = usePrint({
    zpl: labelTemplate,
    variables: { message: text }
  });
  
  const [message, setMessage] = useState('');

  const onClick = useCallback(
    async () => {
      try {
        await print();
        setMessage('🚀 Label print request sent');
      } catch (e) {
        setMessage('❌ Error sending print request: ' + JSON.stringify(e))
      }
    },
    [print])

  return (
    <form className="card">
      <h2>ZPL JS Label Print Demo</h2>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" value={text} onChange={e => setText(e.target.value)} autoComplete="name" />
      <label>ZPL Output</label>
      <code><pre>{zpl}</pre></code>
      <button onClick={onClick} type="button">
        Print
      </button>
      <p>{message}</p>
    </form>
  )
}
```

> [!Note]
> You won't normally need to use both the `useLabel` and `usePrint` hooks together.
> We're only doing it here to view the final ZPL output on the page.

Congratulations! You just printed your first barcode label with zpl-js.
