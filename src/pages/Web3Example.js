import React, { useState } from "react";
import Web3 from "web3";
import Web3EthComponent from "../components/web3js/Web3EthComponent";
import Web3EthContract from "../components/web3js/Web3EthContract";
import Web3EthEvents from "../components/web3js/Web3EthEvents";
import Web3UtilsComponent from "../components/web3js/Web3UtilsComponent";

function Web3Example() {
  return (
    <div>
      <h1>Web3.js</h1>
      <h2>Ethereum Component</h2>
      <Web3EthComponent />
      <h2>Ethereum Contract Interaction</h2>
      <Web3EthContract />
      <h2>Web3EthEvents</h2>
      <Web3EthEvents />
      <h2>Web3UtilsComponent</h2>
      <Web3UtilsComponent />
    </div>
  );
}

export default Web3Example;
