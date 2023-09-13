import React, { useState } from "react";
import Web3 from "web3";

function Web3EthComponent() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [txStatus, setTxStatus] = useState({
    status: "-",
    receipt: "-",
  });
  const [txHash, settxHash] = useState("");

  const initWeb3 = async () => {
    try {
      if (window.ethereum) {
        console.log(Web3.modules);
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);
        console.log(web3Instance);
        // get all the connected accounts
        console.log(await web3Instance.eth.getAccounts());

        console.log(web3Instance.eth.ens);

        const getAddress = await web3Instance.eth.ens.getOwner(
          "vitalik.eth",
          () => {}
        );
        console.log("vitalik.eth owner -", getAddress);
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

    // utils will be useful to convert the wei to eth
    const balanceEth = web3.utils.fromWei(balanceWei, "ether");
    setBalance(balanceEth);
  };
  const handleSendTransaction = async () => {
    setTxStatus({
      status: "-",
    });
    settxHash("");
    if (web3) {
      try {
        await web3.eth
          .sendTransaction({
            from: account,
            to: "0xB7F98F7571B953a2d6Bc2EE6417E64FC7664C865", // Replace with actual recipient address
            value: web3.utils.toWei("0.01", "ether"), // Sending 0.01 ETH
          })
          .once("sending", function (payload) {
            setTxStatus({ status: "Sending..." });
            console.log(payload);
          })
          .once("sent", function (payload) {
            setTxStatus("Waiting for the confirmation...");
            setTxStatus({ ...txStatus, status: "Sent" });
            console.log("sent -", payload);
          })
          .once("transactionHash", function (hash) {
            setTxStatus({
              status: "Waiting for the confirmation...",
            });
            settxHash(hash);

            console.log("hash -", hash);
          })
          .once("receipt", function (receipt) {
            setTxStatus({
              status: " Transferred Successfully",
            });

            console.log("receipt -", receipt);
          })
          .on("confirmation", function (confNumber) {
            console.log("confNumber -", confNumber);
            console.log("latestBlockHash -", confNumber.latestBlockHash);
            console.log("receipt -", confNumber.receipt);
          })
          .on("error", function (error) {
            console.log(error.message);
          })
          .then(function (receipt) {
            // will be fired once the receipt is mined
          });
      } catch (error) {
        console.error(error);
      }
    }
  };

  const CreateAccountUsingWeb3 = async () => {
    const account = await web3.eth.accounts.create();
    console.log(account);
  };
  return (
    <div>
      <button onClick={initWeb3}>Initiate Web3</button>
      {account && <p>Current Account: {account}</p>}{" "}
      <button onClick={fetchAccount}>fetchAccount</button>
      {balance && <p>Balance: {balance} ETH</p>}
      <button onClick={fetchBalance}>fetchBalance</button>
      <div>
        <button onClick={handleSendTransaction}>Send Transaction</button>
        <table>
          <thead>
            <tr>
              <th>info</th>
              <th>value</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Transaction Status</td>
              <td>{txStatus.status}</td>
            </tr>
            <tr>
              <td>Transaction Hash</td>
              <td>{txHash}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <p>Create Account</p>
        <button onClick={CreateAccountUsingWeb3}>Create Account</button>
      </div>
    </div>
  );
}

export default Web3EthComponent;
