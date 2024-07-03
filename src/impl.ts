import { type Ctor, Props, ValidValue, ValidType } from "./types";

const globalDebug = ["1", "true"].includes(process.env.ENV_FLAG_DEBUG || "");

export class Flag<T extends ValidValue> {
  public readonly defaultValue: T;
  public readonly name: string;
  private readonly debug: boolean;

  public readonly value: T;
  public readonly type: ValidType;

  constructor({
    name,
    defaultValue,
    cast,
    debug = false,
    value,
  }: {
    name: string;
    defaultValue: T;
    cast: (s: string) => T;
    debug: boolean;
    value?: string | null,
  }) {
    this.name = name;
    this.defaultValue = defaultValue;
    this.debug = debug;
    this.value = value ? cast(value) : Flag.getValue(this.name, this.defaultValue, cast);
    this.type = (typeof this.defaultValue) as ValidType;

    if (this.debug) {
      console.log(`ENV_FLAG[${name}] create, defaultValue=${defaultValue} value=${this.value}`);
    }

  }

  private static getValue<T extends ValidValue>(name: string, defaultValue: T, cast: (s: string) => T): T {
    // TODO: This dones't work, need to explicitliy use process.env.NEXT_PUBLIC_....
    const s = process.env[name];
    return s !== undefined ? cast(s) : defaultValue;
  }
}

class StringFlag extends Flag<string> {
  constructor(props: Props<string>) {
    super({
      name: props.name,
      defaultValue: props.defaultValue !== undefined ? props.defaultValue : "",
      cast: (s: string) => s,
      debug: !!(props.debug || globalDebug),
      value: props.value,
    });
  }
}

class BooleanFlag extends Flag<boolean> {
  constructor(props: Props<boolean>) {
    super({
      name: props.name,
      defaultValue: props.defaultValue !== undefined ? props.defaultValue : false,
      cast: (s: string) => ["1", "true"].includes(s),
      debug: !!(props.debug || globalDebug),
      value: props.value,
    });
  }
}

class NumberFlag extends Flag<number> {
  constructor(props: Props<number>) {
    super({
      name: props.name,
      defaultValue: props.defaultValue !== undefined ? props.defaultValue : 0,
      cast: (s: string) => Number(s),
      debug: !!(props.debug || globalDebug),
      value: props.value,
    });
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