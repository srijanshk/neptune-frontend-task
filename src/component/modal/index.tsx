import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Web3 from "web3";
import { injected } from "../../connectors/injected";
import "./modal.css";

declare let ethereum: any;

type WalletProps = {
  walletModal: boolean;
  onClose: () => void;
};

export default function Wallet({ walletModal, onClose }: WalletProps) {
  const [show, setShow] = useState(walletModal);
  const [balance, setBalance] = useState<string>();

  const { active, account, chainId, activate, deactivate } =
    useWeb3React();

  const web3 = new Web3(ethereum);

  useEffect(() => {
    setShow(walletModal);
  }, [walletModal]);

  const handleClose = () => {
    setShow(false);
    onClose();
  };

  useEffect(() => {
    async function fetchData() {
      const balance = await web3.eth.getBalance(account || "");
      const balanceInEther = web3.utils.fromWei(balance, "ether");
      setBalance(balanceInEther);
    }
    if (active) fetchData();
  }, [active, account]);

  useEffect(() => {
    const connectWalletOnPageLoad = async () => {
      if (localStorage?.getItem("isWalletConnected") === "true") {
        try {
          await activate(injected);
          localStorage.setItem("isWalletConnected", "true");
        } catch (ex) {
          console.log(ex);
        }
      }
    };
    connectWalletOnPageLoad();
  }, []);

  const handleConnect = async () => {
    try {
      await activate(injected);
      localStorage.setItem("isWalletConnected", "true");
    } catch (ex) {
      console.log(ex);
    }
  };

  const handleDisconnect = async () => {
    try {
      deactivate();
      localStorage.setItem("isWalletConnected", "false");
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="title">Wallet Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {active ? (
          <>
            <div className="list-items">
              <span>Key</span>
              <span>Value</span>
            </div>
            <div className="list-items">
              <span className="title">Account</span>
              <span className="value">{account}</span>
            </div>
            <div className="list-items">
              <span className="title">Chain ID</span>
              <span className="value">{chainId}</span>
            </div>
            <div className="list-items">
              <span className="title">Balance</span>
              <span className="value">{balance}</span>
            </div>
          </>
        ) : (
          <div className="error">
            Wallet not connected. Please click the "Connect Now" Button.
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        {active ? (
          <div className="flex-center">
            <Button variant="danger" onClick={handleDisconnect}>
              Disconnect
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        ) : (
          <div className="flex-center">
            <Button variant="primary" onClick={handleConnect}>
              Connect Now
            </Button>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
        )}
      </Modal.Footer>
    </Modal>
  );
}
