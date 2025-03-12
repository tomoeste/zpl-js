/**
 * @fileoverview Zebra Printer Encoding Emulation
 * This script provides functions to emulate the character encoding behavior of Zebra barcode label printers,
 * specifically their handling of UTF-8 bytes and Code Page 850 interpretation.
 */

/**
 * Creates a mapping object representing a Zebra printer's character set,
 * which combines standard ASCII, Code Page 850, and Zebra-specific control character mappings.
 *
 * @returns {Record<number, string>} A mapping object where keys are byte values (decimal) and values are corresponding characters.
 */
function createCodePage850Map(): Record<number, string> {
  const codePage850Map: Record<number, string> = {
    // Control characters (0-31)
    0: "", // NUL
    1: "", // SOH
    2: "", // STX
    3: "", // ETX
    4: "", // EOT
    5: "", // ENQ
    6: "", // ACK
    7: "", // BEL
    8: "", // BS
    9: "", // HT
    10: "", // LF
    11: "", // VT
    12: "", // FF
    13: "", // CR
    14: "", // SO
    15: "", // SI
    16: "", // DLE
    17: "", // DC1
    18: "", // DC2
    19: "", // DC3
    20: "", // DC4
    21: "", // NAK
    22: "", // SYN
    23: "", // ETB
    24: "", // CAN
    25: "", // EM
    26: "0", // SUB (Zebra: "0")
    27: "⅓", // ESC (Zebra: "⅓")
    28: "⅔", // FS  (Zebra: "⅔")
    29: "Ĳ", // GS  (Zebra: "Ĳ")
    30: "ĳ", // RS  (Zebra: "ĳ")
    31: "\\", // US  (Zebra: "\")

    // Printable ASCII (32-127)
    32: " ",
    33: "!",
    34: '"',
    35: "#",
    36: "$",
    37: "%",
    38: "&",
    39: "'",
    40: "(",
    41: ")",
    42: "*",
    43: "+",
    44: ",",
    45: "-",
    46: ".",
    47: "/",
    48: "0",
    49: "1",
    50: "2",
    51: "3",
    52: "4",
    53: "5",
    54: "6",
    55: "7",
    56: "8",
    57: "9",
    58: ":",
    59: ";",
    60: "<",
    61: "=",
    62: ">",
    63: "?",
    64: "@",
    65: "A",
    66: "B",
    67: "C",
    68: "D",
    69: "E",
    70: "F",
    71: "G",
    72: "H",
    73: "I",
    74: "J",
    75: "K",
    76: "L",
    77: "M",
    78: "N",
    79: "O",
    80: "P",
    81: "Q",
    82: "R",
    83: "S",
    84: "T",
    85: "U",
    86: "V",
    87: "W",
    88: "X",
    89: "Y",
    90: "Z",
    91: "[",
    92: "\\",
    93: "]",
    94: "^",
    95: "_",
    96: "`",
    97: "a",
    98: "b",
    99: "c",
    100: "d",
    101: "e",
    102: "f",
    103: "g",
    104: "h",
    105: "i",
    106: "j",
    107: "k",
    108: "l",
    109: "m",
    110: "n",
    111: "o",
    112: "p",
    113: "q",
    114: "r",
    115: "s",
    116: "t",
    117: "u",
    118: "v",
    119: "w",
    120: "x",
    121: "y",
    122: "z",
    123: "{",
    124: "|",
    125: "}",
    126: "~",
    127: "⌂",
  };

  // Extended Characters (128-255) - Code Page 850 mapping
  const extendedChars = {
    128: "Ç",
    129: "ü",
    130: "é",
    131: "â",
    132: "ä",
    133: "à",
    134: "å",
    135: "ç",
    136: "ê",
    137: "ë",
    138: "è",
    139: "ï",
    140: "î",
    141: "ì",
    142: "Ä",
    143: "Å",
    144: "É",
    145: "æ",
    146: "Æ",
    147: "ô",
    148: "ö",
    149: "ò",
    150: "û",
    151: "ù",
    152: "ÿ",
    153: "Ö",
    154: "Ü",
    155: "ø",
    156: "£",
    157: "Ø",
    158: "×",
    159: "ƒ",
    160: "á",
    161: "í",
    162: "ó",
    163: "ú",
    164: "ñ",
    165: "Ñ",
    166: "ª",
    167: "º",
    168: "¿",
    169: "®",
    170: "¬",
    171: "½",
    172: "¼",
    173: "¡",
    174: "«",
    175: "»",
    176: "░",
    177: "▒",
    178: "▓",
    179: "│",
    180: "┤",
    181: "Á",
    182: "Â",
    183: "À",
    184: "©",
    185: "╣",
    186: "║",
    187: "╗",
    188: "╝",
    189: "¢",
    190: "¥",
    191: "┐",
    192: "└",
    193: "┴",
    194: "┬",
    195: "├",
    196: "─",
    197: "┼",
    198: "ã",
    199: "Ã",
    200: "╚",
    201: "╔",
    202: "╩",
    203: "╦",
    204: "╠",
    205: "═",
    206: "╬",
    207: "¤",
    208: "ð",
    209: "Ð",
    210: "Ê",
    211: "Ë",
    212: "È",
    213: "i",
    214: "Í",
    215: "Î",
    216: "Ï",
    217: "┘",
    218: "┌",
    219: "█",
    220: "▄",
    221: "¦",
    222: "Ì",
    223: "▀",
    224: "Ó",
    225: "ß",
    226: "Ô",
    227: "Ò",
    228: "õ",
    229: "Õ",
    230: "µ",
    231: "þ",
    232: "Þ",
    233: "Ú",
    234: "Û",
    235: "Ù",
    236: "ý",
    237: "Ý",
    238: "¯",
    239: "´",
    240: "-",
    241: "Ð",
    242: "±",
    243: "¾",
    244: "¶",
    245: "§",
    246: "÷",
    247: "¸",
    248: "°",
    249: "¨",
    250: "·",
    251: "¹",
    252: "³",
    253: "²",
    254: "■",
    255: " ",
  };

  return { ...codePage850Map, ...extendedChars };
}

