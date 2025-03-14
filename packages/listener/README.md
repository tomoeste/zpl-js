# `zpl-js-listener`

`zpl-js-listener` is a tiny CLI tool to proxy HTTP Post print requests to a WebSocket
connection. This lets you preview labels directly from another app or device!

## Getting started

You can directly run the listener or install it locally:

```console
# Run without installing
$ pnpx zpl-js-listener

# Install locally and run
$ pnpm add zpl-js-listener
$ pnpm zpl-js-listener
```

The HTTP and WebSocket servers are listed in the console output:

```console
$ pnpx zpl-js-listener

ZPL×JS Listener v1.0.0
proxy ZPL print requests to WebSocket clients

  ➜  HTTP server: http://127.0.0.1:3000
  ➜  WebSocket server: ws://127.0.0.1:8080
All servers started successfully
```

You can optionally pass in flags to set the HTTP and Websocket ports using `-p` and `-w`:

```console
$ pnpx zpl-js-listener -p 3001 -w 8081

ZPL×JS Listener v1.0.0
proxy ZPL print requests to WebSocket clients

  ➜  HTTP server: http://127.0.0.1:3001
  ➜  WebSocket server: ws://127.0.0.1:8081
All servers started successfully
```

## License

It is free and open source under the MIT license.

This project is not affiliated with Zebra — Zebra, ZPL, and ZPL
II are registered trademarks of ZIH Corp.
