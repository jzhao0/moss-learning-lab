// ABI origin:
//   Source contract:
//   https://github.com/jzhao0/daily-checkin-monad/blob/main/DailyCheckIn.sol
//
//   Network: Monad Testnet
//   Chain ID: 10143
//   Contract: 0xcB4993E563a4C892d945277C53a39ee6885097E0
//
// Learning-only ABI derived from the verified project source.
// This is not presented as a Monad Mainnet production integration.

import { parseAbi } from "viem";

export const DailyCheckInAbi = parseAbi([
  "function checkIn()",
  "function checkInCount(address user) view returns (uint256)",
  "function lastCheckInDay(address user) view returns (uint256)",
  "function canCheckIn(address user) view returns (bool)",
  "event CheckedIn(address indexed user, uint256 indexed day, uint256 totalCount)",
]);
