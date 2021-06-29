# Give

## Table of contents

* [About](#about)

* [Technologies](#technologies)

* [Setup](#setup)
## About

## Technologies

* [React](https://reactjs.org/)

* [Solidity](https://docs.soliditylang.org/en/latest/)

* [Hardhat](https://hardhat.org/)

* [Ethers](https://docs.ethers.io/v5/)

* [Infura](https://infura.io/)

* [dotenv](https://www.npmjs.com/package/dotenv)

### Sponsors

* [AAVA](https://docs.aave.com/developers/)

* [Protocol Labs](https://ipfs.io/)

* [Rarible](https://rarible.org/)

* [Circle](https://developers.circle.com/docs)

* [88mph](https://88mph.app/docs/)

* [Superfluid](https://docs.superfluid.finance/superfluid/)

## Setup

Required tools: [Node](https://nodejs.org/en/)/[Yarn](https://yarnpkg.com/)

### Steps

* Clone this repo

```bash
git clone https://github.com/cryptomonkey2020/Hackmoney2021.git
```

* Change into the directory

```bash
cd Hackmoney2021
```

* Install dependencies with yarn

```bash
yarn install
```

### Set up Kovan testnet

* Create .env in /packages/hardhat/ and /packages/react-app/ using

```
REACT_APP_PROVIDER=https://kovan.infura.io/v3/0982eb85b1bb42aba2cb1ceeef545e1b
REACT_APP_NETWORK=kovan

* put your private key under packages/hardhat/mnemonic.txt and run the following command:
yarn run account 

* If you wish to create a new wallet then run : 
yarn generate 

```
REACT_APP_PROVIDER=https://kovan.infura.io/v3/0982eb85b1bb42aba2cb1ceeef545e1b
REACT_APP_NETWORK=kovan
```

### Run the Dapp

* In the terminal, run the following


```bash
yarn deploy
```

* In a separate terminal, run the following

```bash
yarn start
```

https://showcase.ethglobal.co/hackmoney2021/dedp-decentrelized-donation-platform