import { RootState } from "../store";

export const getWalletAddresses = (state: RootState) => state.wallet.addresses;
export const getBalancesByAddress = (walletAddress: string) => (state: RootState) => state.wallet.byAddress[walletAddress];
export const getNetwork = (state: RootState) => state.wallet.network;