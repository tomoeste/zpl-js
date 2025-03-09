export const ZplReferences: Record<string, { name: string; url: string }> = {
  "zpl-zbi2-pm-en": {
    name: "Zebra ZPL II Programming Manual",
    url: "https://www.zebra.com/content/dam/zebra/manuals/printers/common/programming/zpl-zbi2-pm-en.pdf",
  },
};

type ZPLCommandKey =
  | "^A"
  | "^A@"
  | "^B0"
  | "^B1"
  | "^B2"
  | "^B3"
  | "^B4"
  | "^B5"
  | "^B7"
  | "^B8"
  | "^B9"
  | "^BA"
  | "^BB"
  | "^BC"
  | "^BD"
  | "^BE"
  | "^BF"
  | "^BI"
  | "^BJ"
  | "^BK"
  | "^BL"
  | "^BM"
  | "^BO"
  | "^BP"
  | "^BQ"
  | "^BR"
  | "^BS"
  | "^BT"
  | "^BU"
  | "^BX"
  | "^BY"
  | "^BZ"
  | "^CC"
  | "^CD"
  | "^CF"
  | "^CI"
  | "^CM"
  | "^CO"
  | "^CT"
  | "^CV"
  | "^CW"
  | "~DB"
  | "~DE"
  | "^DF"
  | "~DG"
  | "~DN"
  | "~DS"
  | "~DT"
  | "~DU"
  | "~DY"
  | "~EG"
  | "^FB"
  | "^FC"
  | "^FD"
  | "^FH"
  | "^FM"
  | "^FN"
  | "^FO"
  | "^FP"
  | "^FR"
  | "^FS"
  | "^FT"
  | "^FV"
  | "^FW"
  | "^FX"
  | "^GB"
  | "^GC"
  | "^GD"
  | "^GE"
  | "^GF"
  | "^GS"
  | "~HB"
  | "~HD"
  | "^HF"
  | "^HG"
  | "^HH"
  | "~HI"
  | "~HM"
  | "~HS"
  | "~HU"
  | "^HV"
  | "^HW"
  | "^HY"
  | "^HZ"
  | "^ID"
  | "^IL"
  | "^IM"
  | "^IS"
  | "~JA"
  | "^JB"
  | "~JB"
  | "~JC"
  | "~JD"
  | "~JE"
  | "~JF"
  | "~JG"
  | "^JJ"
  | "~JL"
  | "^JM"
  | "~JN"
  | "~JO"
  | "~JP"
  | "~JR"
  | "^JS"
  | "~JS"
  | "^JT"
  | "^JU"
  | "^JW"
  | "~JX"
  | "^JZ"
  | "~KB"
  | "^KD"
  | "^KL"
  | "^KN"
  | "^KP"
  | "^LH"
  | "^LL"
  | "^LR"
  | "^LS"
  | "^LT"
  | "^MC"
  | "^MD"
  | "^MF"
  | "^ML"
  | "^MM"
  | "^MN"
  | "^MP"
  | "^MT"
  | "^MU"
  | "^MW"
  | "~NC"
  | "^NI"
  | "~NR"
  | "^NS"
  | "~NT"
  | "^PF"
  | "^PH"
  | "^PM"
  | "^PO"
  | "^PP"
  | "^PQ"
  | "^PR"
  | "~PR"
  | "~PS"
  | "^PW"
  | "~RO"
  | "^SC"
  | "~SD"
  | "^SE"
  | "^SF"
  | "^SL"
  | "^SN"
  | "^SO"
  | "^SP"
  | "^SQ"
  | "^SR"
  | "^SS"
  | "^ST"
  | "^SX"
  | "^SZ"
  | "~TA"
  | "^TO"
  | "~WC"
  | "^WD"
  | "^XA"
  | "^XB"
  | "^XF"
  | "^XG"
  | "^XZ"
  | "^ZZ";

export const ZPLImplementationMessages = {
  FULLY_IMPLEMENTED: "This command is fully implemented.",
  PARTIALLY_IMPLEMENTED:
    "This command is partially implemented. The preview may differ from a real printout.",
  NOT_IMPLEMENTED: "This command is not implemented.",
  NOT_APPLICABLE: "This command is not applicable to this tool.",
};

type ZPLImplementationCodes = keyof typeof ZPLImplementationMessages;

