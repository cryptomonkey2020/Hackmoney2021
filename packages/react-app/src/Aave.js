import { signTypedData_v4 } from 'eth-sig-util'
import { fromRpcSig } from 'ethereumjs-util'
import aTokenAbi from "./aToken.json" // This file is missing!!! We should find it or generate it somehow

var Web3 = require('web3');
var web3 = new Web3(Web3.givenProvider);

const aTokenAddress = "0xFF3c8bc103682FA918c954E84F5056aB4DD5189d" // aUSDT token address
const aTokenContract = new web3.eth.Contract(aTokenAbi, aTokenAddress)
const privateKey = 'HERE SHOULD GO THE PRIVATE KEY'; // TODO Private key of the owner address (probably organisation)
const owner = "0xCD9672C666a0e50cd596cda50932B913393754B8" // Owner address (probably organisation)
const chainId = 42; // Kovan
const spender = "0x4074721Df98f13312E249659BbA0DCf624EaeE5d" // Contract address
const value = 1000000;
const nonce = 1;
const deadline = 1640930400000;

async function permit() {

    const permitParams = {
      types: {
        EIP712Domain: [
          { name: "name", type: "string" },
          { name: "version", type: "string" },
          { name: "chainId", type: "uint256" },
          { name: "verifyingContract", type: "address" },
        ],
        Permit: [
          { name: "owner", type: "address" },
          { name: "spender", type: "address" },
          { name: "value", type: "uint256" },
          { name: "nonce", type: "uint256" },
          { name: "deadline", type: "uint256" },
        ],
      },
      primaryType: "Permit",
      domain: {
        name: "aUSDT",
        version: "1",
        chainId: chainId,
        verifyingContract: aTokenAddress,
      },
      message: {
        owner,
        spender,
        value,
        nonce,
        deadline,
      },
    }
    
    const signature = signTypedData_v4(
      Buffer.from(privateKey, "hex"),
      { data: permitParams }
    )
    
    const { v, r, s } = fromRpcSig(signature)
    
    await aTokenContract.methods
        .permit({
          owner,
          spender,
          value,
          deadline,
          v,
          r,
          s
        })
        .send()
        .catch((e) => {
            throw Error(`Error permitting: ${e.message}`)
    })
}

permit();