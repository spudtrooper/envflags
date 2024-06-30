export type ValidValue = string | number | boolean;
export interface Props<T extends ValidValue> {
    name: string;
    defaultValue?: T;
    debug?: boolean;
}
interface Flag<T extends ValidValue> {
    value: T;
}
type Ctor<T extends ValidValue> = (props: Props<T>) => Flag<T>;
type StringFlag = Flag<string>;
type NumberFlag = Flag<number>;
type BooleanFlag = Flag<boolean>;
export { type StringFlag, type NumberFlag, type BooleanFlag, type Ctor, };
