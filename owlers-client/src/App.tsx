import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideNav from './modules/components/side-nav/side-nav';
import Header from "./modules/components/side-nav/header";
import './App.css';
import { useAccount, useBalance, useSwitchChain } from "wagmi";
import { getChainId } from '@wagmi/core'
import { useEffect } from "react";
import { OWL_TOKEN_ADDRESS } from "./constants";
import { insertAddress, updateBalance, updateNetwork } from "./modules/store/slices/wallet";
import { useDispatch, useSelector } from "react-redux";

import { config } from "./modules/web3/provider";
import useWindowSize from "./modules/shared/hooks/window-size";
import { setWindow } from "./modules/store/slices/ui";
import { getIsSmallMobile, getIsTabletAndLargeMobile } from "./modules/store/selectors/ui";

const App = () => {
  const dispatch = useDispatch();
  const { isConnected, address, chainId: currentChainId } = useAccount();

  const isSmallMobile = useSelector(getIsSmallMobile);
  const isTabletAndLargeMobile = useSelector(getIsTabletAndLargeMobile);

  const windowSize = useWindowSize();

  useEffect(() => {
    dispatch(setWindow(windowSize));
  }, [windowSize]);

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
      {isSmallMobile || isTabletAndLargeMobile ? <Header /> : null}
      <main style={{ marginLeft: "110px", padding: "10px", width: "calc(100% - 110px)" }} className={isSmallMobile || isTabletAndLargeMobile ? 'isMobile' : ''}>
        <Outlet />
      </main>
      <SideNav />
    </Flex>
  )
}

export default App;
