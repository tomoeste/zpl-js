<br />
<div align="center">
  <a href="https://tomoeste.github.io/zpl-js/" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="./zpl-js-dark.svg">
      <img alt="ZPL JS" src="./zpl-js.svg">
    </picture>
  </a>
  <p align="center">
    ZPL II in TypeScript/JavaScript  
  </p>
  <a href="https://tomoeste.github.io/zpl-js/" target="_blank"><strong>Explore the playground »</strong></a>  
</div>

## About the project

**ZPL × JS** is for working with the ZPL II
barcode label printing language in TypeScript and JavaScript. Here are the highlights:

- **Native JS ZPL parser and renderer** that runs entirely in the browser.
- **ZPL code editor for browsers** with highlighting, hover tips, and live preview 
(see the [Playground](https://tomoeste.github.io/zpl-js/)).
- **In-browser ZPL printer emulator** via HTTP Post.
- **React hooks** to create and print ZPL label templates with dynamic data.

### ZPL?

ZPL II is a language that's used for printing barcode labels 
using special printers, like those made by Zebra. While it's a simple 
language, it can be a pain to work with if you don't have expensive 
software to design with.

### How many commands does this support?

For rendering (e.g., live preview), this library implements a core 
set of ZPL II commands. I plan to add more commands over time. In the docs, you can find an up-to-date
[list of supported and unsupported commands](https://tomoeste.github.io/zpl-js/?redirect=docs/playground/supported-commands).

The code editor works with all valid commands, though the hover tips
will be incomplete for some. The React SDK also works with all commands, 
since it mainly merges data into a ZPL template to create the full label code.

### Try it live

In the Playground, you can use the ZPL editor to preview label code, and even preview print 
requests sent via HTTP Post!

[https://tomoeste.github.io/zpl-js](https://tomoeste.github.io/zpl-js/)

## Getting started

Check out a specific package to learn more about getting started:

1. [`zpl-js`](/packages/sdk#readme) The ZPL II parser and renderer code, along with the React hooks and provider.
2. [`zpl-js-editor`](/packages/editor#readme) The browser code editor with syntax highlighting and hover tips.
3. [`zpl-js-listener`](/packages/listener#readme) A tiny CLI tool to proxy HTTP Post print requests to a WebSocket 
connection. This lets you preview labels printed from another app or device!
4. [`site`](/apps/site#readme) The live playground and docs site.

## License

All code is distributed under the [MIT](/LICENSE) license. 

This project is not affiliated with Zebra — Zebra, ZPL, and ZPL 
II are registered trademarks of ZIH Corp.
