import React, { useState } from "react";
import { Button, Form } from "antd";
import SuperfluidSDK from "@superfluid-finance/js-sdk";
import { Web3Provider } from "@ethersproject/providers";
import Web3 from "web3";
import Counter from "../Counter";
// import testTokenAbi from "./abi/testToken.json";

const web3 = new Web3(Web3.givenProvider);

export default function Superfluid({ address, amountDonated, percent }) {
  const fUSDCxAddress = "0x25b5cd2e6ebaedaa5e21d0ecf25a567ee9704aa7";
  const recipientAddress = ""; //Need org address for hard code
  const amount = amountDonated * (percent / 100);
  const rateName = "month";

  function rate(_rate) {
    switch (_rate) {
      case "minute":
        return 60;
      case "hour":
        return 60 * 60;
      case "day":
        return 60 * 60 * 24;
      case "month":
        return 60 * 60 * 24 * 30;
    }
  }

  function flowRate(_amount, _rate) {
    const amount = _amount + "0".repeat(18);
    return (amount / rate(_rate)).toString().split(".", 1)[0];
  }

  async function startTransfer() {
    const sf = new SuperfluidSDK.Framework({
      ethers: new Web3Provider(window.ethereum),
      tokens: ["fUSDC", "fUSDCx"],
    });
    await sf.initialize();

    const userWallet = address;
    // const USDCx = await ISuperToken.at("0x84d207edecd64ad131a06ad9c20a0080fc29ba40");
    // const USDCx = await ISuperToken.at(USDCAddress);
    const fUSDC = await sf.contracts.TestToken.at(sf.tokens.fUSDC.address);
    const fUSDCx = sf.tokens.fUSDCx;
    // Only need if user doen't have fUSDC
    await fUSDC.mint(userWallet, web3.utils.toWei("0.001", "ether"), { from: userWallet });
    // Only on first time (conditional not to run after the first approval)
    await fUSDC.approve(fUSDCx.address, "1" + "0".repeat(42), { from: userWallet });
    // Only if the user doesn't have USDCx
    await fUSDCx.upgrade(web3.utils.toWei(amount, "ether"), { from: userWallet });

    const user = sf.user({
      address: userWallet,
      token: fUSDCxAddress,
    });

    await user.flow({
      recipient: recipientAddress,
      flowRate: flowRate(amount, rateName),
    });
  }

  // Stops transfer (optional future function)
  // async function stopTransfer() {
  //   const sf = new SuperfluidSDK.Framework({
  //     ethers: new Web3Provider(window.ethereum),
  //     tokens: ["fUSDC", "fUSDCx"],
  //   });

  //   await sf.initialize();

  //   const userWallet = address;
  //   const user = sf.user({
  //     address: userWallet,
  //     token: fUSDCxAddress,
  //   }); 

  //   await user.flow({
  //     recipient: recipientAddress,
  //     flowRate: "0",
  // });
  // }

  return (
    <>
      ${amount}
      <Button className="btn btn-primary-light" onClick={startTransfer}></Button>
      <Counter initialValue={amount} rate={rateName} />
    </>
  );
}
