import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
// import { system } from "@chakra-ui/react/preset";
import { RouterProvider } from "react-router-dom";
import { store } from "./modules/store/store.ts";
import { Provider as ReduxProvider } from "react-redux";
import { Web3Provider } from "./modules/web3/provider.tsx";
import router from "./routes";
import { system } from "./theme.ts";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={system}>
      <ReduxProvider store={store}>
        <Web3Provider>
          <RouterProvider router={router} />
        </Web3Provider>
      </ReduxProvider>
    </ChakraProvider>
  </StrictMode>,
);
