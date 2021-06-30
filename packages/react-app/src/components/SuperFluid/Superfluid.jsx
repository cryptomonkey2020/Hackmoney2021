import React, { useState, useEffect } from 'react';
import { Button } from "antd";
import testTokenAbi from "./abi/testToken.json"




export default function Superfluid() {

const [flow, setFlow] = useState();

const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider);

  async function superfluid() {

    const testTokenAddress = "0x31948408B43D7732DC6ec5771f587c71f9b2ec91"
    const testTokenContract = new web3.eth.Contract(testTokenAbi, testTokenAddress);
    
  
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
      tokens: ["fUSDCx", "fUSDC"]
    });
    await sf.initialize()
  
    const walletAddress = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [
        {
          eth_accounts: {}
        }
      ]
    });
  
    // Start Flow
    const startFlow = async () => {
      // Jorge's wallet
      const jorgeWallet = walletAddress[0];
      // Convert USDx into test tokens (fUSDx)
      let usdcx = sf.tokens.fUSDCx;
      // Minting fake USDx
      await testTokenContract.methods.mint(jorgeWallet, web3.utils.toWei("0.01", "ether")).send({ from: jorgeWallet });
  
      // Approve the transaction of fake token
      await testTokenContract.methods.approve(usdcx.address, "1" + "0".repeat(42)).send({ from: jorgeWallet });
      // convert to supertoken
      await usdcx.upgrade(web3.utils.toWei("0.01", "ether"), { from: jorgeWallet });
  
      const jorge = sf.user({
        address: jorgeWallet,
        token: '0x8aE68021f6170E5a766bE613cEA0d75236ECCa9a'
      });
    };
  }

  const stopFlow = async () => {
    await jorge.flow({
      recipient: '', 
      flowRate: "0"
    });
  };
  
  superfluid();

  

  return (
    <>
      <Button className="btn btn-primary-light" onClick={startFlow}>Start Stream Stream</Button>
      <Button className="btn btn-primary-light" onClick={stopFlow}>Stop Stream Flow</Button>   
    </>
  )
}
