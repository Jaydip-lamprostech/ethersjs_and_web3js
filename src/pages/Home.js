import React from "react";
import EthersProviderExplanation from "../components/EthersProviderExplanation";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function Home() {
  return (
    <div>
      <ConnectButton />
      <h1>Ethers.js</h1>
      <EthersProviderExplanation />
    </div>
  );
}

export default Home;
