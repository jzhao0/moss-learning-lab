import {
  type Change,
  type Hex,
  type MossRuntime,
  Registry,
} from "@themoss/core";
import {
  encodeAbiParameters,
  encodeEventTopics,
  encodeFunctionData,
  getAddress,
} from "viem";
import { describe, expect, it } from "vitest";
import { DailyCheckInAbi } from "../src/abis/dailycheckin.js";
import {
  DAILY_CHECKIN_ADDRESS,
  DailyCheckInProtocol,
  decodeCheckedInChange,
} from "../src/index.js";

const ACCOUNT = getAddress(
  "0xcccccccccccccccccccccccccccccccccccccccc",
);

const runtime = {
  rpcUrl: "http://offline",
  client: {} as MossRuntime["client"],
};

function checkedInChange(): Extract<Change, { kind: "event" }> {
  return {
    kind: "event",
    address: DAILY_CHECKIN_ADDRESS,
    topics: encodeEventTopics({
      abi: DailyCheckInAbi,
      eventName: "CheckedIn",
      args: {
        user: ACCOUNT,
        day: 20293n,
      },
    }) as readonly Hex[],
    data: encodeAbiParameters(
      [{ type: "uint256" }],
      [3n],
    ),
  };
}

describe("DailyCheckIn learning adapter skeleton", () => {
  it("constructs typed calldata for the checkIn function", () => {
    const data = encodeFunctionData({
      abi: DailyCheckInAbi,
      functionName: "checkIn",
    });

    expect(data).toMatch(/^0x[0-9a-f]+$/);
    expect(data.length).toBe(10);
  });

  it("decodes the CheckedIn event into a structured outcome", () => {
    expect(decodeCheckedInChange(checkedInChange())).toEqual({
      operation: "checkIn",
      user: ACCOUNT,
      day: "20293",
      totalCount: "3",
    });
  });

  it("rejects an event emitted by an unsupported contract address", () => {
    const change = {
      ...checkedInChange(),
      address: getAddress(
        "0x1111111111111111111111111111111111111111",
      ),
    } satisfies Change;

    expect(() => decodeCheckedInChange(change)).toThrow(
      "unsupported address",
    );
  });

  it("documents the current Moss risk-vocabulary incompatibility", () => {
    expect(() => new Registry(runtime).use(DailyCheckInProtocol)).toThrow(
      'capability "daily-checkin.checkIn" must declare a risk label',
    );
  });
});
