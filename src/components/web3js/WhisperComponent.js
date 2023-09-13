import React, { useState } from "react";
import Web3 from "web3";

const WhisperComponent = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState("");

  const setupWhisper = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Replace with your Ethereum node

    try {
      const shh = web3.shh;

      const identity = await shh.newSymKey();
      await shh.setSymKeyID(identity);

      shh
        .subscribe("messages", {
          symKeyID: identity,
          topics: ["0x6578616d706c6520746f706963"],
        })
        .on("data", (data) => {
          const decryptedMessage = shh.decrypt(
            data.payload,
            data.powTarget,
            data.powTime,
            [identity]
          );

          setReceivedMessage(decryptedMessage);
        });
    } catch (error) {
      console.error("Error setting up Whisper:", error);
    }
  };

  const sendMessage = async () => {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); // Replace with your Ethereum node

    try {
      const shh = web3.shh;

      const identity = await shh.newSymKey();
      await shh.setSymKeyID(identity);

      const payload = web3.utils.fromAscii(message);
      const topic = "0x6578616d706c6520746f706963";

      await shh.post({
        symKeyID: identity,
        topic,
        payload,
        powTime: 3,
        powTarget: 0.5,
      });
    } catch (error) {
      console.error("Error sending message with Whisper:", error);
    }
  };

  return (
    <div className="WhisperComponent">
      <h2>Whisper Component</h2>
      <div>
        <label>Message:</label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>
      <button onClick={setupWhisper}>Setup Whisper</button>
      <button onClick={sendMessage}>Send Message</button>
      <div>
        <label>Received Message:</label>
        <div>{receivedMessage}</div>
      </div>
    </div>
  );
};

export default WhisperComponent;
