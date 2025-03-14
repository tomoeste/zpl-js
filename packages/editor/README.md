# `zpl-js-editor`

`zpl-js-editor` is a React component with syntax highlighting and hover tips for 
ZPL II code. It's designed to be cross-browser compatible, though not intended for
mobile at this time.

> [!Note]
> This package is in alpha. Functionality is subject to change. Expect bugs and incomplete features.
 
## Getting started

Install the library to start using it in your project.

```console
$ pnpm add zpl-js-editor
```

This package exports the editor as a React component (a controlled textarea). You can use it like this:

```typescript jsx
// In Editor.tsx
import { useState, ChangeEvent } from 'react';
import ZplEditor from 'zpl-js-editor';

export const Editor = () => {
  const [zplInput, setZplInput] = useState('');

  const handleZplInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setZplInput(e.target.value);
  };
  
  return (
    <ZplEditor
      input={zplInput}
      onChange={handleZplInputChange}
    />
  );
};
```

### Live preview

To render a live preview next to the editor, you have to include a canvas element 
and render the ZPL using `zpl-js`.

```typescript jsx
// In Playground.tsx
import { useEffect, useRef, useState, ChangeEvent } from 'react';
import Editor from 'zpl-js-editor';
import { ZPLParser, ZPLRenderer } from 'zpl-js'

export const Playground = () => {
  const [zplInput, setZplInput] = useState('');
  const canvasRef = useRef(null);

  const handleZplInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setZplInput(e.target.value);
  };
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const parser = new ZPLParser(zpl);
    const renderer = new ZPLRenderer(canvas);

    const parsedZpl = parser.parse();
    if (parsedZpl.label) {
      renderer.render(parsedZpl.label);
    }
  }, [canvasRef, zplInput])

  return (
    <div>
      <Editor
        input={zplInput}
        onChange={handleZplInputChange}
      />
      <canvas ref={canvasRef} />
    </div>
  );
};
```

## License

It is free and open source under the MIT license.

This project is not affiliated with Zebra — Zebra, ZPL, and ZPL
II are registered trademarks of ZIH Corp.
