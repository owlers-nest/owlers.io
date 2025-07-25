import { WagmiProvider, createConfig, http } from "wagmi";
import { localhost, bsc } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    // mainnet,
    // localhost
    chains: [localhost, bsc],
    transports: {
      // RPC URL for each chain
      // [mainnet.id]: http(
      //   `https://eth-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`,
      // ),
      [localhost.id]: http("http://127.0.0.1:7545"),
      [bsc.id]: http("https://bsc-dataseed.binance.org"),
    },

    // Required API Keys
    walletConnectProjectId: import.meta.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID as string,

    // Required App Info
    appName: "Sharkoo",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: any) => {
  return (
    <WagmiProvider config={config as any}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider customTheme={{
        "--ck-accent-color": "#49A0C7",
        "--ck-accent-text-color": "#ffffff",
        "--ck-connectbutton-color": "#fffff",
        "--ck-connectbutton-background": "#49A0C7"
  }}>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};