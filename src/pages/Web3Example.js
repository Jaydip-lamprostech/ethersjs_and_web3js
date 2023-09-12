import React, { useState } from "react";
import Web3 from "web3";

function Web3Example() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

  const initWeb3 = async () => {
    try {
      if (window.ethereum) {
        console.log(Web3.modules);
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);
        console.log(web3Instance);
        console.log(await web3Instance.eth.getAccounts());
        console.log(web3Instance.eth.ens);
      } else {
        console.log("Please install MetaMask");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const fetchAccount = async () => {
    const accounts = await web3.eth.getAccounts();
    setAccount(accounts[0]);
  };

  const fetchBalance = async () => {
    const accounts = await web3.eth.getAccounts();
    const balanceWei = await web3.eth.getBalance(accounts[0]);
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    setBalance(balanceEth);
  };
  const handleSendTransaction = async () => {
    if (web3) {
      try {
        await web3.eth.sendTransaction({
          from: account,
          to: "0xReceiverAddress", // Replace with actual recipient address
          value: web3.utils.toWei("0.01", "ether"), // Sending 0.01 ETH
        });
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div>
      <h1>Web3.js</h1>
      <h2>Ethereum Component</h2>
      <button onClick={initWeb3}>Initiate Web3</button>
      {account && <p>Current Account: {account}</p>}{" "}
      <button onClick={fetchAccount}>fetchAccount</button>
      {balance && <p>Balance: {balance} ETH</p>}
      <button onClick={fetchBalance}>fetchBalance</button>
      <button onClick={handleSendTransaction}>Send Transaction</button>
    </div>
  );
}

export default Web3Example;
