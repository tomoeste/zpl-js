# Limitations

There are some limitations in the current implementation of the ZPL parsing
and rendering code. Check the [supported commands](/zpl-js/docs/playground/supported-commands)
page to see which ZPL II commands are supported in the current release.

One known limitation of note is that Code 128 subsets are implemented very 
specifically in ZPL II (see the [ZPL II guide](https://www.zebra.com/content/dam/support-dam/en/documentation/unrestricted/guide/software/zpl-zbi2-pg-en.pdf#page=94)).
While it seems possible to implement the same functionality in zpl-js (using the [bwip-js](https://github.com/metafloor/bwip-js) library),
it will take some work and therefore time.
