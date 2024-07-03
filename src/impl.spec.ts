
import { mock } from "node:test";
import { newString, newBoolean, newNumber } from "./impl";


describe("impl", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = {};
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  const mockEnv = (env: Record<string, string>) => {
    process.env = {
      ...originalEnv,
      ...env,
    };
  };

  it("string: no default value", () => {
    const f = newString({ name: "FLAG__STRING" });
    expect(f.value).toEqual("");
  });
  it("string: debug", () => {
    const f = newString({ name: "FLAG__STRING", debug: true });
    expect(f.value).toEqual("");
  });
  it("string: default value", () => {
    const f = newString({ name: "FLAG__STRING", defaultValue: "theDefaultValue" });
    expect(f.value).toEqual("theDefaultValue");
  });
  it("string: with env var", () => {
    mockEnv({ "FLAG__STRING": "newValue" });
    const f = newString({ name: "FLAG__STRING" });
    expect(f.value).toEqual("newValue");
  });
  it("string: with env var and defaultValue", () => {
    mockEnv({ "FLAG__STRING": "newValue" });
    const f = newString({ name: "FLAG__STRING", defaultValue: "theDefaultValue" });
    expect(f.value).toEqual("newValue");
  });
  it("string: set from value", () => {
    mockEnv({ "FLAG__STRING": "newValue" });
    const f = newString({ name: "FLAG__STRING", defaultValue: "theDefaultValue", value: "theValue" });
    expect(f.value).toEqual("theValue");
  });

  it("boolean: no default value", () => {
    const f = newBoolean({ name: "FLAG__BOOLEAN" });
    expect(f.value).toEqual(false);
  });
  it("boolean: debug", () => {
    const f = newBoolean({ name: "FLAG__BOOLEAN", debug: true });
    expect(f.value).toEqual(false);
  });
  it("boolean: default value", () => {
    const f = newBoolean({ name: "FLAG__BOOLEAN", defaultValue: true });
    expect(f.value).toEqual(true);
  });
  it("boolean: with env var true", () => {
    mockEnv({ "FLAG__BOOLEAN": "true" });
    const f = newBoolean({ name: "FLAG__BOOLEAN" });
    expect(f.value).toEqual(true);
  });
  it("boolean: with env var 1", () => {
    mockEnv({ "FLAG__BOOLEAN": "1" });
    const f = newBoolean({ name: "FLAG__BOOLEAN" });
    expect(f.value).toEqual(true);
  });
  it("boolean: with env var and defaultValue", () => {
    mockEnv({ "FLAG__BOOLEAN": "false" });
    const f = newBoolean({ name: "FLAG__BOOLEAN", defaultValue: true });
    expect(f.value).toEqual(false);
  });
  it("boolean: set from value", () => {
    mockEnv({ "FLAG__BOOLEAN": "false" });
    const f = newBoolean({ name: "FLAG__BOOLEAN", defaultValue: false, value: "true" });
    expect(f.value).toEqual(true);
  });

  it("number: no default value", () => {
    const f = newNumber({ name: "FLAG__NUMBER" });
    expect(f.value).toEqual(0);
  });
  it("number: debug", () => {
    const f = newNumber({ name: "FLAG__NUMBER", debug: true });
    expect(f.value).toEqual(0);
  });
  it("number: default value", () => {
    const f = newNumber({ name: "FLAG__NUMBER", defaultValue: 3 });
    expect(f.value).toEqual(3);
  });
  it("number: with env var", () => {
    mockEnv({ "FLAG__NUMBER": "3" });
    const f = newNumber({ name: "FLAG__NUMBER" });
    expect(f.value).toEqual(3);
  });
  it("number: with env var and defaultValue", () => {
    mockEnv({ "FLAG__NUMBER": "1" });
    const f = newNumber({ name: "FLAG__NUMBER", defaultValue: 3 });
    expect(f.value).toEqual(1);
  });
  it("number: set from value", () => {
    mockEnv({ "FLAG__NUMBER": "1" });
    const f = newNumber({ name: "FLAG__NUMBER", defaultValue: 3, value: "5" });
    expect(f.value).toEqual(5);
  });
});