const SuperfluidSDK = require("@superfluid-finance/js-sdk");
const { Web3Provider } = require("@ethersproject/providers");
const Web3 = require('web3');
const web3 = new Web3(Web3.givenProvider);

const USDCxAddress = "0x6212e5ee1221c9b083a6de5dfdb5209df63c8f95";
const rateName = "hour";

function rate(_rate) {
  switch (_rate) {
    case "hour":
      return 60 * 60;
    case "day":
      return 60 * 60 * 24;
    case "month":
      return 60 * 60 * 24 * 30;
  }
}

function flowRate(_amount, _rate) {
  const amount = +(_amount + "e18");
  return (amount / rate(_rate)).toString().split(".", 1)[0];
}

export async function startTransfer(amountDonated, percent, userWallet, recipientAddress) {
  const amount = (amountDonated * (percent / 100)).toString();
  const flow = flowRate(amount, rateName);

  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum),
    // tokens: ["fUSDC", "fUSDCx"],
  });
  await sf.initialize();
  const { ISuperToken } = sf.contracts;

  /*
    * Minting, approve and upgrade Fake Tokens
  const fUSDC = await sf.contracts.TestToken.at(sf.tokens.fUSDC.address);
  const fUSDCx = sf.tokens.fUSDCx;
  await fUSDC.mint(userWallet, web3.utils.toWei("0.001", "ether"), { from: userWallet });
  await fUSDC.approve(fUSDCx.address, "1" + "0".repeat(42), { from: userWallet });
  await fUSDCx.upgrade(web3.utils.toWei(amount, "ether"), { from: userWallet });
  *
  */

  const USDCx = await ISuperToken.at(USDCxAddress);
  await USDCx.upgrade(web3.utils.toWei(amount, "ether"), { from: userWallet });

  const user = sf.user({
    address: userWallet,
    token: USDCxAddress,
  });

  await user.flow({
    recipient: recipientAddress,
    flowRate: flow,
  });
}

// Stops transfer (optional future function)
export async function stopTransfer(userWallet, recipientAddress) {
  const sf = new SuperfluidSDK.Framework({
    ethers: new Web3Provider(window.ethereum)
  });

  await sf.initialize();

  const user = sf.user({
    address: userWallet,
    token: USDCxAddress,
  });

  await user.flow({
    recipient: recipientAddress,
    flowRate: "0",
  });
}