import React, { useEffect, useState } from "react";
import NFTJian from "./contracts/NFTJian.json";
import getWeb3 from "./getWeb3";

import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [account, setAccount] = useState([]);
  const [contract, setContract] = useState(null);
  const [coders, setCoders] = useState([]);
  const [mintText, setMintText] = useState("");

  // load web3 account from MetaMask
  // load contract from
  // load all of the NFTs

  const loadWeb3Accounts = async (web3) => {
    const accounts = await web3.eth.getAccounts();
    console.log(accounts, "accounts");
    if (accounts) {
      setAccount(accounts[0]);
    }
  };

  const loadWeb3Contract = async (web3) => {
  const networkId = await web3.eth.net.getId();
    console.log(networkId, "networkID");
    const networkData = NFTJian.networks[networkId];
    console.log(networkData, "networkData");
    if (networkData) {
      const abi = NFTJian.abi;
      const address = networkData.address;
      const contract = new web3.eth.Contract(abi, address);
      setContract(contract);
      return contract;
    }
  };

  const loadNFTs = async (contract) => {
    // get how many tokens created in contract

    console.log(contract, "contract loadNFT");

    const totalSupply = await contract.methods.totalSupply().call();
    console.log(totalSupply, "totalSupply");

    let nfts = [];
    for (let i = 0; i < totalSupply; i++) {
      let name = await contract.methods.names(i).call();
      nfts.push(name);
    }
    setCoders(nfts);
  };

  // first render
  useEffect(async () => {
    const web3 = await getWeb3();
    await loadWeb3Accounts(web3);
    let contract = await loadWeb3Contract(web3);
    await loadNFTs(contract);
  }, []);

  const mint = async () => {
    contract.methods.mintNFT(mintText).send({ from: account }, (error) => {
      console.log("worked");
      if (!error) {
        setCoders([...coders, mintText]);
        setMintText("");
      }
    })
  }

  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Crypto Jian
          </a>
        </div>
      </nav>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col d-flex flex-column align-items-center">
            <img
              className="mb-4"
              width="70"
              src="https://avatars.dicebear.com/api/pixel-art/jian.svg"
              alt="Jian NFT"
            />
            <h1 className="display-5 fw-bold">Crypto Jian</h1>
            <div className="col-6 text-center ">
              <p className="lead text-center">
                Never had an NFT? No worries, because here's your chance to earn
                yourself a CryptoJian that is unique to yours. All you have to
                do is input your name, and it will be minted under our
                collectables.
              </p>
              <div className="mt-5">
                <input
                  className="form-control"
                  type="text"
                  placeholder="e.g. Bobby"
                  value={mintText}
                  onChange={(e) => setMintText(e.target.value)}
                />
                <button type="submit" onClick={mint} className="btn btn-primary mt-3">Mint</button>
              </div>
            </div>
            <div className="col-8 d-flex justify-content-center flex-wrap">
              {coders.map((coder, key) => (
                <div key={key} className="d-flex flex-column align-items-center">
                  <img src={`https://avatars.dicebear.com/api/pixel-art/${coder}.svg`} width="150" />
                  <span>{coder}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
