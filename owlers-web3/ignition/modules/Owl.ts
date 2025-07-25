// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const OwlTokenModule = buildModule("OwlTokenModule", (m) => {

  const OwlToken = m.contract("OwlToken");

  return { OwlToken };
});

export default OwlTokenModule;