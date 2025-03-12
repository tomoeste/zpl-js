import {
  ParsedZPL,
  Label,
  TextItem,
  BarcodeItem,
  FontSettings,
  TextBlockFormat,
  BarcodeCode39Options,
  BarcodeDefaults,
  GraphicBoxItem,
  BarcodeCode128Options,
  Variable,
} from "../types/types";
import { ZPLCommands, ZPLCommand } from "../types/zpl-commands";

export class ZPLParser {
  private label: Label;
  private currentFont: FontSettings;

  private currentX = 0;
  private currentY = 0;
  private labelHomeX = 0;
  private labelHomeY = 0;
  private currentBlockFormat: TextBlockFormat | undefined;
  private isBarcodeMode = false;
  private isFieldReverseMode = false;
  private isFieldHexMode = false;
  private barcodeType = "";
  private currentBarcodeOptions:
    | BarcodeCode39Options
    | BarcodeCode128Options
    | null = null;
  private zplInput = "";
  private result: ParsedZPL = {
    label: null,
    isValid: false,
    errors: [],
  };
  public name: string = "Label";
  public variables: Map<string, Variable> = new Map();

  public constructor(zpl: string) {
    this.zplInput = zpl.trim().replace(/\r\n/g, "\n");
    this.label = new Label();
    this.currentFont = { ...this.label.defaultFont };
  }

  private isValidCommand(command: string): command is ZPLCommand {
    return command in ZPLCommands;
  }

  private parseCode128Parameters(paramString: string): BarcodeCode128Options {
    const params = paramString.split(",");
    const defaults: BarcodeCode128Options = {
      orientation: "N",
      height: 0, // Will use ^BY value if not specified
      printInterpretationLine: true,
      interpretationLineAboveCode: false,
      uccCheckDigit: false,
      mode: "A", // Default to Automatic mode
    };

    // Process orientation (o)
    if (params.length > 0 && params[0]) {
      defaults.orientation = this.validateOrientation(params[0]);
    }

    // Process height (h)
    if (params.length > 1 && params[1]) {
      const height = parseInt(params[1], 10);
      if (height >= 1 && height <= 32000) {
        defaults.height = height;
      } else {
        throw new Error("Barcode height must be between 1 and 32000 dots");
      }
    }

    // Process print interpretation line (f)
    if (params.length > 2 && params[2]) {
      defaults.printInterpretationLine = params[2].toUpperCase() === "Y";
    }

    // Process interpretation line above code (g)
    if (params.length > 3 && params[3]) {
      defaults.interpretationLineAboveCode = params[3].toUpperCase() === "Y";
    }

    // Process UCC check digit (e)
    if (params.length > 4 && params[4]) {
      defaults.uccCheckDigit = params[4].toUpperCase() === "Y";
    }

    // Process mode (m)
    if (params.length > 5 && params[5]) {
      const mode = params[5].toUpperCase();
      switch (mode) {
        case "N":
          defaults.mode = "N";
          break;
        case "U":
          defaults.mode = "U";
          break;
        case "A":
          defaults.mode = "A";
          break;
        case "D":
          defaults.mode = "D";
          break;
        default:
          throw new Error("Invalid Code 128 mode. Must be N, U, A, or D");
      }
    }

    return defaults;
  }

  private parseCode39Parameters(paramString: string): BarcodeCode39Options {
    const params = paramString.split(",");
    const defaults: BarcodeCode39Options = {
      orientation: "N",
      mod43CheckDigit: false,
      height: 0, // Will use ^BY value
      printInterpretationLine: true,
      interpretationLineAboveCode: false,
    };

    // Only process parameters if they exist
    if (params.length > 0 && params[0]) {
      defaults.orientation = this.validateOrientation(params[0]);
    }
    if (params.length > 1 && params[1]) {
      defaults.mod43CheckDigit = params[1].toUpperCase() === "Y";
    }
    if (params.length > 2 && params[2]) {
      const height = parseInt(params[2], 10);
      if (height >= 1 && height <= 32000) {
        defaults.height = height;
      } else {
        throw new Error("Barcode height must be between 1 and 32000 dots");
      }
    }
    if (params.length > 3 && params[3]) {
      defaults.printInterpretationLine = params[3].toUpperCase() === "Y";
    }
    if (params.length > 4 && params[4]) {
      defaults.interpretationLineAboveCode = params[4].toUpperCase() === "Y";
    }

    return defaults;
  }

