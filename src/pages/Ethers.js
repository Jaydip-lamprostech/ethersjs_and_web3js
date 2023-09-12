import React from "react";
import EthersProviderExplanation from "../components/EthersProviderExplanation";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import ContractInteractionComponent from "../components/ContractInteractionComponent";
import ContractDeploymentComponent from "../components/ContractDeploymentComponent";
import EthersUtilsComponent from "../components/EthersUtilsComponent";
import WalletFunctionsComponent from "../components/WalletFunctionsComponent";

function Ethers() {
  return (
    <div>
      <ConnectButton />
      <h1>Ethers.js</h1>
      <EthersProviderExplanation />
      <hr />
      <h1>Ethers Contract Interaction</h1>
      <ContractInteractionComponent />
      <hr />
      <h1>Ethers Contract Deployment</h1>
      <ContractDeploymentComponent />
      <hr />
      <h1>Ethers Utils Deployment</h1>
      <EthersUtilsComponent />
      <hr />
      <h1>Ethers.Wallet</h1>
      <WalletFunctionsComponent />
    </div>
  );
}

export default Ethers;