export function zebraEncode(text: string, isHexMode = false): string {
  // Get the complete Code Page 850 mapping
  const codePage850: Record<number, string> = createCodePage850Map();
  const encoder = new TextEncoder();
  let result = "";

  // Create Code Page 850 specific decoder
  const codePage850Decoder = (byte: number): string => {
    if (!(byte in codePage850)) {
      throw new ZebraEncodeError(
        `Byte value ${byte} (0x${byte.toString(16).padStart(2, "0").toUpperCase()}) has no corresponding CodePage 850 mapping`
      );
    }
    return codePage850[byte];
  };

  if (isHexMode) {
    // Regular expression to match _xx hex patterns
    const hexPattern = /_([0-9a-fA-F]{2})/g;
    let lastIndex = 0;
    let match;

    try {
      while ((match = hexPattern.exec(text)) !== null) {
        // Encode the text between hex values
        const normalText = text.slice(lastIndex, match.index);
        const normalBytes = encoder.encode(normalText);
        for (const byte of normalBytes) {
          result += codePage850Decoder(byte);
        }

        // Parse and encode the hex value
        const hexValue = parseInt(match[1], 16);
        result += codePage850Decoder(hexValue);

        lastIndex = match.index + match[0].length;
      }

      // Handle any remaining text after the last hex value
      const remainingText = text.slice(lastIndex);
      const remainingBytes = encoder.encode(remainingText);
      for (const byte of remainingBytes) {
        result += codePage850Decoder(byte);
      }
    } catch (error) {
      if (error instanceof ZebraEncodeError) {
        throw error;
      }
      throw new ZebraEncodeError(
        `Encoding error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  } else {
    try {
      const utf8Bytes = encoder.encode(text);
      for (const byte of utf8Bytes) {
        result += codePage850Decoder(byte);
      }
    } catch (error) {
      if (error instanceof ZebraEncodeError) {
        throw error;
      }
      throw new ZebraEncodeError(
        `Encoding error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    }
  }

  return result;
}

class ZebraEncodeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ZebraEncodeError";
  }
}

/**
 * Encodes a string to emulate the raw byte to character output of a Zebra printer,
 * without any codepage conversion.
 *
 * @param {string} text The input string to encode.
 * @returns {string} The encoded string, replicating the Zebra printer raw output.
 */
export function zebraLikeEncode(text: string): string {
  const encoder = new TextEncoder();
  const utf8Bytes = encoder.encode(text);
  let result = "";

  for (const byte of utf8Bytes) {
    result += String.fromCharCode(byte);
  }

  return result;
}

/**
 * Displays the character codes of a string encoded with zebraLikeEncode. Useful for debugging.
 *
 * @param {string} text The input string to encode and analyze.
 */
export function displayCharacterCodes(text: string) {
  const encoded = zebraLikeEncode(text);
  let codes = [];
  for (let i = 0; i < encoded.length; i++) {
    codes.push(encoded.charCodeAt(i));
  }
  console.log(codes);
}
