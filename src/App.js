import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Ethers from "./pages/Ethers";
import Web3Example from "./pages/Web3Example";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Ethers />} />
          <Route path="web3js" element={<Web3Example />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
