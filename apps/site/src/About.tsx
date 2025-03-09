import { SiteFooter } from "@/components/site-footer.tsx";
import { Link } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components/ui/accordion";

export default function About() {
  return (
    <div className="flex flex-col h-full p-2 bg-sidebar">
      <title>About - ZPL × JS</title>
      <div className="flex flex-col h-full drop-shadow-md rounded-xl bg-white dark:bg-black">
        <div className="flex flex-col h-full p-6 px-10 max-w-3xl">
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue={"item-1"}
          >
            <AccordionItem value="item-1">
              <AccordionTrigger className="scroll-m-20 text-xl font-extrabold tracking-tight">
                What is this project?
              </AccordionTrigger>
              <AccordionContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  <b>ZPL × JS</b> is a library for working with the ZPL II
                  barcode label printing language in TypeScript and JavaScript.
                  Some of the features include a browser code editor with
                  highlighting, hover tips, and live preview (see the{" "}
                  <Link to={"/"} className="underline underline-offset-4">
                    Playground
                  </Link>
                  ), a printer emulator for HTTP Post, and a React SDK to create
                  and print label templates with dynamic data.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  It is free and open source and runs entirely in the browser.
                  This project is not affiliated with Zebra — Zebra, ZPL, and
                  ZPL II are registered trademarks of ZIH Corp.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6"></p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger className="scroll-m-20 text-xl font-extrabold tracking-tight">
                Why ZPL?
              </AccordionTrigger>
              <AccordionContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  ZPL II is a language that&apos;s used for printing barcode
                  labels using special printers, like those made by Zebra.
                  It&apos;s a simple language, but a pain to work with if you
                  don&apos;t have expensive software to design the labels with.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  In another life, I worked with ZPL all the time, and I hated
                  not having a good IDE for it. This started as a hobby project
                  for a ZPL browser IDE, but I intend to develop it into a more
                  complete library.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger className="scroll-m-20 text-xl font-extrabold tracking-tight">
                Does this handle all ZPL II commands?
              </AccordionTrigger>
              <AccordionContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  For rendering and previews, this library only implements a
                  core set of the commands, particularly in the alpha release. I
                  do plan to implement all relevant commands (e.g., those
                  related to printing and barcodes, as opposed to RFID). The
                  full list of currently supported commands is available{" "}
                  <Link
                    to={"/docs/supported-commands"}
                    className="underline underline-offset-3 hover:no-underline"
                  >
                    here
                  </Link>
                  .
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  The code editor will work with all valid commands, though the
                  hover tips will be incomplete for some. The React SDK will
                  work with all commands, since it merges data into the ZPL
                  template to create the label code.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger className="scroll-m-20 text-xl font-extrabold tracking-tight">
                Can I use something from the website or code?
              </AccordionTrigger>
              <AccordionContent>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Yes. The source code is all MIT licensed, and you can use it
                  for whatever you want.
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  <i>
                    Zebra, ZPL, and ZPL II are registered trademarks of ZIH
                    Corp.
                  </i>
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <SiteFooter />
      </div>
    </div>
  );
}
