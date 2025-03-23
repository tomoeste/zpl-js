export class ZplJsConfig {
  private static _zplMaxLength: number = 4096;

  /**
   * The maximum length for ZPL strings parsed by the `tag` method. If the string
   * is longer than the max length, the extra characters will be discarded.
   * @Note Increasing this can affect the time it takes for regular
   * expressions to match. Be cautious if using in a server environment.
   * @See [js/polynomial-redos](https://codeql.github.com/codeql-query-help/javascript/js-polynomial-redos/)
   */
  static get zplMaxLength(): number {
    return this._zplMaxLength;
  }

  static set zplMaxLength(value: number) {
    if (value <= 0) {
      throw new Error("zplMaxLength must be a positive number.");
    }
    this._zplMaxLength = value;
  }
}
