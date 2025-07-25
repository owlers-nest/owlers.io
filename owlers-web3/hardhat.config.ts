import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  defaultNetwork: "ganache",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545",
      accounts: ["0x7f6e29098fef0ce5aa9db2620f945334556e3cfb6e5caf6a6db02ba5ee790ddb"], // private key
      chainId: 1337,
      from: "0x7f6e29098fef0ce5aa9db2620f945334556e3cfb6e5caf6a6db02ba5ee790ddb" // private key
    }
  }
};

export default config;
