import {
  Address,
  type AddressValue,
  Capability,
  type Change,
  type Handle,
  type Hex,
  type InferParams,
  type ParamsSpec,
  Protocol,
  Query,
  Receipt,
  type ReceiptResult,
} from "@themoss/core";
import { decodeEventLog } from "viem";
import { DailyCheckInAbi } from "./abis/dailycheckin.js";

/**
 * Learning-only deployment.
 *
 * Network: Monad Testnet
 * Chain ID: 10143
 *
 * This address is not a Monad Mainnet deployment and must not be treated as
 * production-ready Moss protocol metadata.
 */
export const DAILY_CHECKIN_ADDRESS: AddressValue =
  "0xcB4993E563a4C892d945277C53a39ee6885097E0";

const noParams = {} satisfies ParamsSpec;

const userParams = {
  user: {
    type: Address,
    description: "Address whose DailyCheckIn state should be read.",
  },
} satisfies ParamsSpec;

export type CheckInOutcome = {
  operation: "checkIn";
  user: AddressValue;
  day: string;
  totalCount: string;
};

/**
 * Pure CheckedIn-event decoder.
 *
 * This helper is independently testable even though the current Moss Registry
 * cannot register a Capability without one of its DeFi-oriented risk labels.
 */
export function decodeCheckedInChange(change: Change): CheckInOutcome {
  if (change.kind !== "event") {
    throw new Error("DailyCheckIn Receipt expected one CheckedIn event");
  }

  if (change.address.toLowerCase() !== DAILY_CHECKIN_ADDRESS.toLowerCase()) {
    throw new Error(
      `Unexpected Change: event emitted by unsupported address ${change.address}`,
    );
  }

  let decoded: ReturnType<typeof decodeEventLog<typeof DailyCheckInAbi>>;

  try {
    decoded = decodeEventLog({
      abi: DailyCheckInAbi,
      topics: change.topics as [Hex, ...Hex[]],
      data: change.data,
      strict: true,
    });
  } catch {
    throw new Error("Unexpected Change: unable to decode DailyCheckIn event");
  }

  if (decoded.eventName !== "CheckedIn") {
    throw new Error(
      `Unexpected Change: DailyCheckIn emitted ${decoded.eventName}`,
    );
  }

  return {
    operation: "checkIn",
    user: decoded.args.user,
    day: decoded.args.day.toString(),
    totalCount: decoded.args.totalCount.toString(),
  };
}

/**
 * Learning-only Moss adapter skeleton for DailyCheckIn.
 *
 * Semantic limitations:
 *
 * 1. Moss currently has no exact protocol category for a generic daily
 *    check-in application. `rewards` is a provisional compatibility choice.
 *
 * 2. Moss currently has no `check-in` verb. `claim` is a provisional
 *    compatibility choice.
 *
 * 3. Moss requires every Capability to declare at least one risk label, but
 *    its current labels are fundOut, approval, and priceImpact. None accurately
 *    describes DailyCheckIn.checkIn().
 *
 * For that reason risk remains empty rather than assigning false metadata.
 * The Registry rejection is documented and tested as a compatibility finding.
 */
@Protocol({
  name: "daily-checkin",
  category: "rewards",
  description:
    "Learning-only Monad Testnet adapter skeleton for one-check-in-per-UTC-day activity.",
  contracts: {
    dailyCheckIn: {
      abi: DailyCheckInAbi,
      addr: DAILY_CHECKIN_ADDRESS,
    },
  },
  labels: {
    DailyCheckIn: DAILY_CHECKIN_ADDRESS,
  },
})
export class DailyCheckInProtocol {
  declare dailyCheckIn: Handle<typeof DailyCheckInAbi>;

  @Capability<DailyCheckInProtocol, typeof noParams>({
    intent: "Check in once during the current UTC day",
    verb: "claim",
    params: noParams,
    receipt: "checkInReceipt",
    risk: [],
    tags: ["learning", "testnet", "daily-checkin"],
  })
  async checkIn(_: InferParams<typeof noParams>) {
    return [this.dailyCheckIn.checkIn([])];
  }

  @Query({
    intent: "Check whether an address may check in during the current UTC day",
    params: userParams,
    tags: ["learning", "testnet"],
  })
  async canCheckIn(params: InferParams<typeof userParams>) {
    const allowed = await this.dailyCheckIn.read.canCheckIn([params.user]);

    return {
      user: params.user,
      canCheckIn: allowed,
    };
  }

  @Query({
    intent: "Read the total DailyCheckIn count for an address",
    params: userParams,
    tags: ["learning", "testnet"],
  })
  async checkInCount(params: InferParams<typeof userParams>) {
    const totalCount = await this.dailyCheckIn.read.checkInCount([params.user]);

    return {
      user: params.user,
      totalCount: totalCount.toString(),
    };
  }

  @Query({
    intent: "Read the UTC day number of an address's latest check-in",
    params: userParams,
    tags: ["learning", "testnet"],
  })
  async lastCheckInDay(params: InferParams<typeof userParams>) {
    const day = await this.dailyCheckIn.read.lastCheckInDay([params.user]);

    return {
      user: params.user,
      lastCheckInDay: day.toString(),
    };
  }

  @Receipt()
  checkInReceipt(changes: readonly Change[]): ReceiptResult<CheckInOutcome> {
    if (changes.length !== 1) {
      throw new Error(
        `DailyCheckIn Receipt expected exactly one Change, received ${changes.length}`,
      );
    }

    const change = changes[0];

    if (!change) {
      throw new Error("DailyCheckIn Receipt received no Change");
    }

    const outcome = decodeCheckedInChange(change);

    const text =
      `Daily check-in completed by ${outcome.user} on UTC day ` +
      `${outcome.day}; total count is ${outcome.totalCount}.`;

    return {
      kind: "receipt",
      outcome,
      text,
      changes: [
        {
          kind: "change",
          change,
          data: outcome,
          text,
        },
      ],
    };
  }
}