  private validateOrientation(orientation: string): "N" | "R" | "I" | "B" {
    const validOrientations = ["N", "R", "I", "B"];
    const upperOrientation = orientation.toUpperCase();

    if (validOrientations.includes(upperOrientation)) {
      return upperOrientation as "N" | "R" | "I" | "B";
    }
    throw new Error("Invalid orientation value. Must be N, R, I, or B");
  }

  private parseBYParameters(paramString: string): BarcodeDefaults {
    const params = paramString.split(",");
    const defaults: BarcodeDefaults = {
      moduleWidth: 2,
      wideBarToNarrowRatio: 3.0,
      height: 10,
    };

    // Module width (w)
    if (params.length > 0 && params[0]) {
      const width = parseInt(params[0], 10);
      if (width >= 1 && width <= 10) {
        defaults.moduleWidth = width;
      } else {
        throw new Error("Module width must be between 1 and 10 dots");
      }
    }

    // Wide bar to narrow bar ratio (r)
    if (params.length > 1 && params[1]) {
      const ratio = parseFloat(params[1]);
      if (ratio >= 2.0 && ratio <= 3.0) {
        defaults.wideBarToNarrowRatio = ratio;
      } else {
        throw new Error(
          "Wide bar to narrow bar ratio must be between 2.0 and 3.0"
        );
      }
    }

    // Height (h)
    if (params.length > 2 && params[2]) {
      const height = parseInt(params[2], 10);
      if (height > 0) {
        defaults.height = height;
      } else {
        throw new Error("Height must be greater than 0");
      }
    }

    return defaults;
  }

  private handleCommandNotImplemented() {
    throw new Error("Command not implemented");
  }

  private handleB3 = (paramString: string) => {
    this.isBarcodeMode = true;
    this.barcodeType = "CODE39";
    this.currentBarcodeOptions = this.parseCode39Parameters(paramString);
  };

  private handleBC = (paramString: string) => {
    this.isBarcodeMode = true;
    this.barcodeType = "CODE128";
    this.currentBarcodeOptions = this.parseCode128Parameters(paramString);
  };

  private handleBY = (paramString: string) => {
    this.label.barcodeDefaults = this.parseBYParameters(paramString);
  };

  private handleCF = (paramString: string) => {
    const params = paramString.replace(/\^FS$/, "").split(",");

    if (params.length < 1) {
      throw new Error("^CF command requires at least font name parameter");
    }

    this.currentFont = {
      fontName: params[0],
      height: params.length > 1 ? parseInt(params[1], 10) : undefined,
      width: params.length > 2 ? parseInt(params[2], 10) : undefined,
    };
  };

  private handleFD = (paramString: string) => {
    const data = paramString.replace(/\^FS$/, "");
    if (!this.isBarcodeMode) {
      this.label.items.push(
        new TextItem(
          this.currentX,
          this.currentY,
          data,
          this.currentFont,
          this.currentBlockFormat,
          this.isFieldReverseMode,
          this.isFieldHexMode
        )
      );
    } else {
      // TODO: Pass current font to barcode for use in interpretation line
      this.label.items.push(
        new BarcodeItem(
          this.currentX,
          this.currentY,
          data,
          this.barcodeType,
          this.currentBarcodeOptions,
          this.label.barcodeDefaults,
          this.label,
          this.isFieldReverseMode,
          this.isFieldHexMode
        )
      );
      this.isBarcodeMode = false;
    }
    if (this.isFieldReverseMode) {
      this.isFieldReverseMode = false;
    }
    if (this.isFieldHexMode) {
      this.isFieldHexMode = false;
    }
  };

  private handleFO = (paramString: string) => {
    const params = paramString.split(",");
    if (params.length >= 2) {
      this.currentX = this.labelHomeX + parseInt(params[0], 10);
      this.currentY = this.labelHomeY + parseInt(params[1], 10);
    }
  };

  private handleFH = () => {
    this.isFieldHexMode = true;
  };

  private handleFR = () => {
    this.isFieldReverseMode = true;
  };

