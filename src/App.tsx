import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Wallet from "./component/modal";
import "./App.css";

function App() {
  const [nep, setNep] = useState<number>();
  const [busd, setBusd] = useState<number>();
  const [showModal, setShowModal] = useState(false);
  const conversionRate = 3;

  const handleNepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setNep(value);
    setBusd(Math.round(value * conversionRate * 100) / 100);
  };

  const handleBusdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value);
    setBusd(value);
    setNep(Math.round((value / conversionRate) * 100) / 100);
  };

  return (
    <div className="app-container">
      <div className="card-container">
        <h2 className="card-header">Currency Convertor</h2>
        <div className="input-content">
          <label className="input-label">NEP</label>
          <input
            type="number"
            className="core-input"
            placeholder="NEP"
            value={nep}
            onChange={handleNepChange}
          />
        </div>
        <div className="input-content">
          <label className="input-label">BUSD</label>
          <input
            type="number"
            className="core-input"
            placeholder="BUSD"
            value={busd}
            onChange={handleBusdChange}
          />
        </div>
        <Button size="lg" variant="primary" onClick={() => setShowModal(true)}>
          Connect to Wallet
        </Button>
        <Wallet walletModal={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
}

export default App;
