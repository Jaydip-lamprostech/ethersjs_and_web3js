import React, { useState } from "react";
import Web3 from "web3";

function Web3Bzz() {
  const [hash, setHash] = useState("");
  const [content, setContent] = useState("");

  const uploadToSwarm = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Replace with your Ethereum node

    try {
      const bzz = web3.bzz;

      const uploadedHash = await bzz.upload(content);

      setHash(uploadedHash);
    } catch (error) {
      console.error("Error uploading to Swarm:", error);
    }
  };

  const downloadFromSwarm = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Replace with your Ethereum node

    try {
      const bzz = web3.bzz;

      const downloadedContent = await bzz.download(hash);

      setContent(downloadedContent.toString());
    } catch (error) {
      console.error("Error downloading from Swarm:", error);
    }
  };

  return (
    <div className="SwarmComponent">
      <h2>Swarm Component</h2>
      <div>
        <label>Content:</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button onClick={uploadToSwarm}>Upload to Swarm</button>
      <div>
        <label>Hash:</label>
        <input type="text" value={hash} readOnly />
      </div>
      <button onClick={downloadFromSwarm}>Download from Swarm</button>
    </div>
  );
}

export default Web3Bzz;
