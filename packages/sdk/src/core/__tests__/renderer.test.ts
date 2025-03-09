import "jest-canvas-mock";

import { ZPLRenderer } from "../renderer";
import {
  BarcodeItem,
  GraphicBoxItem,
  Label,
  TextItem,
} from "../../types/types";

describe("ZPLRenderer", () => {
  let canvas: HTMLCanvasElement;

  beforeEach(() => {
    canvas = document.createElement("canvas");
  });

  test("should initialize with default options", () => {
    const renderer = new ZPLRenderer(canvas);
    expect(renderer).toBeDefined();
  });

  test("should render text item correctly", () => {
    const renderer = new ZPLRenderer(canvas);
    const label = new Label();
    label.items.push(
      new TextItem(10, 20, "Test Text", { fontName: "0", height: 12 })
    );

    renderer.render(label);
    const ctx = canvas.getContext("2d");
    expect(ctx?.fillStyle).toBe("#000000");
  });

  test("should render barcode item correctly", () => {
    const renderer = new ZPLRenderer(canvas);
    const label = new Label();
    label.items.push(new BarcodeItem(10, 20, "123456", "CODE128"));

    renderer.render(label);
    const ctx = canvas.getContext("2d");
    expect(ctx?.fillStyle).toBe("#000000");
  });

  test("should render graphic box item correctly", () => {
    const renderer = new ZPLRenderer(canvas);
    const label = new Label();
    label.items.push(new GraphicBoxItem(10, 20));

    renderer.render(label);
    const ctx = canvas.getContext("2d");
    expect(ctx?.fillStyle).toBe("#000000");
  });

  test("should respect orientation option when rendering", () => {
    const renderer = new ZPLRenderer(canvas, { orientation: "landscape" });
    const label = new Label();

    renderer.render(label);
    expect(canvas.width).not.toBe(canvas.height);
  });

  test("should clear canvas before rendering", () => {
    const renderer = new ZPLRenderer(canvas);
    const ctx = canvas.getContext("2d")!;
    jest.spyOn(ctx, "fillRect");

    const label = new Label();
    renderer.render(label);

    expect(ctx.fillRect).toHaveBeenCalled();
  });

  test("should apply scaling based on DPI", () => {
    const renderer = new ZPLRenderer(canvas, { dpi: "300" });
    const ctx = canvas.getContext("2d")!;
    jest.spyOn(ctx, "scale");

    const label = new Label();
    renderer.render(label);

    expect(ctx.scale).toHaveBeenCalledWith(
      expect.any(Number),
      expect.any(Number)
    );
  });
});
