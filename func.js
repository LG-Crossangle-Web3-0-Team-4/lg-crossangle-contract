import Web3 from "web3";
import Transfer from "./ABI/transfer.json";

const POLYGON_TESTNET_RPC = ""; // get from infura

const Contract = require("web3-eth-contract");

Contract.setProvider(POLYGON_TESTNET_RPC);

const Contract_Address = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";

const loadWeb3 = async () => {
  if (window.ethereum) {
    window.web3 = new Web3(ethereum);
    try {
      // Request account access if needed
      await ethereum.enable();
      // Acccounts now exposed
      web3.eth.sendTransaction({ method: "eth_requestAccounts" });
    } catch (error) {
      // User denied account access...
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    window.web3 = new Web3(web3.currentProvider);
    // Acccounts always exposed
    web3.eth.sendTransaction({
      /* ... */
    });
  }
  // Non-dapp browsers...
  else {
    console.log(
      "Non-Ethereum browser detected. You should consider trying MetaMask!"
    );
  }
};

export const loadData = async () => {
  await loadWeb3();

  const Contract_Transfer = new Contract(Transfer.output.abi, Contract_Address);
  const addressAccount = await window.web3.eth.getCoinbase();
  const Owner = await Contract_Transfer.methods.owner().call();

  return { Contract_Transfer, addressAccount, Owner };
};
