import React from "react";
import { ethers } from "ethers";

const WalletFunctionsComponent = () => {
  const createRandomWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    console.log("Random Wallet:", wallet);
  };

  const connectToProvider = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/YOUR_INFURA_API_KEY"
      );
      const wallet = new ethers.Wallet("YOUR_PRIVATE_KEY", provider);
      console.log("Connected Wallet:", wallet);
    } catch (error) {
      console.error("Error connecting to provider:", error);
    }
  };

  const signMessage = async () => {
    try {
      const wallet = new ethers.Wallet(
        "YOUR_PRIVATE_KEY",
        ethers.getDefaultProvider()
      );
      const message = "Hello, World!";
      const signature = await wallet.signMessage(message);
      console.log("Message Signature:", signature);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  const getBalance = async () => {
    try {
      const wallet = new ethers.Wallet(
        "YOUR_PRIVATE_KEY",
        ethers.getDefaultProvider()
      );
      const balance = await wallet.getBalance();
      console.log("Balance:", ethers.utils.formatEther(balance));
    } catch (error) {
      console.error("Error getting balance:", error);
    }
  };

  return (
    <div>
      <div>
        <button onClick={createRandomWallet}>Create Random Wallet</button>
        <button onClick={connectToProvider}>Connect to Provider</button>
        <button onClick={signMessage}>Sign Message</button>
        <button onClick={getBalance}>Get Balance</button>
      </div>
    </div>
  );
};

export default WalletFunctionsComponent;