  private handleGB = (paramString: string) => {
    const params = paramString.split(",");
    const boxItem = new GraphicBoxItem(this.currentX, this.currentY);

    // Width
    if (params.length > 0 && params[0]) {
      const width = parseInt(params[0], 10);
      if (width >= 1 && width <= 32000) {
        boxItem.width = width;
      } else {
        throw new Error("Box width must be between 1 and 32000 dots");
      }
    }

    // Height
    if (params.length > 1 && params[1]) {
      const height = parseInt(params[1], 10);
      if (height >= 1 && height <= 32000) {
        boxItem.height = height;
      } else {
        throw new Error("Box height must be between 1 and 32000 dots");
      }
    }

    // Thickness
    if (params.length > 2 && params[2]) {
      const thickness = parseInt(params[2], 10);
      if (thickness >= 1 && thickness <= 32000) {
        boxItem.thickness = thickness;
      } else {
        throw new Error("Border thickness must be between 1 and 32000 dots");
      }
    }

    // Color
    if (params.length > 3 && params[3]) {
      const color = params[3].toUpperCase();
      if (color === "B" || color === "W") {
        boxItem.color = color;
      } else {
        throw new Error("Color must be B or W");
      }
    }

    // Roundedness
    if (params.length > 4 && params[4]) {
      const roundedness = parseInt(params[4], 10);
      if (roundedness >= 0 && roundedness <= 8) {
        boxItem.roundedness = roundedness;
      } else {
        throw new Error("Roundedness must be between 0 and 8");
      }
    }

    if (this.isFieldReverseMode) {
      boxItem.fieldReversed = true;
      this.isFieldReverseMode = false;
    }

    this.label.items.push(boxItem);
  };

  private handleLH = (paramString: string) => {
    const params = paramString.split(",");
    if (params.length >= 2) {
      const x = parseInt(params[0], 10);
      const y = parseInt(params[1], 10);

      // Validate the coordinates are within acceptable range (0-32000)
      if (x < 0 || x > 32000 || y < 0 || y > 32000) {
        throw new Error("^LH coordinates must be between 0 and 32000");
      }

      this.labelHomeX = x;
      this.labelHomeY = y;
    } else {
      throw new Error("^LH command requires both x and y coordinates");
    }
  };

  private handleNoOp() {}

