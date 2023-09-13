import React, { useState } from "react";
import { ethers } from "ethers";

const EthersUtilsComponent = () => {
  const [inputValue, setInputValue] = useState("1");
  const [output, setOutput] = useState("");

  const getAddress = () => {
    //
    // Returns address as a Checksum Address.
    // If address is an invalid 40-nibble HexString or if it contains mixed case and the checksum is invalid,
    // an INVALID_ARGUMENT Error is thrown.
    const address = ethers.utils.getAddress(
      "0x1B1d688A5b37e57Be1179694D0f15E05B6de8cC3"
    );
    setOutput(address);
    console.log("Normalized Address:", address);
  };

  // Bytes Manipulation:
  const hexlify = () => {
    // Converts values to hexadecimal strings.
    const hexString = ethers.utils.hexlify({ length: 2, 0: 1, 1: 2 }); // Valid hex string
    setOutput(hexString);
    console.log("Hexadecimal String:", hexString);
  };
  // Hashing Functions: Secure Hash Algorithm
  const sha256Hash = () => {
    // Computes SHA256 hashes.
    const hash = ethers.utils.sha256("0x1234");
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
      <div></div>

      <div>
        <button onClick={getAddress}>Get Address</button>
        <button onClick={hexlify}>Hexlify</button>
        <button onClick={sha256Hash}>SHA256 Hash</button>
      </div>
      <div>
        <label>Input Value:</label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />

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
