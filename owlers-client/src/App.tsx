import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideNav from './modules/components/side-nav';
import './App.css';
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import { getChainId } from '@wagmi/core'
import { useEffect } from "react";
import { OWL_TOKEN_ADDRESS } from "./constants";
import { insertAddress, updateBalance, updateNetwork } from "./modules/store/slices/wallet";
import { useDispatch } from "react-redux";

import { config } from "./modules/web3/provider";

const App = () => {
  const dispatch = useDispatch();
  const { isConnected, address, chainId: currentChainId } = useAccount();

  const chainNativeBalance = useBalance({
    address
  });

  const owlBalance = useBalance({
    address,
    token: OWL_TOKEN_ADDRESS
  })

  const {chains, switchChain} = useSwitchChain();

  const chainId = getChainId(config);

  useEffect(() => {
    if (isConnected && chainId && chains) {
      
      const currentChain = chains.find(chain => chain.id === currentChainId);
      if (currentChain) {
        dispatch(updateNetwork({ id: chainId, symbol: currentChain.nativeCurrency.symbol, name: currentChain.name }))
      } else {
        switchChain({chainId: 56});
      }
    }
  }, [chainId, chains, isConnected])

  useEffect(() => {
    if (isConnected && address) {
      console.log("you are connected");
      dispatch(insertAddress([address]));
    }
  }, [isConnected, address]);

  useEffect(() => {
    if (isConnected && chainNativeBalance.data) {
      dispatch(updateBalance({
        address: address || "",
        balance: {
          symbol: chainNativeBalance.data.symbol,
          balance: Number(chainNativeBalance.data.formatted),
          type: "NATIVE"
        }
      }))
    }
  }, [chainNativeBalance, isConnected]);


  useEffect(() => {
    if (owlBalance.data && isConnected) {
      dispatch(updateBalance({
        address: address || "",
        balance: {
          symbol: owlBalance.data.symbol,
          balance: Number(owlBalance.data.formatted),
          type: "TOKEN"
        }
      }))
    }
  }, [owlBalance, isConnected]);

  return (
    <Flex>
      <SideNav />
      <main style={{ marginLeft: "110px", padding: "10px", width: "calc(100% - 110px)" }}>
        <Outlet />
      </main>
    </Flex>
  )
}

export default App;
