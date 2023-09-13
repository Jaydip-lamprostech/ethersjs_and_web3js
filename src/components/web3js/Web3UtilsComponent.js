import React, { useState } from "react";
import Web3 from "web3";

const Web3UtilsComponent = () => {
  const [ethValue, setEthValue] = useState("1");
  const [weiValue, setWeiValue] = useState("1000000000000000000");
  const [checksumAddress, setChecksumAddress] = useState("");
  const [randomHex, setRandomHex] = useState("");

  const handleEthToWei = () => {
    const wei = Web3.utils.toWei(ethValue, "ether");
    console.log(wei);
    setWeiValue(wei);
  };

  const handleWeiToEth = () => {
    const eth = Web3.utils.fromWei(weiValue, "ether");
    setEthValue(eth);
  };

  //The purpose of a checksum address is to ensure that a user does not accidentally mistype an address,
  // which could result in the loss of funds. It's especially important when dealing with large sums of cryptocurrency.
  const handleChecksumAddress = () => {
    const address = Web3.utils.toChecksumAddress(
      "0x3C124eBCEaFb86ADF43a882628945a9632FE1020"
    );
    setChecksumAddress(address);
  };

  const generateRandomHex = () => {
    const randomHex = Web3.utils.randomHex(32);
    setRandomHex(randomHex);
  };

  const sha3 = (text) => {
    const sha3Result = Web3.utils.sha3(text);
    console.log("sha3Result - ", sha3Result);
    const keccak256Result = Web3.utils.keccak256(text);
    console.log("keccak256Result - ", keccak256Result);
  };
  return (
    <div className="Web3UtilsComponent">
      <div>
        <label>Ether Value:</label>
        <input
          type="text"
          value={ethValue}
          onChange={(e) => setEthValue(e.target.value)}
        />
        <button onClick={handleEthToWei}>Convert to Wei</button>
      </div>
      <div>
        <label>Wei Value:</label>
        <input
          type="text"
          value={weiValue}
          onChange={(e) => setWeiValue(e.target.value)}
        />
        <button onClick={handleWeiToEth}>Convert to Ether</button>
      </div>
      <div>
        <button onClick={handleChecksumAddress}>
          Generate Checksum Address
        </button>
        <div>Checksum Address: {checksumAddress}</div>
      </div>
      <div>
        <button onClick={generateRandomHex}>Generate Random Hex</button>
        <div>Random Hex: {randomHex}</div>
      </div>
      <div>
        <button onClick={() => sha3("lampros tech")}>sha3</button>
      </div>
    </div>
  );
};

export default Web3UtilsComponent;
