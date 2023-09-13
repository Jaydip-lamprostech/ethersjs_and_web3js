import React, { useState } from "react";
import { ethers } from "ethers";

const ContractDeploymentComponent = () => {
  const [contractAddress, setContractAddress] = useState("");

  const [abi, setAbi] = useState([
    "constructor(address owner, uint256 initialValue)",
    "function value() view returns (uint)",
  ]);

  const [address, setAddress] = useState("");

  const [contract, setContract] = useState(null);

  const deployContract = async () => {
    try {
      const wallet = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const address = wallet[0];
      console.log(address);
      // const provider = new ethers.providers.JsonRpcProvider(
      //   "https://goerli.infura.io/v3/2e61e70560ca4ef7a8cdaa270fe2998f"
      // );
      const signer = provider.getSigner();
      // const signer = new ethers.Wallet(
      //   // `${process.env.REACT_APP_PVK}`,
      //   provider
      // );
      console.log(signer);
      const bytecode =
        "0x608060405234801561001057600080fd5b5060405161012e38038061012e8339818101604052604081101561003357600080fd5b81019080805190602001909291908051906020019092919050505081600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060008190555050506088806100a66000396000f3fe6080604052348015600f57600080fd5b506004361060285760003560e01c80633fa4f24514602d575b600080fd5b60336049565b6040518082815260200191505060405180910390f35b6000805490509056fea2646970667358221220926465385af0e8706644e1ff3db7161af699dc063beaadd55405f2ccd6478d7564736f6c634300070400330000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca000000000000000000000000000000000000000000000000000000000000002a";
      const factory = new ethers.ContractFactory(abi, bytecode, signer);

      const deployedContract = await factory.deploy(
        "0x1b1d688a5b37e57be1179694d0f15e05b6de8cc3",
        42
      );
      console.log("Contract deployed at address:", deployedContract.address);

      setContract(deployedContract);
    } catch (error) {
      console.error("Error deploying contract:", error);
    }
  };

  const getValue = async () => {
    try {
      const value = await contract.value();
      console.log("Value:", value.toString());
    } catch (error) {
      console.error("Error getting value:", error);
    }
  };

  return (
    <div>
      <button onClick={deployContract}>Deploy Contract</button>
      <button onClick={getValue} disabled={!contract}>
        Get Value
      </button>
    </div>
  );
};

export default ContractDeploymentComponent;
