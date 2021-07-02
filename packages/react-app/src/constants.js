import React from 'react'

// MY INFURA_ID, SWAP IN YOURS FROM https://infura.io/dashboard/ethereum
export const INFURA_ID = "0982eb85b1bb42aba2cb1ceeef545e1b";

// MY ETHERSCAN_ID, SWAP IN YOURS FROM https://etherscan.io/myapikey
export const ETHERSCAN_KEY = "PSW8C433Q667DVEX5BCRMGNAH9FSGFZ7Q8";

// BLOCKNATIVE ID FOR Notify.js:
export const BLOCKNATIVE_DAPPID = "0b58206a-f3c0-4701-a62f-73c7243e8c77";

// EXTERNAL CONTRACTS

export const DAI_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";

export const DAI_ABI = [
  {
    inputs: [{ internalType: "uint256", name: "chainId_", type: "uint256" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "src", type: "address" },
      { indexed: true, internalType: "address", name: "guy", type: "address" },
      { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: true,
    inputs: [
      { indexed: true, internalType: "bytes4", name: "sig", type: "bytes4" },
      { indexed: true, internalType: "address", name: "usr", type: "address" },
      { indexed: true, internalType: "bytes32", name: "arg1", type: "bytes32" },
      { indexed: true, internalType: "bytes32", name: "arg2", type: "bytes32" },
      { indexed: false, internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "LogNote",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "src", type: "address" },
      { indexed: true, internalType: "address", name: "dst", type: "address" },
      { indexed: false, internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    constant: true,
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    name: "allowance",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "approve",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "burn",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "guy", type: "address" }],
    name: "deny",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "mint",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "src", type: "address" },
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "move",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "nonces",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "holder", type: "address" },
      { internalType: "address", name: "spender", type: "address" },
      { internalType: "uint256", name: "nonce", type: "uint256" },
      { internalType: "uint256", name: "expiry", type: "uint256" },
      { internalType: "bool", name: "allowed", type: "bool" },
      { internalType: "uint8", name: "v", type: "uint8" },
      { internalType: "bytes32", name: "r", type: "bytes32" },
      { internalType: "bytes32", name: "s", type: "bytes32" },
    ],
    name: "permit",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "pull",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "usr", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "push",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [{ internalType: "address", name: "guy", type: "address" }],
    name: "rely",
    outputs: [],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "totalSupply",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "transfer",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: false,
    inputs: [
      { internalType: "address", name: "src", type: "address" },
      { internalType: "address", name: "dst", type: "address" },
      { internalType: "uint256", name: "wad", type: "uint256" },
    ],
    name: "transferFrom",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    payable: false,
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "version",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "wards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

export const ERC20_ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [
      {
        name: "_owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        name: "balance",
        type: "uint256"
      }
    ],
    payable: false,
    type: "function"
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string"
      }
    ],
    payable: false,
    type: "function"
  }
]

export const NETWORK = chainId => {
  for (const n in NETWORKS) {
    if (NETWORKS[n].chainId === chainId) {
      return NETWORKS[n];
    }
  }
};

export const NETWORKS = {
  localhost: {
    name: "localhost",
    color: "#666666",
    chainId: 31337,
    blockExplorer: "",
    rpcUrl: "http://" + window.location.hostname + ":8545",
  },
  mainnet: {
    name: "mainnet",
    color: "#ff8b9e",
    chainId: 1,
    rpcUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://etherscan.io/",
  },
  kovan: {
    name: "kovan testnet",
    color: "#7003DD",
    chainId: 42,
    rpcUrl: `https://kovan.infura.io/v3/${INFURA_ID}`,
    blockExplorer: "https://kovan.etherscan.io/",
    faucet: "https://gitter.im/kovan-testnet/faucet", // https://faucet.kovan.network/
  },
  rinkeby: {
    name: "rinkeby testnet",
    color: "#e0d068",
    chainId: 4,
    rpcUrl: `https://rinkeby.infura.io/v3/${INFURA_ID}`,
    faucet: "https://faucet.rinkeby.io/",
    blockExplorer: "https://rinkeby.etherscan.io/",
  },
  ropsten: {
    name: "ropsten testnet",
    color: "#F60D09",
    chainId: 3,
    faucet: "https://faucet.ropsten.be/",
    blockExplorer: "https://ropsten.etherscan.io/",
    rpcUrl: `https://ropsten.infura.io/v3/${INFURA_ID}`,
  },
  goerli: {
    name: "goerli testnet",
    color: "#0975F6",
    chainId: 5,
    faucet: "https://goerli-faucet.slock.it/",
    blockExplorer: "https://goerli.etherscan.io/",
    rpcUrl: `https://goerli.infura.io/v3/${INFURA_ID}`,
  },
  xdai: {
    name: "xdai",
    color: "#48a9a6",
    chainId: 100,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://dai.poa.network",
    faucet: "https://xdai-faucet.top/",
    blockExplorer: "https://blockscout.com/poa/xdai/",
  },
  matic: {
    name: "matic",
    color: "#2bbdf7",
    chainId: 137,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://rpc-mainnet.maticvigil.com",
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://explorer-mainnet.maticvigil.com//",
  },
  mumbai: {
    name: "mumbai",
    color: "#92D9FA",
    chainId: 80001,
    price: 1,
    gasPrice: 1000000000,
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    faucet: "https://faucet.matic.network/",
    blockExplorer: "https://mumbai-explorer.matic.today/",
  },
};

