import React, { useState } from "react";
import { ethers } from "ethers";
import { useAccount } from "wagmi";

function EthersProviderExplanation() {
  const [providerInfo, setProviderInfo] = useState({
    networkName: "-",
    chainId: "-",
    transactionCount: "-",
    balance: "-",
  });
  const [balance, setBalance] = useState("");
  const { address } = useAccount();

  const explainProvider = async () => {
    setProviderInfo({
      networkName: "fetching..",
      chainId: "fetching..",
      transactionCount: "fetching...",
      balance: "fetching...",
    });
    try {
      // const { ethereum } = window; // Ensure that the user is connected to the expected chain
      // const provider = new ethers.providers.Web3Provider(ethereum);
      // const provider = new ethers.providers.JsonRpcProvider(
      //   "https://goerli.infura.io/v3/2e61e70560ca4ef7a8cdaa270fe2998f"
      // );
      const provider = new ethers.providers.JsonRpcProvider(
        "https://mainnet.infura.io/v3/2e61e70560ca4ef7a8cdaa270fe2998f"
      );

      const network = await provider.getNetwork();

      const transactionCount = await provider.getTransactionCount(address);
      const transactionCountByENS = await provider.getTransactionCount(
        "vitalik.eth"
      );
      console.log("transactionCountByENS - ", transactionCountByENS);

      const balance = await provider.getBalance(address);

      setProviderInfo({
        networkName: network.name,
        chainId: network.chainId,
        transactionCount: transactionCount,
        balance: ethers.utils.formatEther(balance),
      });

      //Returns an EnsResolver instance which can be used to further inquire about specific entries for an ENS name.
      const resolver = await provider.getResolver("vitalik.eth");
      console.log(resolver);

      //Returns the URL for the avatar associated to the ENS name, or null if no avatar was configured.
      const avatar = await provider.getAvatar("vitalik.eth");
      console.log(avatar);

      //Performs a reverse lookup of the address in ENS using the Reverse Registrar.
      // If the name does not exist, or the forward lookup does not match, null is returned.
      const lookup = await provider.lookupAddress(
        "0x5555763613a12D8F3e73be831DFf8598089d3dCa"
      );
      console.log(lookup);

      // Looks up the address of name.
      // If the name is not owned, or does not have a Resolver configured, or the Resolver does not have an address configured, null is returned.
      const resolveName = await provider.resolveName("ricmoo.eth");
      console.log(resolveName);

      // by using the resolver we are getting all these functions
      // resolver.name
      //resolver.address
      //resolver.getAddress
      // resolver.getAvatar

      // Returns a Promise which resolves to any stored EIP-634 text entry for key
      const email = await resolver.getText("email");
      console.log(email);
      //resolver.getText("url")
      //resolver.getText("com.twitter")

      //Returns the transaction with hash or null if the transaction is unknown
      const transactionDetails = await provider.getTransaction(
        "0x5b73e239c55d790e3c9c3bbb84092652db01bb8dbf49ccc9e4a318470419d9a0"
      );
      console.log(transactionDetails);

      //Returns the transaction receipt for hash or null if the transaction has not been mined.
      const txReceipt = await provider.getTransactionReceipt(
        "0x5b73e239c55d790e3c9c3bbb84092652db01bb8dbf49ccc9e4a318470419d9a0"
      );
      console.log(txReceipt);
    } catch (error) {
      console.error(error);
      setProviderInfo("Error: Unable to retrieve provider information.");
    }
  };

  // Returns the balance of address as of the blockTag block height.
  const getBalance = async () => {
    setBalance("Fetching...");
    try {
      const { ethereum } = window; // Ensure that the user is connected to the expected chain

      const provider = new ethers.providers.Web3Provider(ethereum);

      const balance = await provider.getBalance(address);
      //   const balance = await provider.getBalance("vitalik.eth");

      console.log(
        `Balance of ${address}: ${ethers.utils.formatEther(balance)} ETH`
      );

      setBalance(ethers.utils.formatEther(balance));
    } catch (error) {
      console.error(error);
      setProviderInfo("Error: Unable to retrieve provider information.");
    }
  };
  return (
    <div>
      <h2>Ethers Provider Information</h2>
      <button onClick={() => explainProvider()}>Explain Provider</button>
      {providerInfo && (
        <div>
          <table>
            <thead>
              <tr>
                <th>info</th>
                <th>value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Network Name</td>
                <td>{providerInfo.networkName}</td>
              </tr>
              <tr>
                <td>ChainId</td>
                <td>{providerInfo.chainId}</td>
              </tr>
              <tr>
                <td>Transaction Count</td>
                <td>{providerInfo.transactionCount}</td>
              </tr>
              <tr>
                <td>Balance</td>
                <td>
                  {providerInfo.balance ? providerInfo.balance + " ETH" : "-"}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default EthersProviderExplanation;
