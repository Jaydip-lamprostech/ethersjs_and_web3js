import React, { useState } from "react";
import { contract_abi } from "../../abi/abi";
import Web3 from "web3";

function Web3EthEvents() {
  const [account, setAccount] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  const initWeb3 = async () => {
    const web3Instance = new Web3(window.ethereum);
    setWeb3(web3Instance);
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
    const contractAddress = "0xDbC50cE0F71621E334ebC73135ed26b184da4984"; // Replace with your contract address
    const contractABI = contract_abi.abi; // Replace with your contract's ABI

    const MyContract = new web3Instance.eth.Contract(
      contractABI,
      contractAddress
    );
    setContract(MyContract);
    console.log(MyContract);
    console.log("getting past events...");
    const events = await MyContract.getPastEvents("NameRegistered", {
      fromBlock: 0,
      toBlock: "latest",
    });

    console.log("All Past Events:", events);

    // const result = await MyContract.methods
    //   .userNames("0xe57f4c84539a6414C4Cf48f135210e01c477EFE0")
    //   .call({ from: account });
    // console.log(result);

    const eventEmitter = MyContract.events.allEvents();

    eventEmitter.on("data", (event) => {
      console.log("Received event:", event);
    });

    eventEmitter.on("error", (error) => {
      console.error("Error in event:", error);
    });
  };
  const handleSetName = async () => {
    if (web3 && contract) {
      try {
        const name = "jd";
        const result = await contract.methods
          .setName(name)
          .send({ from: "0x1B1d688A5b37e57Be1179694D0f15E05B6de8cC3" });

        console.log("Transaction Result:", result);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      Web3EthEvents <button onClick={initWeb3}>Listen Events</button>
      <button onClick={handleSetName}>setName</button>
    </div>
  );
}

export default Web3EthEvents;
