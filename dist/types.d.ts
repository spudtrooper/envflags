export type ValidValue = string | number | boolean;
export type ValidType = "string" | "number" | "boolean";
export interface Props<T extends ValidValue> {
    name: string;
    defaultValue?: T;
    debug?: boolean;
    value?: string | null;
}
interface Flag<T extends ValidValue> {
    value: T;
    type: ValidType;
    defaultValue: T;
}
type Ctor<T extends ValidValue> = (props: Props<T>) => Flag<T>;
type StringFlag = Flag<string>;
type NumberFlag = Flag<number>;
type BooleanFlag = Flag<boolean>;
export { type StringFlag, type NumberFlag, type BooleanFlag, type Ctor, };
