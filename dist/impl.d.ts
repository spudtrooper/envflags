import { type Ctor, ValidValue, ValidType } from "./types";
export declare class Flag<T extends ValidValue> {
    readonly defaultValue: T;
    readonly name: string;
    private readonly debug;
    readonly value: T;
    readonly type: ValidType;
    constructor({ name, defaultValue, cast, debug, value, }: {
        name: string;
        defaultValue: T;
        cast: (s: string) => T;
        debug: boolean;
        value?: string | null;
    });
    private static getValue;
}
declare const newString: Ctor<string>;
declare const newBoolean: Ctor<boolean>;
declare const newNumber: Ctor<number>;
export { newString, newNumber, newBoolean, };
