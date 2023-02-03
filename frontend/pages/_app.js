import { Navbar } from "../components/Navbar"; // pages/_app.js
import { ChakraProvider } from "@chakra-ui/react";

import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  Chain,
} from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
// import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

const fvmChain = {
  id: 3141,
  name: "HyperSpace Test",
  network: "hyperspace",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "tFil",
    symbol: "tFil",
  },
  rpcUrls: {
    default: "https://api.hyperspace.node.glif.io/rpc/v1",
  },
  blockExplorers: {
    default: {
      name: "hyperspace",
      url: "https://api.hyperspace.node.glif.io/rpc/v1",
    },
    etherscan: {
      name: "filfox",
      url: "https://hyperspace.filfox.info/en",
    },
  },
  testnet: true,
};

const { provider, chains } = configureChains(
  [fvmChain],
  [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
);

const { connectors } = getDefaultWallets({
  appName: "RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  // webSocketProvider,
});

function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <ChakraProvider>
          <Navbar />
          <Component {...pageProps} />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