export const CAUSE_FILTERS = [
  {
    name: "Arts & Culture",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="13.813" height="13.812" viewBox="0 0 13.813 13.812">
    <g id="Group_452" data-name="Group 452" transform="translate(-365.594 -211.594)">
      <path id="Path_905" data-name="Path 905" d="M10499.671,417.933a3.365,3.365,0,1,1,1.287,6.473h-2.833a.532.532,0,0,1-.531-.531v-2.833a3.365,3.365,0,0,1,2.077-3.109Zm1.736.851a2.3,2.3,0,0,0-2.751,2.258v2.3h2.3a2.3,2.3,0,0,0,.449-4.56Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_906" data-name="Path 906" d="M10511.4,411.053a.53.53,0,0,1-.454.6,10.8,10.8,0,0,0-8.643,6.887.531.531,0,0,1-.994-.376,11.866,11.866,0,0,1,9.492-7.563A.53.53,0,0,1,10511.4,411.053Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_907" data-name="Path 907" d="M10510.947,410.6a.53.53,0,0,1,.454.6,11.868,11.868,0,0,1-7.563,9.492.531.531,0,0,1-.376-.994,10.8,10.8,0,0,0,6.887-8.642A.53.53,0,0,1,10510.947,410.6Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_908" data-name="Path 908" d="M10503.026,415.152a.531.531,0,0,1,.705-.259,6.909,6.909,0,0,1,3.376,3.376.531.531,0,1,1-.965.445,5.855,5.855,0,0,0-2.856-2.857A.53.53,0,0,1,10503.026,415.152Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
    </g>
  </svg>
  },
  {
    name: "Animal Welfare",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="16.42" height="14.117" viewBox="0 0 16.42 14.117">
    <g id="paw" transform="translate(-0.001 -35.905)">
      <g id="Group_460" data-name="Group 460" transform="translate(2.693 42.017)">
        <g id="Group_459" data-name="Group 459" transform="translate(0 0)">
          <path id="Path_1077" data-name="Path 1077" d="M93.395,228.564a4.772,4.772,0,0,0-7.864,0,6.63,6.63,0,0,0-1.586,4.042,1.805,1.805,0,0,0,.588,1.465,2.214,2.214,0,0,0,1.461.429,11.2,11.2,0,0,0,1.932-.244,9.51,9.51,0,0,1,1.538-.205,8.953,8.953,0,0,1,1.411.195c1.261.234,2.69.5,3.516-.187a1.789,1.789,0,0,0,.591-1.453A6.63,6.63,0,0,0,93.395,228.564Zm.379,4.755c-.479.4-1.724.167-2.725-.019a9.474,9.474,0,0,0-1.586-.211,10.09,10.09,0,0,0-1.711.221c-.96.176-2.155.4-2.6.022-.06-.05-.242-.2-.242-.726a5.727,5.727,0,0,1,1.365-3.428,3.82,3.82,0,0,1,6.382,0,5.727,5.727,0,0,1,1.365,3.428C94.019,233.116,93.835,233.269,93.774,233.32Z" transform="translate(-83.945 -226.496)" fill="#2c3e50"/>
        </g>
      </g>
      <g id="Group_462" data-name="Group 462" transform="translate(8.504 35.905)">
        <g id="Group_461" data-name="Group 461" transform="translate(0 0)">
          <path id="Path_1078" data-name="Path 1078" d="M268.893,36.845a1.814,1.814,0,0,0-3.176,0,3.846,3.846,0,0,0,0,4.049,1.813,1.813,0,0,0,3.176,0,3.846,3.846,0,0,0,0-4.049Zm-.8,3.509a.866.866,0,0,1-1.584,0,2.892,2.892,0,0,1,0-2.969.866.866,0,0,1,1.584,0,2.892,2.892,0,0,1,0,2.969Z" transform="translate(-265.141 -35.907)" fill="#2c3e50"/>
        </g>
      </g>
      <g id="Group_464" data-name="Group 464" transform="translate(3.59 35.905)">
        <g id="Group_463" data-name="Group 463" transform="translate(0 0)">
          <path id="Path_1079" data-name="Path 1079" d="M115.668,36.843a1.814,1.814,0,0,0-3.176,0,3.847,3.847,0,0,0,0,4.049,1.813,1.813,0,0,0,3.176,0,3.847,3.847,0,0,0,0-4.049Zm-.8,3.509a.866.866,0,0,1-1.584,0,2.892,2.892,0,0,1,0-2.969.866.866,0,0,1,1.584,0,2.892,2.892,0,0,1,0,2.969Z" transform="translate(-111.916 -35.905)" fill="#2c3e50"/>
        </g>
      </g>
      <g id="Group_466" data-name="Group 466" transform="translate(12.744 40.267)">
        <g id="Group_465" data-name="Group 465" transform="translate(0 0)">
          <path id="Path_1080" data-name="Path 1080" d="M400.931,173.138a1.652,1.652,0,0,0-.983-1.134,1.546,1.546,0,0,0-1.205.068,2.48,2.48,0,0,0-1.23,1.454,2.681,2.681,0,0,0-.067,1.623,1.652,1.652,0,0,0,.983,1.134,1.447,1.447,0,0,0,.51.092,1.641,1.641,0,0,0,.7-.16,2.48,2.48,0,0,0,1.23-1.454h0A2.681,2.681,0,0,0,400.931,173.138Zm-.975,1.306a1.543,1.543,0,0,1-.73.9.6.6,0,0,1-.459.039c-.417-.156-.579-.876-.347-1.54a1.543,1.543,0,0,1,.73-.9.689.689,0,0,1,.287-.069.487.487,0,0,1,.172.031C400.026,173.061,400.188,173.78,399.956,174.444Z" transform="translate(-397.35 -171.912)" fill="#2c3e50"/>
        </g>
      </g>
      <g id="Group_468" data-name="Group 468" transform="translate(0.001 40.267)">
        <g id="Group_467" data-name="Group 467" transform="translate(0 0)">
          <path id="Path_1081" data-name="Path 1081" d="M3.515,173.526a2.48,2.48,0,0,0-1.23-1.454A1.546,1.546,0,0,0,1.08,172,1.652,1.652,0,0,0,.1,173.137a2.681,2.681,0,0,0,.067,1.623h0a2.48,2.48,0,0,0,1.23,1.454,1.641,1.641,0,0,0,.7.16,1.447,1.447,0,0,0,.51-.092,1.652,1.652,0,0,0,.983-1.134A2.682,2.682,0,0,0,3.515,173.526ZM2.26,175.382a.6.6,0,0,1-.459-.039,1.543,1.543,0,0,1-.73-.9h0c-.232-.664-.07-1.383.347-1.54a.6.6,0,0,1,.459.039,1.543,1.543,0,0,1,.73.9C2.839,174.507,2.677,175.226,2.26,175.382Z" transform="translate(-0.001 -171.912)" fill="#2c3e50"/>
        </g>
      </g>
    </g>
  </svg>
  
  },
  {
    name: "Disability",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="11.75" height="13.104" viewBox="0 0 11.75 13.104">
    <g id="Group_453" data-name="Group 453" transform="translate(-331.24 -281.302)">
      <path id="Path_923" data-name="Path 923" d="M10471.094,482.25a1.948,1.948,0,1,1,1.948,1.948A1.948,1.948,0,0,1,10471.094,482.25Zm1.948-.885a.885.885,0,1,0,.885.885A.885.885,0,0,0,10473.042,481.365Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_924" data-name="Path 924" d="M10465.379,485.749a4.064,4.064,0,0,1,2-.488.531.531,0,1,1-.018,1.062,3.01,3.01,0,1,0,2.378,4.786.531.531,0,0,1,.857.628,4.073,4.073,0,1,1-5.223-5.988Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_925" data-name="Path 925" d="M10467.954,482.443a.531.531,0,0,1,.448.09l2.833,2.125a.533.533,0,0,1,.137.7l-1.642,2.737h1.895a.531.531,0,0,1,.415.2l2.833,3.542a.531.531,0,0,1-.83.664l-2.673-3.343h-2.578a.531.531,0,0,1-.456-.8l1.879-3.131-2.248-1.686-2.588.647a.531.531,0,0,1-.258-1.031Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
    </g>
  </svg>
  },
  {
    name: "Education",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="13.813" height="13.812" viewBox="0 0 13.813 13.812">
    <g id="Group_454" data-name="Group 454" transform="translate(-336.594 -312.594)">
      <path id="Path_935" data-name="Path 935" d="M10475.5,512.205l-.039-.041a1.952,1.952,0,0,0-1.378-.57h-4.25a1.24,1.24,0,0,0-1.239,1.239v9.917a1.24,1.24,0,0,0,1.239,1.24h4.25a.886.886,0,0,1,.886.885.531.531,0,0,0,1.063,0,.886.886,0,0,1,.886-.885h4.25a1.24,1.24,0,0,0,1.239-1.24v-9.917a1.24,1.24,0,0,0-1.239-1.239h-4.25a1.952,1.952,0,0,0-1.378.57Zm-5.667.451a.177.177,0,0,0-.177.177v9.917a.177.177,0,0,0,.177.177h4.25a1.948,1.948,0,0,1,1.378.571l.039.04.039-.04a1.948,1.948,0,0,1,1.378-.571h4.25a.177.177,0,0,0,.177-.177v-9.917a.177.177,0,0,0-.177-.177h-4.25a.887.887,0,0,0-.886.886.531.531,0,0,1-1.062,0,.887.887,0,0,0-.886-.886Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_936" data-name="Path 936" d="M10475.5,513.01a.532.532,0,0,1,.531.532v11.333a.531.531,0,0,1-1.062,0V513.542A.532.532,0,0,1,10475.5,513.01Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_937" data-name="Path 937" d="M10471.427,514.958a.532.532,0,0,1,.531-.531h.709a.531.531,0,0,1,0,1.063h-.709A.532.532,0,0,1,10471.427,514.958Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_938" data-name="Path 938" d="M10471.427,517.792a.532.532,0,0,1,.531-.532h.709a.531.531,0,0,1,0,1.063h-.709A.532.532,0,0,1,10471.427,517.792Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_939" data-name="Path 939" d="M10477.8,514.958a.532.532,0,0,1,.531-.531h.709a.531.531,0,0,1,0,1.063h-.709A.532.532,0,0,1,10477.8,514.958Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_940" data-name="Path 940" d="M10477.8,517.792a.532.532,0,0,1,.531-.532h.709a.531.531,0,0,1,0,1.063h-.709A.532.532,0,0,1,10477.8,517.792Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_941" data-name="Path 941" d="M10477.8,520.625a.532.532,0,0,1,.531-.531h.709a.531.531,0,1,1,0,1.062h-.709A.532.532,0,0,1,10477.8,520.625Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
    </g>
  </svg>
  
  },
  {
    name: "Elderly",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="11.688" height="13.812" viewBox="0 0 11.688 13.812">
    <g id="Group_455" data-name="Group 455" transform="translate(-316.302 -345.594)">
      <path id="Path_928" data-name="Path 928" d="M10451.667,548.135a.532.532,0,0,1,.531.532v4.089l1.327,1.991a.546.546,0,0,1,.073.166l.708,2.833a.531.531,0,0,1-1.03.258l-.687-2.744-1.365-2.049a.525.525,0,0,1-.09-.294v-4.25A.532.532,0,0,1,10451.667,548.135Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_929" data-name="Path 929" d="M10451.348,548.242a.531.531,0,0,1,.613-.017l2.03,1.353,2.013.336a.531.531,0,1,1-.175,1.048l-2.125-.355a.52.52,0,0,1-.207-.082l-1.812-1.208-2.227,1.67.588,1.762a.531.531,0,1,1-1.008.336l-.709-2.125a.532.532,0,0,1,.186-.593Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_930" data-name="Path 930" d="M10450.427,545.833a1.24,1.24,0,1,1,1.24,1.24A1.24,1.24,0,0,1,10450.427,545.833Zm1.24-.177a.177.177,0,1,0,.177.177A.177.177,0,0,0,10451.667,545.656Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_931" data-name="Path 931" d="M10451.2,554.567a.53.53,0,0,1,.237.712l-1.417,2.834a.531.531,0,0,1-.95-.476l1.417-2.833A.531.531,0,0,1,10451.2,554.567Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_932" data-name="Path 932" d="M10458.4,551.323a.53.53,0,0,0-.531.531v6.021a.532.532,0,0,1-1.063,0v-6.021a1.594,1.594,0,0,1,3.188,0v.354a.532.532,0,1,1-1.063,0v-.354a.531.531,0,0,0-.53-.531Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
    </g>
  </svg>
  
  },
  {
    name: "Environment",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="13.813" height="13.812" viewBox="0 0 13.813 13.812">
    <g id="Group_456" data-name="Group 456" transform="translate(-356.594 -378.594)">
      <path id="Path_911" data-name="Path 911" d="M10492.49,587.156v2.3a.886.886,0,0,0,.885.886h4.25a.886.886,0,0,0,.885-.886v-2.3Zm-1.063-.531a.532.532,0,0,1,.531-.531h7.084a.532.532,0,0,1,.531.531v2.833a1.948,1.948,0,0,1-1.948,1.948h-4.25a1.948,1.948,0,0,1-1.948-1.948Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_912" data-name="Path 912" d="M10488.594,578.125a.532.532,0,0,1,.531-.531h2.125a4.781,4.781,0,0,1,4.781,4.781.531.531,0,0,1-1.062,0,3.718,3.718,0,0,0-3.719-3.719h-1.594v.886a3.718,3.718,0,0,0,3.719,3.718h2.125a.531.531,0,0,1,0,1.063h-2.125a4.781,4.781,0,0,1-4.781-4.781Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_913" data-name="Path 913" d="M10495.1,584.146a.531.531,0,0,0,.4.885h2.125a4.781,4.781,0,0,0,4.781-4.781v-.708a.532.532,0,0,0-.531-.532h-2.125a4.782,4.782,0,0,0-4.781,4.782A.529.529,0,0,0,10495.1,584.146Zm4.646-4.073a3.718,3.718,0,0,0-3.719,3.719.51.51,0,0,1-.03.177h1.624a3.718,3.718,0,0,0,3.719-3.719v-.177Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_914" data-name="Path 914" d="M10495.5,581.844a.532.532,0,0,1,.531.531v4.25a.531.531,0,0,1-1.062,0v-4.25A.532.532,0,0,1,10495.5,581.844Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
    </g>
  </svg>
  
  },
  {
    name: "Health",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="10.98" height="13.812" viewBox="0 0 10.98 13.812">
    <g id="Group_457" data-name="Group 457" transform="translate(-316.01 -411.594)">
      <path id="Path_917" data-name="Path 917" d="M10448.581,612.581a1.95,1.95,0,0,1,1.377-.571h1.417a.531.531,0,0,1,0,1.063h-1.417a.884.884,0,0,0-.885.885v8.5a.886.886,0,0,0,.885.886h7.084a.886.886,0,0,0,.885-.886v-8.5a.884.884,0,0,0-.885-.885h-1.417a.531.531,0,0,1,0-1.063h1.417a1.95,1.95,0,0,1,1.948,1.948v8.5a1.948,1.948,0,0,1-1.948,1.948h-7.084a1.948,1.948,0,0,1-1.948-1.948v-8.5A1.949,1.949,0,0,1,10448.581,612.581Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_918" data-name="Path 918" d="M10450.844,612.542a1.948,1.948,0,0,1,1.948-1.948h1.416a1.948,1.948,0,1,1,0,3.9h-1.416A1.949,1.949,0,0,1,10450.844,612.542Zm1.948-.886a.885.885,0,1,0,0,1.771h1.416a.885.885,0,1,0,0-1.771Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_919" data-name="Path 919" d="M10451.552,618.917a.532.532,0,0,1,.531-.532h2.834a.531.531,0,0,1,0,1.063h-2.834A.532.532,0,0,1,10451.552,618.917Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_920" data-name="Path 920" d="M10453.5,616.969a.532.532,0,0,1,.531.531v2.833a.531.531,0,1,1-1.062,0V617.5A.532.532,0,0,1,10453.5,616.969Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
    </g>
  </svg>
  
  },
  {
    name: "Research",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="13.813" height="10.625" viewBox="0 0 13.813 10.625">
    <g id="Group_458" data-name="Group 458" transform="translate(-333.594 -479.365)">
      <path id="Path_946" data-name="Path 946" d="M10467.719,685.625a.532.532,0,0,1,.531-.531h10.625a.531.531,0,1,1,0,1.062h-10.625A.532.532,0,0,1,10467.719,685.625Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_947" data-name="Path 947" d="M10467.719,688.458a.532.532,0,0,1,.531-.531h10.625a.531.531,0,0,1,0,1.063h-10.625A.532.532,0,0,1,10467.719,688.458Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_948" data-name="Path 948" d="M10474.094,682.792a.532.532,0,0,1,.531-.532h4.25a.531.531,0,0,1,0,1.063h-4.25A.532.532,0,0,1,10474.094,682.792Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_949" data-name="Path 949" d="M10474.094,679.958a.532.532,0,0,1,.531-.531h4.25a.531.531,0,0,1,0,1.063h-4.25A.532.532,0,0,1,10474.094,679.958Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_950" data-name="Path 950" d="M10470.906,681.906v.177a.186.186,0,0,0,.029.1.183.183,0,0,0,.08.065.18.18,0,0,0,.1.01.188.188,0,0,0,.091-.048.18.18,0,0,0,.038-.193.173.173,0,0,0-.065-.08.18.18,0,0,0-.1-.03Zm.886-2.479a.886.886,0,0,0-.886.886v.531h.177a1.239,1.239,0,1,1-1.239,1.239v-1.77a1.947,1.947,0,0,1,1.948-1.948.531.531,0,1,1,0,1.062Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
      <path id="Path_951" data-name="Path 951" d="M10466.656,681.906v.177a.186.186,0,0,0,.029.1.183.183,0,0,0,.08.065.18.18,0,0,0,.1.01.188.188,0,0,0,.091-.048.18.18,0,0,0,.038-.193.173.173,0,0,0-.065-.08.18.18,0,0,0-.1-.03Zm.886-2.479a.886.886,0,0,0-.886.886v.531h.177a1.239,1.239,0,1,1-1.239,1.239v-1.77a1.947,1.947,0,0,1,1.948-1.948.531.531,0,1,1,0,1.062Z" transform="translate(-10132 -199)" fill="#2c3e50" fill-rule="evenodd"/>
    </g>
  </svg>  
  },
  {
    name: "Others",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="13.813" height="13.812" viewBox="0 0 13.813 13.812">
    <path id="Path_954" data-name="Path 954" d="M10449.833,646.427a1.24,1.24,0,0,0-1.239,1.24v2.125a1.24,1.24,0,0,0,1.239,1.239h.709a.885.885,0,1,1,0,1.771h-.709a1.24,1.24,0,0,0-1.239,1.24v2.125a1.24,1.24,0,0,0,1.239,1.239h2.125a1.24,1.24,0,0,0,1.24-1.239v-.709a.885.885,0,0,1,1.771,0v.709a1.24,1.24,0,0,0,1.239,1.239h2.125a1.24,1.24,0,0,0,1.24-1.239v-2.125a.18.18,0,0,1,.052-.126.177.177,0,0,1,.125-.051h.708a1.948,1.948,0,1,0,0-3.9h-.708a.177.177,0,0,1-.177-.177v-2.125a1.24,1.24,0,0,0-1.24-1.24h-2.125a.177.177,0,0,1-.177-.177v-.708a1.948,1.948,0,0,0-3.9,0v.708a.175.175,0,0,1-.051.125.182.182,0,0,1-.126.052Zm4.25-1.771a.886.886,0,0,0-.885.886v.708a1.24,1.24,0,0,1-1.24,1.24h-2.125a.177.177,0,0,0-.125.051.18.18,0,0,0-.052.126v2.125a.177.177,0,0,0,.177.177h.709a1.948,1.948,0,0,1,0,3.9h-.709a.177.177,0,0,0-.125.051.18.18,0,0,0-.052.126v2.125a.177.177,0,0,0,.177.177h2.125a.182.182,0,0,0,.126-.052.175.175,0,0,0,.051-.125v-.709a1.948,1.948,0,0,1,3.9,0v.709a.177.177,0,0,0,.177.177h2.125a.182.182,0,0,0,.126-.052.175.175,0,0,0,.051-.125v-2.125a1.24,1.24,0,0,1,1.24-1.24h.708a.885.885,0,0,0,0-1.771h-.708a1.24,1.24,0,0,1-1.24-1.239v-2.125a.174.174,0,0,0-.177-.177h-2.125a1.24,1.24,0,0,1-1.239-1.24v-.708a.887.887,0,0,0-.886-.886Z" transform="translate(-10448.594 -643.594)" fill="#2c3e50" fill-rule="evenodd"/>
  </svg>
  
  },
]