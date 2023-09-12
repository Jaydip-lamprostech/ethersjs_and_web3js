import React, { useState } from "react";
import { ethers } from "ethers";

const EthersUtilsComponent = () => {
  const [inputValue, setInputValue] = useState("Hello World");
  const [output, setOutput] = useState("");

  const getAddress = () => {
    const address = ethers.utils.getAddress(inputValue);
    setOutput(address);
    console.log("Normalized Address:", address);
  };

  const hexlify = () => {
    const hexString = ethers.utils.hexlify(inputValue);
    setOutput(hexString);
    console.log("Hexadecimal String:", hexString);
  };

  const sha256Hash = () => {
    const hash = ethers.utils.sha256(inputValue);
    setOutput(hash);
    console.log("SHA256 Hash:", hash);
  };
  // convert from eth to wei
  const parseEther = () => {
    const weiValue = ethers.utils.parseEther(inputValue);
    setOutput(weiValue.toString());
    console.log("Wei Value:", weiValue.toString());
  };
  // convert from wei to eth
  const parseWei = () => {
    const weiValue = ethers.utils.formatEther(inputValue);
    setOutput(weiValue.toString());
    console.log("ETH Value:", weiValue.toString());
  };
  return (
    <div>
      <div>
        <label>Input Value:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </div>

      <div>
        <button onClick={getAddress}>Get Address</button>
        <button onClick={hexlify}>Hexlify</button>
        <button onClick={sha256Hash}>SHA256 Hash</button>
        <button onClick={parseEther}>Parse Ether</button>
        <button onClick={parseWei}>Parse Wei</button>
      </div>

      <div>
        <h3>Output:</h3>
        <p>{output}</p>
      </div>
    </div>
  );
};

export default EthersUtilsComponent;