  private zplCommandHandlers: Record<
    ZPLCommand,
    (paramString: string) => void
  > = {
    "^B3": this.handleB3,
    "^BC": this.handleBC,
    "^BY": this.handleBY,
    "^CF": this.handleCF,
    "^FD": this.handleFD,
    "^FH": this.handleFH,
    "^FO": this.handleFO,
    "^FR": this.handleFR,
    "^GB": this.handleGB,
    "^LH": this.handleLH,
    "^FS": this.handleNoOp,
    "^A": this.handleCommandNotImplemented,
    "^A@": this.handleCommandNotImplemented,
    "^B0": this.handleCommandNotImplemented,
    "^B1": this.handleCommandNotImplemented,
    "^B2": this.handleCommandNotImplemented,
    "^B4": this.handleCommandNotImplemented,
    "^B5": this.handleCommandNotImplemented,
    "^B7": this.handleCommandNotImplemented,
    "^B8": this.handleCommandNotImplemented,
    "^B9": this.handleCommandNotImplemented,
    "^BA": this.handleCommandNotImplemented,
    "^BB": this.handleCommandNotImplemented,
    "^BD": this.handleCommandNotImplemented,
    "^BE": this.handleCommandNotImplemented,
    "^BF": this.handleCommandNotImplemented,
    "^BI": this.handleCommandNotImplemented,
    "^BJ": this.handleCommandNotImplemented,
    "^BK": this.handleCommandNotImplemented,
    "^BL": this.handleCommandNotImplemented,
    "^BM": this.handleCommandNotImplemented,
    "^BO": this.handleCommandNotImplemented,
    "^BP": this.handleCommandNotImplemented,
    "^BQ": this.handleCommandNotImplemented,
    "^BR": this.handleCommandNotImplemented,
    "^BS": this.handleCommandNotImplemented,
    "^BT": this.handleCommandNotImplemented,
    "^BU": this.handleCommandNotImplemented,
    "^BX": this.handleCommandNotImplemented,
    "^BZ": this.handleCommandNotImplemented,
    "^CC": this.handleCommandNotImplemented,
    "^CD": this.handleCommandNotImplemented,
    "^CI": this.handleCommandNotImplemented,
    "^CM": this.handleCommandNotImplemented,
    "^CO": this.handleCommandNotImplemented,
    "^CT": this.handleCommandNotImplemented,
    "^CV": this.handleCommandNotImplemented,
    "^CW": this.handleCommandNotImplemented,
    "^DF": this.handleCommandNotImplemented,
    "^FB": this.handleCommandNotImplemented,
    "^FC": this.handleCommandNotImplemented,
    "^FM": this.handleCommandNotImplemented,
    "^FN": this.handleCommandNotImplemented,
    "^FP": this.handleCommandNotImplemented,
    "^FT": this.handleCommandNotImplemented,
    "^FV": this.handleCommandNotImplemented,
    "^FW": this.handleCommandNotImplemented,
    "^FX": this.handleCommandNotImplemented,
    "^GC": this.handleCommandNotImplemented,
    "^GD": this.handleCommandNotImplemented,
    "^GE": this.handleCommandNotImplemented,
    "^GF": this.handleCommandNotImplemented,
    "^GS": this.handleCommandNotImplemented,
    "^HF": this.handleCommandNotImplemented,
    "^HG": this.handleCommandNotImplemented,
    "^HH": this.handleCommandNotImplemented,
    "^HV": this.handleCommandNotImplemented,
    "^HW": this.handleCommandNotImplemented,
    "^HY": this.handleCommandNotImplemented,
    "^HZ": this.handleCommandNotImplemented,
    "^ID": this.handleCommandNotImplemented,
    "^IL": this.handleCommandNotImplemented,
    "^IM": this.handleCommandNotImplemented,
    "^IS": this.handleCommandNotImplemented,
    "^JB": this.handleCommandNotImplemented,
    "^JJ": this.handleCommandNotImplemented,
    "^JM": this.handleCommandNotImplemented,
    "^JS": this.handleCommandNotImplemented,
    "^JT": this.handleCommandNotImplemented,
    "^JU": this.handleCommandNotImplemented,
    "^JW": this.handleCommandNotImplemented,
    "^JZ": this.handleCommandNotImplemented,
    "^KD": this.handleCommandNotImplemented,
    "^KL": this.handleCommandNotImplemented,
    "^KN": this.handleCommandNotImplemented,
    "^KP": this.handleCommandNotImplemented,
    "^LL": this.handleCommandNotImplemented,
    "^LR": this.handleCommandNotImplemented,
    "^LS": this.handleCommandNotImplemented,
    "^LT": this.handleCommandNotImplemented,
    "^MC": this.handleCommandNotImplemented,
    "^MD": this.handleCommandNotImplemented,
    "^MF": this.handleCommandNotImplemented,
    "^ML": this.handleCommandNotImplemented,
    "^MM": this.handleCommandNotImplemented,
    "^MN": this.handleCommandNotImplemented,
    "^MP": this.handleCommandNotImplemented,
    "^MT": this.handleCommandNotImplemented,
    "^MU": this.handleCommandNotImplemented,
    "^MW": this.handleCommandNotImplemented,
    "^NI": this.handleCommandNotImplemented,
    "^NS": this.handleCommandNotImplemented,
    "^PF": this.handleCommandNotImplemented,
    "^PH": this.handleCommandNotImplemented,
    "^PM": this.handleCommandNotImplemented,
    "^PO": this.handleCommandNotImplemented,
    "^PP": this.handleCommandNotImplemented,
    "^PQ": this.handleCommandNotImplemented,
    "^PR": this.handleCommandNotImplemented,
    "^PW": this.handleCommandNotImplemented,
    "^SC": this.handleCommandNotImplemented,
    "^SE": this.handleCommandNotImplemented,
    "^SF": this.handleCommandNotImplemented,
    "^SL": this.handleCommandNotImplemented,
    "^SN": this.handleCommandNotImplemented,
    "^SO": this.handleCommandNotImplemented,
    "^SP": this.handleCommandNotImplemented,
    "^SQ": this.handleCommandNotImplemented,
    "^SR": this.handleCommandNotImplemented,
    "^SS": this.handleCommandNotImplemented,
    "^ST": this.handleCommandNotImplemented,
    "^SX": this.handleCommandNotImplemented,
    "^SZ": this.handleCommandNotImplemented,
    "^TO": this.handleCommandNotImplemented,
    "^WD": this.handleCommandNotImplemented,
    "^XA": this.handleCommandNotImplemented,
    "^XB": this.handleCommandNotImplemented,
    "^XF": this.handleCommandNotImplemented,
    "^XG": this.handleCommandNotImplemented,
    "^XZ": this.handleCommandNotImplemented,
    "^ZZ": this.handleCommandNotImplemented,
    "~DB": this.handleCommandNotImplemented,
    "~DE": this.handleCommandNotImplemented,
    "~DG": this.handleCommandNotImplemented,
    "~DN": this.handleCommandNotImplemented,
    "~DS": this.handleCommandNotImplemented,
    "~DT": this.handleCommandNotImplemented,
    "~DU": this.handleCommandNotImplemented,
    "~DY": this.handleCommandNotImplemented,
    "~EG": this.handleCommandNotImplemented,
    "~HB": this.handleCommandNotImplemented,
    "~HD": this.handleCommandNotImplemented,
    "~HI": this.handleCommandNotImplemented,
    "~HM": this.handleCommandNotImplemented,
    "~HS": this.handleCommandNotImplemented,
    "~HU": this.handleCommandNotImplemented,
    "~JA": this.handleCommandNotImplemented,
    "~JB": this.handleCommandNotImplemented,
    "~JC": this.handleCommandNotImplemented,
    "~JD": this.handleCommandNotImplemented,
    "~JE": this.handleCommandNotImplemented,
    "~JF": this.handleCommandNotImplemented,
    "~JG": this.handleCommandNotImplemented,
    "~JL": this.handleCommandNotImplemented,
    "~JN": this.handleCommandNotImplemented,
    "~JO": this.handleCommandNotImplemented,
    "~JP": this.handleCommandNotImplemented,
    "~JR": this.handleCommandNotImplemented,
    "~JS": this.handleCommandNotImplemented,
    "~JX": this.handleCommandNotImplemented,
    "~KB": this.handleCommandNotImplemented,
    "~NC": this.handleCommandNotImplemented,
    "~NR": this.handleCommandNotImplemented,
    "~NT": this.handleCommandNotImplemented,
    "~PR": this.handleCommandNotImplemented,
    "~PS": this.handleCommandNotImplemented,
    "~RO": this.handleCommandNotImplemented,
    "~SD": this.handleCommandNotImplemented,
    "~TA": this.handleCommandNotImplemented,
    "~WC": this.handleCommandNotImplemented,
  };