type ZPLCommandValue = {
  name: string;
  description?: string;
  format?: string;
  reference?: Record<string, number>;
  implemented?: ZPLImplementationCodes;
};

/**
 * Type definition for ZPL II commands and their descriptions
 */
export const ZPLCommands: Record<ZPLCommandKey, ZPLCommandValue> = {
  /** Scalable/Bitmapped Font */
  "^A": {
    name: "Scalable/Bitmapped Font",
    description: "Set the font to be used for the following text field.",
    format: "^Afo,h,w",
    reference: {
      "zpl-zbi2-pm-en": 60,
    },
  },
  /** Use Font Name to Call Font */
  "^A@": {
    name: "Use Font Name to Call Font",
    description:
      "Use a specific font name stored in printer memory instead of the font specified by ^A.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Aztec Bar Code Parameters */
  "^B0": {
    name: "Aztec Bar Code Parameters",
    description:
      "Aztec Bar Code Parameters allow the configuration of the Aztec 2D barcode symbology.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Code 11 Bar Code */
  "^B1": {
    name: "Code 11 Bar Code",
    description: "Generate a Code 11 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Interleaved 2 of 5 Bar Code */
  "^B2": {
    name: "Interleaved 2 of 5 Bar Code",
    description: "Generate an Interleaved 2 of 5 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Code 39 Bar Code */
  "^B3": {
    name: "Code 39 Bar Code",
    description: "Generate a Code 39 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "PARTIALLY_IMPLEMENTED",
  },
  /** Code 49 Bar Code */
  "^B4": {
    name: "Code 49 Bar Code",
    description: "Generate a Code 49 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Planet Code Bar Code */
  "^B5": {
    name: "Planet Code Bar Code",
    description: "Generate a Planet Code Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** PDF417 Bar Code */
  "^B7": {
    name: "PDF417 Bar Code",
    description: "Generate a PDF417 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** EAN-8 Bar Code */
  "^B8": {
    name: "EAN-8 Bar Code",
    description: "Generate an EAN-8 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** UPC-E Bar Code */
  "^B9": {
    name: "UPC-E Bar Code",
    description: "Generate an UPC-E Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Code 93 Bar Code */
  "^BA": {
    name: "Code 93 Bar Code",
    description: "Generate a Code 93 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** CODABLOCK Bar Code */
  "^BB": {
    name: "CODABLOCK Bar Code",
    description: "Generate a CODABLOCK Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Code 128 Bar Code (Subsets A, B, and C) */
  "^BC": {
    name: "Code 128 Bar Code (Subsets A, B, and C)",
    description: "Generate a Code 128 Bar Code (Subsets A, B, and C).",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "PARTIALLY_IMPLEMENTED",
  },
  /** UPS MaxiCode Bar Code */
  "^BD": {
    name: "UPS MaxiCode Bar Code",
    description: "Generate an UPS MaxiCode Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** EAN-13 Bar Code */
  "^BE": {
    name: "EAN-13 Bar Code",
    description: "Generate an EAN-13 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Micro-PDF417 Bar Code */
  "^BF": {
    name: "Micro-PDF417 Bar Code",
    description: "Generate a Micro-PDF417 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Industrial 2 of 5 Bar Codes */
  "^BI": {
    name: "Industrial 2 of 5 Bar Codes",
    description: "Generate an Industrial 2 of 5 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Standard 2 of 5 Bar Code */
  "^BJ": {
    name: "Standard 2 of 5 Bar Code",
    description: "Generate a Standard 2 of 5 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** ANSI Codabar Bar Code */
  "^BK": {
    name: "ANSI Codabar Bar Code",
    description: "Generate an ANSI Codabar Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** LOGMARS Bar Code */
  "^BL": {
    name: "LOGMARS Bar Code",
    description: "Generate a LOGMARS Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** MSI Bar Code */
  "^BM": {
    name: "MSI Bar Code",
    description: "Generate an MSI Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Aztec Bar Code Parameters */
  "^BO": {
    name: "Aztec Bar Code Parameters",
    description: "Generate an Aztec Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Plessey Bar Code */
  "^BP": {
    name: "Plessey Bar Code",
    description: "Generate a Plessey Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** QR Code Bar Code */
  "^BQ": {
    name: "QR Code Bar Code",
    description: "Generate a QR Code Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** RSS (Reduced Space Symbology) Bar Code */
  "^BR": {
    name: "RSS (Reduced Space Symbology) Bar Code",
    description: "Generate an RSS (Reduced Space Symbology) Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** UPC/EAN Extensions */
  "^BS": {
    name: "UPC/EAN Extensions",
    description: "",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** TLC39 Bar Code */
  "^BT": {
    name: "TLC39 Bar Code",
    description: "Generate a TLC39 Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** UPC-A Bar Code */
  "^BU": {
    name: "UPC-A Bar Code",
    description: "Generate an UPC-A Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Data Matrix Bar Code */
  "^BX": {
    name: "Data Matrix Bar Code",
    description: "Generate a Data Matrix Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Bar Code Field Default */
  "^BY": {
    name: "Bar Code Field Default",
    description: "Set the default bar code field parameters.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "PARTIALLY_IMPLEMENTED",
  },
  /** POSTNET Bar Code */
  "^BZ": {
    name: "POSTNET Bar Code",
    description: "Generate a POSTNET Bar Code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** ~CC Change Carets */
  "^CC": {
    name: "~CC Change Carets",
    description:
      "Change the behavior of caret characters ('^') in ZPL commands.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** ~CD Change Delimiter */
  "^CD": {
    name: "~CD Change Delimiter",
    description:
      "Change the current delimiter used for separating commands in ZPL.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Change Alphanumeric Default Font */
  "^CF": {
    name: "Change Alphanumeric Default Font",
    description: "Change the default alphanumeric font.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "PARTIALLY_IMPLEMENTED",
  },
  /** Change International Font/Encoding */
  "^CI": {
    name: "Change International Font/Encoding",
    description: "Change the default international font/encoding.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Change Memory Letter Designation */
  "^CM": {
    name: "Change Memory Letter Designation",
    description: "Change the memory letter designation of stored objects.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Cache On */
  "^CO": {
    name: "Cache On",
    description: "Enable caching for faster processing or retrieval of data.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** ~CT Change Tilde */
  "^CT": {
    name: "~CT Change Tilde",
    description:
      "Change the behavior of tilde characters ('~') in ZPL commands.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Code Validation */
  "^CV": {
    name: "Code Validation",
    description:
      "Verify and validate the structure or content of a specified code.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Font Identifier */
  "^CW": {
    name: "Font Identifier",
    description:
      "Identify and specify a font to be used for text fields within a ZPL document.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Download Bitmap Font */
  "~DB": {
    name: "Download Bitmap Font",
    description: "Download a bitmap font to the printer for later use.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Download Encoding */
  "~DE": {
    name: "Download Encoding",
    description:
      "Used to download character encoding information to the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Download Format */
  "^DF": {
    name: "Download Format",
    description: "Defines and downloads a format template to the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Download Graphics */
  "~DG": {
    name: "Download Graphics",
    description: "Sends graphic data to the printer for later use.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Abort Download Graphic */
  "~DN": {
    name: "Abort Download Graphic",
    description: "Cancels or aborts a graphic download in progress.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Download Intellifont (Scalable Font) */
  "~DS": {
    name: "Download Intellifont (Scalable Font)",
    description: "Allows the download of scalable Intellifont fonts.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Download Bounded TrueType Font */
  "~DT": {
    name: "Download Bounded TrueType Font",
    description: "Downloads a TrueType font with bounding box constraints.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Download Unbounded TrueType Font */
  "~DU": {
    name: "Download Unbounded TrueType Font",
    description: "Downloads a TrueType font without bounding box constraints.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Download Graphics/Native TrueType or OpenType Font */
  "~DY": {
    name: "Download Graphics/Native TrueType or OpenType Font",
    description: "Downloads graphics or native TrueType/OpenType font files.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Erase Download Graphics */
  "~EG": {
    name: "Erase Download Graphics",
    description: "Erase downloaded graphics from the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Field Block */
  "^FB": {
    name: "Field Block",
    description:
      "Defines a block of text, including line length and alignment settings.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Field Clock (for Real-Time Clock) */
  "^FC": {
    name: "Field Clock (for Real-Time Clock)",
    description:
      "Displays a real-time clock field using the current time and date.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Field Data */
  "^FD": {
    name: "Field Data",
    description: "Specifies the text or data to be printed in the field.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Field Hexadecimal Indicator */
  "^FH": {
    name: "Field Hexadecimal Indicator",
    description:
      "Indicates that the data contains hexadecimal character codes.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Multiple Field Origin Locations */
  "^FM": {
    name: "Multiple Field Origin Locations",
    description: "Specifies multiple locations for a field origin.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Field Number */
  "^FN": {
    name: "Field Number",
    description: "Assigns a number to a field for later variable replacement.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Field Origin */
  "^FO": {
    name: "Field Origin",
    description: "Set the field origin relative to label home ^LH.",
    format: "^FOx,y,z",
    reference: {
      "zpl-zbi2-pm-en": 201,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Field Parameter */
  "^FP": {
    name: "Field Parameter",
    description: "Specifies additional formatting parameters for a field.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Field Reverse Print */
  "^FR": {
    name: "Field Reverse Print",
    description:
      "Inverts the field's printing, producing an inverse filter effect.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Field Separator */
  "^FS": {
    name: "Field Separator",
    description:
      "Indicates the end of a field and moves the cursor to the next position.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Field Typeset */
  "^FT": {
    name: "Field Typeset",
    description:
      "Specifies the starting point for a field relative to the label origin.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Field Variable */
  "^FV": {
    name: "Field Variable",
    description:
      "Used to input variable data into a field within the template.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Field Orientation */
  "^FW": {
    name: "Field Orientation",
    description: "Sets the orientation for field data displayed or printed.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Comment */
  "^FX": {
    name: "Comment",
    description:
      "Allows the insertion of comments or remarks in the ZPL code, which are ignored by the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Graphic Box */
  "^GB": {
    name: "Graphic Box",
    description: "Used to draw boxes and lines",
    format: "^GBw,h,t,c,r",
    reference: {
      "zpl-zbi2-pm-en": 210,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Graphic Circle */
  "^GC": {
    name: "Graphic Circle",
    description: "Used to draw circles",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Graphic Diagonal Line */
  "^GD": {
    name: "Graphic Diagonal Line",
    description: "Used to draw diagonal lines",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Graphic Ellipse */
  "^GE": {
    name: "Graphic Ellipse",
    description: "Used to draw ellipses",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Graphic Field */
  "^GF": {
    name: "Graphic Field",
    description:
      "Used to define and load a graphic image directly into the label format.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Graphic Symbol */
  "^GS": {
    name: "Graphic Symbol",
    description:
      "Used to call a previously stored graphic symbol to print within a label.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Battery Status */
  "~HB": {
    name: "Battery Status",
    description:
      "Queries the printer's battery status, including charge level and health.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Head Diagnostic */
  "~HD": {
    name: "Head Diagnostic",
    description:
      "Performs diagnostics to check the health and functionality of the printhead.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Host Format */
  "^HF": {
    name: "Host Format",
    description:
      "Specifies the format of host data, allowing custom input for label templates.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Host Graphic */
  "^HG": {
    name: "Host Graphic",
    description:
      "Allows the user to send graphic data from the host to the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Configuration Label Return */
  "^HH": {
    name: "Configuration Label Return",
    description: "Returns the current configuration of the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Host Identification */
  "~HI": {
    name: "Host Identification",
    description: "Identifies the host machine communicating with the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Host RAM Status */
  "~HM": {
    name: "Host RAM Status",
    description:
      "Returns the status and available memory in the host system RAM.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Host Status Return */
  "~HS": {
    name: "Host Status Return",
    description:
      "Returns the current status of the printer, such as error codes and operational state.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Return ZebraNet Alert Configuration */
  "~HU": {
    name: "Return ZebraNet Alert Configuration",
    description: "Retrieves the current ZebraNet alert configuration settings.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Host Verification */
  "^HV": {
    name: "Host Verification",
    description:
      "Allows verification of host settings to ensure compatibility with the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Host Directory List */
  "^HW": {
    name: "Host Directory List",
    description:
      "Returns a list of files or objects stored in the printer's memory.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Upload Graphics */
  "^HY": {
    name: "Upload Graphics",
    description: "Uploads graphic data to the printer for use in labels.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Display Description Information */
  "^HZ": {
    name: "Display Description Information",
    description:
      "Displays detailed information about the printer's capabilities or setup.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Object Delete */
  "^ID": {
    name: "Object Delete",
    description:
      "Deletes a specific object from the printer's memory, such as a stored label or graphic.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Image Load */
  "^IL": {
    name: "Image Load",
    description:
      "Loads an image into the printer's memory for later use in label printing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Image Move */
  "^IM": {
    name: "Image Move",
    description:
      "Moves an image object to a new location within the printer's memory.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Image Save */
  "^IS": {
    name: "Image Save",
    description: "Saves an image to the printer's memory for future use.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Cancel All */
  "~JA": {
    name: "Cancel All",
    description: "Cancels all active processes or printing operations.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Initialize Flash Memory */
  "^JB": {
    name: "Initialize Flash Memory",
    description: "Initializes the flash memory, clearing any existing data.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Reset Optional Memory */
  "~JB": {
    name: "Reset Optional Memory",
    description: "Resets optional memory to its default state.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Media Sensor Calibration */
  "~JC": {
    name: "Set Media Sensor Calibration",
    description:
      "Performs calibration of the media sensor to accurately detect media properties.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Enable Communications Diagnostics */
  "~JD": {
    name: "Enable Communications Diagnostics",
    description:
      "Enables diagnostic mode for monitoring communication between the host and printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Disable Diagnostics */
  "~JE": {
    name: "Disable Diagnostics",
    description:
      "Disables diagnostic mode previously enabled for communication troubleshooting.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Battery Condition */
  "~JF": {
    name: "Set Battery Condition",
    description:
      "Configures and monitors the condition or state of the printer's battery.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Graphing Sensor Calibration */
  "~JG": {
    name: "Graphing Sensor Calibration",
    description:
      "Executes calibration and graphing of sensor data to ensure optimal performance.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Auxiliary Port */
  "^JJ": {
    name: "Set Auxiliary Port",
    description:
      "Configures the auxiliary port with specific settings or parameters.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Label Length */
  "~JL": {
    name: "Set Label Length",
    description: "Sets the length of the label for printing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Dots per Millimeter */
  "^JM": {
    name: "Set Dots per Millimeter",
    description: "Defines the number of dots printed per millimeter.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Head Test Fatal */
  "~JN": {
    name: "Head Test Fatal",
    description: "Performs a printhead test and flags any fatal errors.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Head Test Non-Fatal */
  "~JO": {
    name: "Head Test Non-Fatal",
    description: "Performs a printhead test and flags any non-fatal errors.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Pause and Cancel Format */
  "~JP": {
    name: "Pause and Cancel Format",
    description: "Pauses the current operation and cancels any active format.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Power On Reset */
  "~JR": {
    name: "Power On Reset",
    description:
      "Initiates a complete system reset as if the printer was powered on.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Sensor Select */
  "^JS": {
    name: "Sensor Select",
    description: "Allows selection of the active sensor for media detection.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Change Backfeed Sequence */
  "~JS": {
    name: "Change Backfeed Sequence",
    description:
      "Modifies the backfeed sequence to optimize media positioning.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Head Test Interval */
  "^JT": {
    name: "Head Test Interval",
    description: "Sets the interval for performing automatic head tests.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Configuration Update */
  "^JU": {
    name: "Configuration Update",
    description: "Updates printer configurations to the specified settings.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Ribbon Tension */
  "^JW": {
    name: "Set Ribbon Tension",
    description: "Adjusts the ribbon tension to ensure proper media handling.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Cancel Current Partially Input Format */
  "~JX": {
    name: "Cancel Current Partially Input Format",
    description: "Cancels any command sequence partially entered by the user.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Reprint After Error */
  "^JZ": {
    name: "Reprint After Error",
    description:
      "Automatically reprints the last label after resolving an error.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Kill Battery (Battery Discharge Mode) */
  "~KB": {
    name: "Kill Battery (Battery Discharge Mode)",
    description:
      "Activates battery discharge mode to fully deplete the battery.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Select Date and Time Format (for Real-Time Clock) */
  "^KD": {
    name: "Select Date and Time Format (for Real-Time Clock)",
    description:
      "Defines the format for displaying date and time on the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Define Language */
  "^KL": {
    name: "Define Language",
    description:
      "Sets the printer's default language for operations and prompts.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Define Printer Name */
  "^KN": {
    name: "Define Printer Name",
    description:
      "Assigns a custom name to the printer for easier identification.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Define Password */
  "^KP": {
    name: "Define Password",
    description:
      "Configures a password for securing printer settings and operations.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Label Home */
  "^LH": {
    name: "Label Home",
    description:
      "Sets the home position for the label, determining the top-left origin point for printing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Label Length */
  "^LL": {
    name: "Label Length",
    description:
      "Specifies the length of the label in dots, allowing printers to handle varying label sizes.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Label Reverse Print */
  "^LR": {
    name: "Label Reverse Print",
    description:
      "Enables reverse label printing, allowing the label to be printed upside down.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Label Shift */
  "^LS": {
    name: "Label Shift",
    description:
      "Shifts the label content horizontally to adjust its printing position.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Label Top */
  "^LT": {
    name: "Label Top",
    description:
      "Defines a vertical offset from the top edge of the label to adjust the printing position.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Map Clear */
  "^MC": {
    name: "Map Clear",
    description: "Clears the memory of any stored mapping configurations.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Media Darkness */
  "^MD": {
    name: "Media Darkness",
    description: "Adjusts the darkness level for printing on the media.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Media Feed */
  "^MF": {
    name: "Media Feed",
    description: "Controls the length of media fed before printing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Maximum Label Length */
  "^ML": {
    name: "Maximum Label Length",
    description:
      "Specifies the maximum length of the label the printer can handle.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Print Mode */
  "^MM": {
    name: "Print Mode",
    description:
      "Sets the mode of printing, such as tear-off or direct thermal.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Media Tracking */
  "^MN": {
    name: "Media Tracking",
    description:
      "Configures the type of media tracking to be used by the printer, such as continuous or mark sensing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Mode Protection */
  "^MP": {
    name: "Mode Protection",
    description:
      "Enables or disables protected operational modes to prevent unauthorized changes.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Media Type */
  "^MT": {
    name: "Media Type",
    description:
      "Specifies the type of media being used, such as thermal transfer or direct thermal.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Units of Measurement */
  "^MU": {
    name: "Set Units of Measurement",
    description:
      "Defines the unit of measurement for printer operations, such as inches or millimeters.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Modify Head Cold Warning */
  "^MW": {
    name: "Modify Head Cold Warning",
    description:
      "Adjusts the settings for the cold printhead warning to ensure optimal printing performance.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Network Connect */
  "~NC": {
    name: "Network Connect",
    description: "Establishes a connection between the printer and a network.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Network ID Number */
  "^NI": {
    name: "Network ID Number",
    description: "Specifies the unique identification number for the network.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set All Network Printers Transparent */
  "~NR": {
    name: "Set All Network Printers Transparent",
    description: "Configures all network printers for transparent mode.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Change Networking Settings */
  "^NS": {
    name: "Change Networking Settings",
    description: "Modifies the network settings for the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Currently Connected Printer Transparent */
  "~NT": {
    name: "Set Currently Connected Printer Transparent",
    description: "Sets the currently connected printer to transparent mode.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Slew Given Number of Dot Rows */
  "^PF": {
    name: "Slew Given Number of Dot Rows",
    description:
      "Moves the print head by a specific number of dot rows without printing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** ~PH Slew to Home Position */
  "^PH": {
    name: "~PH Slew to Home Position",
    description:
      "Repositions the print head to the home position for alignment.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Printing Mirror Image of Label */
  "^PM": {
    name: "Printing Mirror Image of Label",
    description:
      "Flips the label content to produce a mirrored image for printing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Print Orientation */
  "^PO": {
    name: "Print Orientation",
    description:
      "Defines the orientation of the printed label, such as normal or rotated.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** ~PP Programmable Pause */
  "^PP": {
    name: "~PP Programmable Pause",
    description:
      "Pauses the printer operation at a specific point in the process, allowing manual intervention if needed.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Print Quantity */
  "^PQ": {
    name: "Print Quantity",
    description:
      "Defines the number of labels to be printed for the current job.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Print Rate */
  "^PR": {
    name: "Print Rate",
    description: "Adjusts the speed at which printing is performed.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Applicator Reprint */
  "~PR": {
    name: "Applicator Reprint",
    description: "Sends a command to the applicator to reprint the last label.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Print Start */
  "~PS": {
    name: "Print Start",
    description:
      "Initiates the printing process or resumes from a paused state.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Print Width */
  "^PW": {
    name: "Print Width",
    description:
      "Specifies the width of the label to be printed, measured in dots.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Reset Advanced Counter */
  "~RO": {
    name: "Reset Advanced Counter",
    description: "Resets the advanced counter to its initial value for re-use.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Serial Communications */
  "^SC": {
    name: "Set Serial Communications",
    description:
      "Configures the serial communication settings, such as baud rate or parity.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Darkness */
  "~SD": {
    name: "Set Darkness",
    description:
      "Adjusts the printing intensity by modifying the darkness level.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Select Encoding */
  "^SE": {
    name: "Select Encoding",
    description:
      "Specifies the character encoding to be used for the printed content.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Serialization Field (with a Standard ^FD String) */
  "^SF": {
    name: "Serialization Field (with a Standard ^FD String)",
    description:
      "Defines a field that is automatically serialized using a standard ^FD string.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Set Mode and Language (for Real-Time Clock) */
  "^SL": {
    name: "Set Mode and Language (for Real-Time Clock)",
    description:
      "Configures the mode and language settings for the real-time clock functionality.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Serialization Data */
  "^SN": {
    name: "Serialization Data",
    description:
      "Specifies the settings for serialization data such as start value and increments.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Set Offset (for Real-Time Clock) */
  "^SO": {
    name: "Set Offset (for Real-Time Clock)",
    description:
      "Defines a time offset for the real-time clock to adjust its current value.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Start Print */
  "^SP": {
    name: "Start Print",
    description: "Starts the printing process for the specified format.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Halt ZebraNet Alert */
  "^SQ": {
    name: "Halt ZebraNet Alert",
    description: "Stops alerts being sent through ZebraNet.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Printhead Resistance */
  "^SR": {
    name: "Set Printhead Resistance",
    description: "Configures the resistance value for the printhead.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Media Sensors */
  "^SS": {
    name: "Set Media Sensors",
    description: "Sets the configuration for the printer's media sensors.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set Date and Time (for Real-Time Clock) */
  "^ST": {
    name: "Set Date and Time (for Real-Time Clock)",
    description: "Sets the date and time for the printer's real-time clock.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Set ZebraNet Alert */
  "^SX": {
    name: "Set ZebraNet Alert",
    description: "Configures alert settings for ZebraNet.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Set ZPL */
  "^SZ": {
    name: "Set ZPL",
    description: "Specifies the ZPL mode for the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Tear-off Adjust Position */
  "~TA": {
    name: "Tear-off Adjust Position",
    description: "Adjusts the position where media tears off after printing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Transfer Object */
  "^TO": {
    name: "Transfer Object",
    description:
      "Transfers an object, such as a graphic or format, to the printer.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Print Configuration Label */
  "~WC": {
    name: "Print Configuration Label",
    description: "Prints a label showing current printer configurations.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
  },
  /** Print Directory Label */
  "^WD": {
    name: "Print Directory Label",
    description: "Prints a label listing the contents of printer memory.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Start Format */
  "^XA": {
    name: "Start Format",
    description: "Marks the beginning of a new ZPL format.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Suppress Backfeed */
  "^XB": {
    name: "Suppress Backfeed",
    description:
      "Prevents the media from being fed backward after a print job.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Recall Format */
  "^XF": {
    name: "Recall Format",
    description: "Retrieves a stored ZPL format from the printer's memory.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** Recall Graphic */
  "^XG": {
    name: "Recall Graphic",
    description:
      "Retrieves a stored graphic from the printer's memory for printing.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
  /** End Format */
  "^XZ": {
    name: "End Format",
    description: "Marks the end of a ZPL format.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "FULLY_IMPLEMENTED",
  },
  /** Printer Sleep */
  "^ZZ": {
    name: "Printer Sleep",
    description: "Puts the printer into sleep mode to conserve power.",
    format: "",
    reference: {
      "zpl-zbi2-pm-en": 0,
    },
    implemented: "NOT_APPLICABLE",
  },
} as const;

/**
 * Type representing a valid ZPL command (including prefix)
 */
export type ZPLCommand = keyof typeof ZPLCommands;

/**
 * Helper function to get the description of a ZPL command
 * @param command The complete ZPL command including the prefix (^ or ~)
 * @returns The description of the command
 */
export function getZPLCommandDescription(command: ZPLCommand): string {
  return ZPLCommands[command].name || "No description available";
}
