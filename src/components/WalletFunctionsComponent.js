import React, { useState } from "react";
import { ethers } from "ethers";

const WalletFunctionsComponent = () => {
  const [privateKey, setPrivateKey] = useState("");
  // creating a wallet
  const createRandomWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    console.log("Random Wallet:", wallet);
    // Get the private key
    const privateKey = wallet.privateKey;
    setPrivateKey(wallet.privateKey);
    console.log("Private Key:", privateKey);
  };

  const connectToProvider = async () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://goerli.infura.io/v3/2e61e70560ca4ef7a8cdaa270fe2998f"
      );
      const wallet = new ethers.Wallet(privateKey, provider);
      console.log("Connected Wallet:", wallet);
    } catch (error) {
      console.error("Error connecting to provider:", error);
    }
  };

  const signMessage = async () => {
    try {
      const wallet = new ethers.Wallet(privateKey, ethers.getDefaultProvider());
      const message = "Hello, World!";
      const signature = await wallet.signMessage(message);
      console.log("Message Signature:", signature);
    } catch (error) {
      console.error("Error signing message:", error);
    }
  };

  const getBalance = async () => {
    try {
      const wallet = new ethers.Wallet(privateKey, ethers.getDefaultProvider());
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