  public parse(): ParsedZPL {
    this.result = {
      label: null,
      isValid: false,
      errors: [],
      variables: this.variables,
    };

    if (!this.zplInput.startsWith("^XA" as ZPLCommand)) {
      this.result.errors?.push("Missing ^XA start command");
      return this.result;
    }

    if (!this.zplInput.endsWith("^XZ" as ZPLCommand)) {
      this.result.errors?.push("Missing ^XZ end command");
      return this.result;
    }

    console.log("Original ZPL:", this.zplInput);

    // Remove the start and end commands
    this.zplInput = this.zplInput.substring(3, this.zplInput.length - 3);

    const commandRegex = /([~^][A-Z][A-Z0-9@])([^~^]*?)(?=[~^]|$)/g;
    let match;

    while ((match = commandRegex.exec(this.zplInput)) !== null) {
      let [, command, paramString] = match;
      if (command.startsWith("^A") && !command.endsWith("@")) {
        paramString = command.substring(2, 3).concat(paramString);
        command = "^A";
      }
      const cleanParams = paramString.trim();

      console.log("Parsing command", command, cleanParams);

      if (!this.isValidCommand(command)) {
        this.result.errors?.push(`Invalid command: ${command}`);
        continue;
      }

      try {
        this.zplCommandHandlers[command](cleanParams);
      } catch (error) {
        this.result.errors?.push(
          `Error processing command ${command}: ${error}`
        );
      }
    }

    // Check if we parsed any items
    if (this.label.items.length === 0) {
      this.result.errors?.push("Label contains no printable items");
      return this.result;
    }

    this.result.label = this.label;
    if (this.result.errors?.length === 0) this.result.isValid = true;
    return this.result;
  }

  public produce(): string {
    if (this.result.isValid) {
      let workingString = `^XA${this.zplInput}^XZ`;
      console.log(workingString);
      this.variables.forEach((variable) => {
        console.log(variable);
        const regex = new RegExp(
          `(?<=\\^FD[a-zA-Z0-9]*)${variable.name}(?=[a-zA-Z0-9]*\\^FS)`,
          "g"
        );
        workingString = workingString.replace(regex, variable.value);
      });
      return workingString;
    }
    throw new Error("Label is not valid");
  }
}
