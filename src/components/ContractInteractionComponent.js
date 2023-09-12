import React, { useState } from "react";
import { ethers } from "ethers";
import { contract_abi } from "../abi/abi";

const ContractInteractionComponent = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [abi, setAbi] = useState(contract_abi.abi);
  const [address, setAddress] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [contract, setContract] = useState(null);

  const connectWallet = async () => {
    try {
      const wallet = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.mode.network/"
      ); // U
      console.log("Wallet connected:", wallet[0]);
      setAddress(wallet[0]);
      //   setContract(
      //     new ethers.Contract(contractAddress, abi, provider.getSigner())
      //   );
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  const loadContract = () => {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        "https://sepolia.mode.network/"
      );
      const loadedContract = new ethers.Contract(
        contractAddress,
        abi,
        provider
      );
      console.log("Contract loaded:", loadedContract);
      setContract(loadedContract);
    } catch (error) {
      console.error("Error loading contract:", error);
    }
  };

  const callFunction = async () => {
    try {
      const response = await contract[functionName]("jaydipsomething");
      console.log(`Function "${functionName}" called. Result:`, response);

      const etherValue = ethers.utils.formatEther(response);

      console.log(etherValue);
    } catch (error) {
      console.error("Error calling function:", error);
    }
  };

  const sendTransaction = async () => {
    try {
      const tx = await contract[functionName](inputValue);
      await tx.wait();
      console.log(
        `Transaction sent successfully for function "${functionName}"`
      );
    } catch (error) {
      console.error("Error sending transaction:", error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Contract Address"
          value={contractAddress}
          onChange={(e) => setContractAddress(e.target.value)}
        />
      </div>

      <div>
        <input
          type="text"
          placeholder="Function Name"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
        />
      </div>
      <div>
        <div>
          <p>Connected Address :{address}</p>

          <button onClick={connectWallet}>Connect Wallet</button>
        </div>
        <button onClick={loadContract}>Load Contract</button>

        <button onClick={callFunction} disabled={!contract}>
          Call Function
        </button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Input Value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

        <button onClick={sendTransaction} disabled={!contract}>
          Send Transaction
        </button>
      </div>
    </div>
  );
};

export default ContractInteractionComponent;
