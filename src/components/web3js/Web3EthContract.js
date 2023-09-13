import React, { useState } from "react";
import { contract_abi } from "../../abi/abi";
import Web3 from "web3";

function Web3EthContract() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  const abi = contract_abi.abi;

  const loadContract = async () => {
    if (window.ethereum) {
      try {
        // Create a custom provider with your JSON-RPC endpoint
        const customProvider = new Web3.providers.HttpProvider(
          "https://sepolia.mode.network/"
        );
        const web3Instance = new Web3(customProvider);
        setWeb3(web3Instance);

        // Initialize your contract
        const contractAddress = "0x0DD14163784d36ad7156C8681914694d8Ad39472"; // Replace with your contract address
        const contractABI = [
          {
            inputs: [
              {
                internalType: "string",
                name: "_name",
                type: "string",
              },
            ],
            name: "setName",
            outputs: [],
            stateMutability: "nonpayable",
            type: "function",
          },
          {
            anonymous: false,
            inputs: [
              {
                indexed: true,
                internalType: "address",
                name: "userAddress",
                type: "address",
              },
              {
                indexed: false,
                internalType: "string",
                name: "name",
                type: "string",
              },
            ],
            name: "UserNameAdded",
            type: "event",
          },
          {
            inputs: [
              {
                internalType: "address",
                name: "",
                type: "address",
              },
            ],
            name: "userNames",
            outputs: [
              {
                internalType: "string",
                name: "",
                type: "string",
              },
            ],
            stateMutability: "view",
            type: "function",
          },
        ]; // Replace with your ABI
        const contractInstance = new web3Instance.eth.Contract(
          contractABI,
          contractAddress
        );
        setContract(contractInstance);
        const eventEmitter = contractInstance.events.allEvents();

        eventEmitter.on("data", (event) => {
          console.log("Received event:", event);
        });

        eventEmitter.on("error", (error) => {
          console.error("Error in event:", error);
        });
        console.log(contractInstance);
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Please install MetaMask");
    }
  };

  const callContractFunction = async () => {
    if (web3 && contract) {
      try {
        // Call a function on your contract
        const result = await contract.methods
          .getRegistrationPrice("jaydip")
          .call({ from: account });

        const price = web3.utils.fromWei(result, "ether");
        console.log("Result:", price);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // to clone the contract using web3js
  const cloneContract = async () => {
    const contractABI = abi; // Replace with your contract's ABI
    const contractBytecode = "0x0123456789abcdef..."; // Replace with your contract's bytecode
    const MyContract = new web3.eth.Contract(contractABI);
    const deployTransaction = MyContract.deploy({
      data: contractBytecode,
      arguments: [], // [arg1, arg2,...]
    });

    const receipt = await deployTransaction.send({
      from: account,
      gas: 1500000, // Adjust gas based on your contract's needs
      gasPrice: "30000000000", // Set gas price (in wei) based on your network
    });

    const deployedContractAddress = receipt.options.address;
    console.log(deployedContractAddress);
  };

  return (
    <div>
      <div>
        <button onClick={loadContract}>loadContract</button>
      </div>
      <div>
        <p>GetNamePrice</p>
        <button onClick={callContractFunction}>getNamePrice</button>
      </div>
    </div>
  );
}

export default Web3EthContract;
