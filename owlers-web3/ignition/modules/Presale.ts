// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const PresaleModule = buildModule("PresaleModule", (m) => {

  const owlTokenAddress = '0x4654936576e68E4d9BB839Acc5F194089A5cD285';
  const usdtAddress = '0x870F23d41Bb82cfd5fb80e2297b00d2f65122a33';

  const Presale = m.contract("Presale", [usdtAddress, owlTokenAddress]);

  return { Presale };
});

export default  PresaleModule;