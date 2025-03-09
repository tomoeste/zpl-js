# ZPL × JS

**ZPL × JS** is a library for working with the ZPL II
barcode label printing language in TypeScript and JavaScript.
Some of the features include a browser code editor with
highlighting, hover tips, and live preview, 
a printer emulator for HTTP Post, and a React SDK to create
and print label templates with dynamic data.

### ZPL?

ZPL II is a language that's used for printing barcode labels 
using special printers, like those made by Zebra. It's a simple 
language, but a pain to work with if you don't have expensive 
software to design the labels with.

### How many commands does this support?

For rendering and previews, this library only implements a core 
set of the commands, particularly in the alpha release. I do plan 
to implement all relevant commands (e.g., those related to printing 
and barcodes, as opposed to network).

The code editor will work with all valid commands, though the hover tips
will be incomplete for some. The React SDK will work with all commands, 
since it merges data into the ZPL template to create the label code.

## Packages

There are four packages in this repository. Each has a README with more
specific information about getting started:

1. `zpl-js` The ZPL II parser and renderer code, along with the React SDK.
2. `zpl-js-editor` The browser code editor with syntax highlighting and hover tips.
3. `zpl-js-listener` A tiny CLI tool to proxy HTTP Post print requests to a WebSocket 
connection. This lets you preview labels directly from another app or device!
4. `site` The live playground and docs site.

## License

It is free and open source under the MIT license. 

This project is not affiliated with Zebra — Zebra, ZPL, and ZPL 
II are registered trademarks of ZIH Corp.
