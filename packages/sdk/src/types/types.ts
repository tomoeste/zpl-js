export interface Position {
  x: number;
  y: number;
}

export interface ParsedZPL {
  /**
   * The parsed label content, null if parsing failed
   */
  label: Label | null;

  /**
   * Indicates whether the ZPL string was valid and successfully parsed
   */
  isValid?: boolean;

  /**
   * Optional array of error messages if parsing failed
   */
  errors?: string[];

  /**
   * Variables to be merged into the final ZPL string
   */
  variables?: Map<string, Variable>;
}

export interface Variable {
  name: string;
  type: VariableType;
  value: string;
}

export type VariableType = "string" | "number" | "boolean";

export interface LayoutItem {
  type: string;
  x: number;
  y: number;
  fieldReversed?: boolean;
}

export interface BarcodeDefaults {
  moduleWidth: number; // 1 to 10, default 2
  wideBarToNarrowRatio: number; // 2.0 to 3.0, default 3.0
  height: number; // default 10
}

export type BarcodeOrientation = "N" | "R" | "I" | "B";

export interface BarcodeCode39Options {
  orientation: BarcodeOrientation;
  mod43CheckDigit: boolean;
  height: number;
  printInterpretationLine: boolean;
  interpretationLineAboveCode: boolean;
  defaults?: BarcodeDefaults; // Add defaults from BY command
}

export interface BarcodeCode128Options {
  orientation: BarcodeOrientation; // N, R, I, B
  height: number; // 1 to 32000 dots
  printInterpretationLine: boolean; // Y/N
  interpretationLineAboveCode: boolean; // Y/N
  uccCheckDigit: boolean; // Y/N (Mod 10 check digit, Mod 103 always on)
  mode: "N" | "U" | "A" | "D"; // Normal, UCC Case, Automatic, UCC/EAN Mode
  defaults?: BarcodeDefaults; // From ^BY command
}

export interface BarcodeRenderOptions {
  width?: number;
  height?: number;
  moduleWidth?: number;
  wideBarWidth?: number;
  displayValue?: boolean;
  background?: string;
  lineColor?: string;
}

export class BarcodeItem {
  readonly type = "Barcode";
  fieldReversed?: boolean;
  fieldHex?: boolean;
  private static defaultBarcodeSettings: BarcodeDefaults = {
    moduleWidth: 2,
    wideBarToNarrowRatio: 3.0,
    height: 10,
  };

  private label?: Label;

  constructor(
    public x: number,
    public y: number,
    public data: string,
    public barcodeType: string,
    public options?: BarcodeCode39Options | BarcodeCode128Options | null,
    public renderOptions?: BarcodeRenderOptions,
    label?: Label,
    fieldReversed?: boolean,
    fieldHex?: boolean
  ) {
    this.label = label;
    this.fieldReversed = fieldReversed;
    this.fieldHex = fieldHex;
  }

  public getRenderOptions(): BarcodeRenderOptions {
    // First try options.defaults (from BY command), then label defaults, then static defaults
    const defaults =
      this.options?.defaults ||
      this.label?.barcodeDefaults ||
      BarcodeItem.defaultBarcodeSettings;

    const height = this.options?.height || defaults.height;

    return {
      width: defaults.moduleWidth,
      height: height,
      displayValue: this.options?.printInterpretationLine ?? true,
      ...this.renderOptions,
      // Calculate wide bar width based on ratio
      moduleWidth: defaults.moduleWidth,
      wideBarWidth: Math.round(
        defaults.moduleWidth * defaults.wideBarToNarrowRatio
      ),
    };
  }

  public getProcessedData(): string {
    // Ensure Code 39 barcodes have start/stop characters
    if (this.barcodeType === "code39") {
      return `*${this.data}*`;
    }
    return this.data;
  }

  public getOrientation(): BarcodeOrientation {
    return this.options?.orientation || "N";
  }
}

export interface FontSettings {
  fontName: string;
  height?: number;
  width?: number;
  orientation?: string;
}

export class Label {
  items: LayoutItem[] = [];
  homePosition: Position = { x: 0, y: 0 };
  defaultFont: FontSettings = {
    fontName: "0",
    orientation: "N",
  };
  barcodeDefaults?: BarcodeDefaults;
}

export class TextItem implements LayoutItem {
  type = "Text";
  x: number;
  y: number;
  fieldReversed?: boolean;
  fieldHex?: boolean;
  data: string;
  font: FontSettings;
  blockFormat?: TextBlockFormat;

  constructor(
    x: number,
    y: number,
    data: string,
    font: FontSettings,
    blockFormat?: TextBlockFormat,
    fieldReversed?: boolean,
    fieldHex?: boolean
  ) {
    this.x = x;
    this.y = y;
    this.data = data;
    this.font = { ...font };
    this.blockFormat = blockFormat;
    this.fieldReversed = fieldReversed;
    this.fieldHex = fieldHex;
  }
}

export interface TextBlockFormat {
  width: number;
  maxLines: number;
}

export class GraphicBoxItem implements LayoutItem {
  type = "GraphicBox";
  x: number;
  y: number;
  fieldReversed?: boolean;
  width: number;
  height: number;
  thickness: number;
  color: "B" | "W";
  roundedness: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.thickness = 0;
    this.color = "B";
    this.roundedness = 0;
  }
}

export class Printer {
  private _id: string;
  private _ip: string;
  private _port: number;
  private _name: string;
  private _description: string;

  constructor(
    id: string,
    ip: string,
    port: number,
    name: string,
    description: string
  ) {
    this._id = id;
    this._ip = ip;
    this._port = port;
    this._name = name;
    this._description = description;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get ip() {
    return this._ip;
  }

  get port() {
    return this._port;
  }

  public print(zpl: string | undefined): Promise<Response> {
    if (!zpl) return Promise.reject("zpl is required");
    return fetch(`http://${this._ip}:${this._port}/printer/pstprnt`, {
      method: "POST",
      body: zpl,
      headers: {
        "Content-Type": "text/plain",
        "Content-Length": zpl.length.toString(),
      },
    });
  }
}
