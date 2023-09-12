import React, { useState } from "react";
import Web3 from "web3";

function Web3Example() {
  const [web3, setWeb3] = useState(null);
  const initWeb3 = async () => {
    try {
      if (window.ethereum) {
        console.log(Web3.modules);
        const web3Instance = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3Instance);
        console.log(web3Instance);
      } else {
        console.log("Please install MetaMask");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Web3.js</h1>
      <button onClick={initWeb3}>Initiate Web3</button>
    </div>
  );
}

export default Web3Example;
