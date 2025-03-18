# Live print

Live print mode turns the [Playground](/zpl-js/) into a label printer emulator in your browser.
There is a companion CLI tool called `zpl-js-listener` that proxies HTTP Post 
print requests to the Playground to be rendered. 

All you need to do to start seeing labels in live print mode is run 
`pnpx zpl-js-listener` from your terminal and flip the live mode toggle in the 
Playground. You can pass in different host, port, or pathname flags to suit your
environment.

Once you flip the live print toggle, the Playground will try to connect to the 
`zpl-js-listener`. It will notify you if it connects, and the toggle will turn 
green. At that point, you can send an HTTP Post print request from your app.

> [!Tip]
> If you want to print from a different device, make sure that you open any
> ports needed by the `zpl-js-listener` first. 
