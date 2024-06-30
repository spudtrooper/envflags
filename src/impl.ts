import { type Ctor, Props, ValidValue } from "./types";

const globalDebug = ["1", "true"].includes(process.env.ENV_FLAG_DEBUG || "");

class Flag<T extends ValidValue> {
  private readonly defaultValue: T;
  private readonly name: string;
  private readonly debug: boolean;

  constructor({
    name,
    defaultValue,
    debug = false,
  }: {
    name: string;
    defaultValue: T;
    debug: boolean;
  }) {
    this.name = name;
    this.defaultValue = defaultValue;
    this.debug = debug;

    this.cast(String(defaultValue));

    if (debug) {
      console.log(`ENV_FLAG[${name}] create, defaultValue=${defaultValue} value=${this._value()}`);
    }
  }

  protected cast(s: string): T {
    throw new Error("cast ot implemented");
  }

  get value() {
    return this._value();
  }

  private _value() {
    const s = process.env[this.name];
    if (s !== undefined) {
      const res = this.cast(s);
      if (this.debug) {
        console.log(`ENV_FLAG[${this.name}] value (from env) => ${res}`);
      }
      return res;
    }
    const res = this.defaultValue;
    if (this.debug) {
      console.log(`ENV_FLAG[${this.name}] value (from default) => ${res}`);
    }
    return res;
  }
}

class StringFlag extends Flag<string> {
  constructor(props: Props<string>) {
    super({
      name: props.name,
      defaultValue: props.defaultValue !== undefined ? props.defaultValue : "",
      debug: !!(props.debug || globalDebug),
    });
  }

  protected cast(s: string): string {
    return s;
  }
}

class BooleanFlag extends Flag<boolean> {
  constructor(props: Props<boolean>) {
    super({
      name: props.name,
      defaultValue: props.defaultValue !== undefined ? props.defaultValue : false,
      debug: !!(props.debug || globalDebug),
    });
  }

  protected cast(s: string): boolean {
    return ["1", "true"].includes(s);
  }
}

class NumberFlag extends Flag<number> {
  constructor(props: Props<number>) {
    super({
      name: props.name,
      defaultValue: props.defaultValue !== undefined ? props.defaultValue : 0,
      debug: !!(props.debug || globalDebug),
    });
  }

  protected cast(s: string): number {
    return Number(s);
  }
}

const newString: Ctor<string> = (props: Props<string>) => new StringFlag(props);
const newBoolean: Ctor<boolean> = (props: Props<boolean>) => new BooleanFlag(props);
const newNumber: Ctor<number> = (props: Props<number>) => new NumberFlag(props);

export {
  newString,
  newNumber,
  newBoolean,
}