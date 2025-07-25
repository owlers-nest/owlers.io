// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const MockUSDTModule = buildModule("MockUSDTModule", (m) => {

  const MockUSDT = m.contract("MockUSDT");

  return { MockUSDT };
});

export default MockUSDTModule;