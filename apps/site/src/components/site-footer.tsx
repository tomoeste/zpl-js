export function SiteFooter() {
  return (
    <footer className="border-grid border-t p-0 md:p-6 md:py-0">
      <div className="container-wrapper">
        <div className="container py-4">
          <div className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by{" "}
            <a
              href="https://github.com/tomoeste/"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Tom Oeste
            </a>
            . The source code is available on{" "}
            <a
              href="https://github.com/tomoeste/zpl-js"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              GitHub
            </a>
            . Zebra, ZPL, and ZPL II are registered trademarks of ZIH Corp.
          </div>
        </div>
      </div>
    </footer>
  );
}
