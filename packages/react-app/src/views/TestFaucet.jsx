import React, { useEffect, useState } from "react";
import { formatUnits } from "@ethersproject/units";
import { ethers } from "ethers";
import { usePoller } from "eth-hooks";
import { Card, Space, Row, Col, notification, Statistic, Select, Typography, Button, Divider, Steps, Skeleton, Table, Radio } from "antd";

import {  useContractLoader, useOnBlock } from "../hooks";

import { abi as IErc20 } from '../components/Lend/abis/erc20.json'
import { Address } from "../components";
import { useAaveData } from "../components/Lend/AaveData"
import AccountSummary from "../components/Lend/AccountSummary"
import AccountSettings from "../components/Lend/AccountSettings"
import { DAI_ABI } from "../constants";
import { Transactor } from "../helpers";

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const TestFaucet = ({ address: walletAddress, selectedProvider, tx, writeContracts }) => {

    const { reserveTokens, assetData, userAccountData, userConfiguration, userAssetList, userAssetData } = useAaveData({ selectedProvider })

    let signer = selectedProvider && selectedProvider.getSigner()

    const [donationAmount, setDonationAmount] = useState(0)
    const [donationAsset, setDonationAsset] = useState('USDC')
    const [donationAssetAddress, setDonationAssetAddress] = useState('0xe22da380ee6B445bb8273C81944ADEB6E8450422')
    const [donationAssetDecimals, setDonationAssetDecimals] = useState(18)
    const [donationAssetBalance, setDonationAssetBalance] = useState(0)
    const [donationAssetAllowance, setDonationAssetAllowance] = useState(-1)
    const donationAssetAllowanceInInt = donationAssetAllowance && donationAssetDecimals && parseFloat(formatUnits(donationAssetAllowance, donationAssetDecimals))
    const [isFetchingTokenInfo, setIsFetchingTokenInfo] = useState(true)

    const getTokenInfo = async () => {

        if (donationAssetAddress && walletAddress && writeContracts && writeContracts['Donation']) {

            setIsFetchingTokenInfo(true)

            // console.log(`getting info of ${donationAsset} token (${donationAssetAddress}) in ${walletAddress}`)

            let tokenContract = new ethers.Contract(donationAssetAddress, DAI_ABI, signer)
            let _decimals = await tokenContract.decimals();
            let _balance = await tokenContract.balanceOf(walletAddress);
            let donationVaultAddress = writeContracts['Donation'].address
            let _allowance = await tokenContract.allowance(walletAddress, donationVaultAddress);
            console.log(`<<${donationAsset}>> (${donationAssetAddress}) decimals: ${_decimals}, balance: ${_balance}, allowance: ${_allowance}, wallet: ${walletAddress}`)
            setDonationAssetDecimals(_decimals)
            setDonationAssetBalance(_balance);
            setDonationAssetAllowance(_allowance);
            setIsFetchingTokenInfo(false)
        }
    }

    useEffect(() => {
        if (donationAsset && walletAddress) getTokenInfo()
    }, [donationAsset, walletAddress, writeContracts])

    const [aTokenAllowance, setATokenAllowance] = useState()
    const [allowing, setAllowing] = useState(false)
    const [depositing, setDepositing] = useState(false)
    const [donationEvents, setDonationEvents] = useState([]);

    const findAssetAddressUsingSymbol = (_symbol) => {
        return assetData.find(obj => { return obj.symbol.toLowerCase() === _symbol.toLowerCase() })
    }
    
    let donationAssetData = assetData.find(obj => {
        return obj.symbol === donationAsset
    })

    const getATokenAllowance = async () => {
        if (assetData && donationAssetData && writeContracts && writeContracts['Donation']) {

            //let apeTokensAddresses = await dataProviderContract.getReserveTokensAddresses(donationAssetData.tokenAddress);
            let aTokenContract = new ethers.Contract(donationAssetData.aToken.id, IErc20, signer);

            let address = await signer.getAddress()
            let donationVaultAddress = writeContracts['Donation'].address

            let _allowance = await aTokenContract.allowance(address, donationVaultAddress)

            setATokenAllowance(_allowance)
        }
    }

    usePoller(getATokenAllowance, 6000)

    const setFullTokenAllowance = async () => {
        if (donationAssetAddress && walletAddress && writeContracts && writeContracts['Donation']) {
            try {
                setAllowing(true)

                let tokenContract = new ethers.Contract(donationAssetAddress, DAI_ABI, signer);
                let donationContractAddress = writeContracts['Donation'].address

                console.log(`approving ${donationAsset} for spender (${donationContractAddress})`)

                const result = tx(
                    tokenContract.approve(donationContractAddress, ethers.constants.MaxUint256),
                    update => {
                        console.log("📡 Transaction Update:", update);
                        if (update && (update.status === "confirmed" || update.status === 1)) {
                        console.log(" 🍾 Transaction " + update.hash + " finished!");
                        console.log(
                            " ⛽️ " +
                            update.gasUsed +
                            "/" +
                            (update.gasLimit || update.gas) +
                            " @ " +
                            parseFloat(update.gasPrice) / 1000000000 +
                            " gwei",
                        );
                        }
                    }
                );
                await tx

                notification.open({
                    message: `You revoked allowance on your ${donationAsset}!`,
                    description:
                        <><Text>{`The platform can't move ${donationAsset} on your behalf now.`}</Text></>,
                });
                setDonationAssetAllowance(ethers.constants.MaxUint256)
                
                setAllowing(false)
            }
            catch (e) {
                console.log(e)
                setAllowing(false)
            }
        }
    }

    const revokeTokenAllowance = async () => {
        if (donationAssetAddress && walletAddress && writeContracts && writeContracts['Donation']) {
            try {
                setAllowing(true)

                let tokenContract = new ethers.Contract(donationAssetAddress, DAI_ABI, signer);
                let donationContractAddress = writeContracts['Donation'].address

                console.log(`revoking ${donationAsset} for spender (${donationContractAddress})`)

                const result = tx(
                    tokenContract.approve(donationContractAddress, ethers.constants.Zero),
                    update => {
                        console.log("📡 Transaction Update:", update);
                        if (update && (update.status === "confirmed" || update.status === 1)) {
                        console.log(" 🍾 Transaction " + update.hash + " finished!");
                        console.log(
                            " ⛽️ " +
                            update.gasUsed +
                            "/" +
                            (update.gasLimit || update.gas) +
                            " @ " +
                            parseFloat(update.gasPrice) / 1000000000 +
                            " gwei",
                        );
                        }
                    }
                );
                await tx
                
                notification.open({
                    message: `You revoked allowance on your ${donationAsset}!`,
                    description:
                        <><Text>{`The platform can't move ${donationAsset} on your behalf now.`}</Text></>,
                });
                setDonationAssetAllowance(ethers.constants.Zero)

                
                setAllowing(false)
            }
            catch (e) {
                console.log(e)
                setAllowing(false)
            }
        }
    }

    const setFullATokenAllowance = async () => {
        if (assetData && donationAssetData && writeContracts && writeContracts['Donation']) {
            try {
                setAllowing(true)

                let aTokenContract = new ethers.Contract(donationAssetData.aToken.id, IErc20, signer);
                let aaveApeAddress = writeContracts['Donation'].address
                let _approve = await aTokenContract.approve(aaveApeAddress, ethers.constants.MaxUint256)

                const result = tx(
                    aTokenContract.approve(aaveApeAddress, ethers.constants.MaxUint256),
                    update => {
                        console.log("📡 Transaction Update:", update);
                        if (update && (update.status === "confirmed" || update.status === 1)) {
                        console.log(" 🍾 Transaction " + update.hash + " finished!");
                        console.log(
                            " ⛽️ " +
                            update.gasUsed +
                            "/" +
                            (update.gasLimit || update.gas) +
                            " @ " +
                            parseFloat(update.gasPrice) / 1000000000 +
                            " gwei",
                        );
                        }
                    }
                );
                await tx

                notification.open({
                    message: `You gave approval on your aToken! 🦍`,
                    description:
                        <><Text>{`The platform can now move ${donationAssetData.symbol} on your behalf`}</Text></>,
                });
                setAllowing(false)
            }
            catch (e) {
                console.log(e)
                setAllowing(false)
            }
        }
    }

    // usePoller(async () => {
    //     if(writeContracts && writeContracts['Donation']) {
    //       let _donationEvents = await writeContracts['Donation'].queryFilter('Donation')
    //       setDonationEvents(_donationEvents)
    //   }
    // }, 5000)

    const depositAssetToOrgContract = async () => {
        console.log('trying to deposit', ethers.utils.parseUnits(donationAmount, donationAssetDecimals))

        if (donationAmount && donationAssetDecimals) {
            setDepositing(true)

            const result = tx(
                writeContracts.Donation.userDepositUsdt(ethers.utils.parseUnits(donationAmount, donationAssetDecimals)),
                update => {
                    console.log("📡 Transaction Update:", update);
                    if (update && (update.status === "confirmed" || update.status === 1)) {
                    console.log(" 🍾 Transaction " + update.hash + " finished!");
                    console.log(
                        " ⛽️ " +
                        update.gasUsed +
                        "/" +
                        (update.gasLimit || update.gas) +
                        " @ " +
                        parseFloat(update.gasPrice) / 1000000000 +
                        " gwei",
                    );
                    }
                }
            );
            await tx
            console.log("awaiting metamask/web3 confirm result...", result);
            setDepositing(false)
        }
    }


    const eventColumns = [
        {
          title: 'Block',
          dataIndex: 'blockNumber',
        },
        {
          title: 'Action',
          key: 'action',
          render: value => value.args.action
        },
      ];

    return (
        <>
            <Row justify="center" align="middle" gutter={16}>
                <Card title={<Space>
                    <Text>{`Donation`}</Text>
                    {
                        (writeContracts && writeContracts['Donation'])
                            ?
                                <Address
                                    value={writeContracts['Donation'].address}
                                    fontSize={16}
                                    />
                            :
                            (selectedProvider === undefined
                                ? <Text type="warning">Please connect your wallet</Text>
                                : <Text type="warning">Has the Donation contract been deployed?</Text>
                            )
                    }
                </Space>}
                    style={{ width: 600, textAlign: 'left' }}
                    extra={
                        <AccountSettings userAccountData={userAccountData} userConfiguration={userConfiguration} userAssetList={userAssetList} />}
                >
                    {(writeContracts && writeContracts['Donation']) ?
                        <>
                            {/* {userAccountData
                                ? <AccountSummary userAccountData={userAccountData} />
                                : <Skeleton active />
                            } */}

                            {assetData &&
                                <>
                                    <Title level={4}>Select asset to donate</Title>
                                    <Row justify="center" align="middle" gutter={16}>
                                        <Col>
                                            <Select showSearch value={donationAsset} style={{ width: '120px' }} size={'large'} onChange={(value) => {
                                                setDonationAsset(value)
                                                const _assetAddress = findAssetAddressUsingSymbol(value)
                                                if (_assetAddress && _assetAddress.underlyingAsset){
                                                    console.log(_assetAddress.underlyingAsset)
                                                    setDonationAssetAddress(_assetAddress.underlyingAsset)
                                                }
                                            }} filterOption={(input, option) =>
                                                option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            } optionFilterProp="children">
                                                {assetData
                                                    .filter((asset) => asset.usageAsCollateralEnabled )
                                                    .map(token => (
                                                        <Option key={token.symbol} value={token.symbol}>{token.symbol}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Col>
                                        
                                        {/* <Col>
                                            {userAssetData && userAssetData[donationAsset] && <Statistic title={"Deposited"} value={parseFloat(ethers.utils.formatUnits(userAssetData[donationAsset]['currentATokenBalance'], userAssetData[donationAsset].decimals)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 5 })} suffix={donationAsset} />}
                                        </Col> */}
                                    </Row>
                                    <Divider />
                                </>
                            }
                            You have <strong>{formatUnits(donationAssetBalance, donationAssetDecimals)}</strong> {donationAsset}<br/>
                            Your address: {walletAddress}<br/>
                            Spender (Org you are depositing to): {writeContracts && writeContracts['Donation'] && writeContracts['Donation'].address}<br/>
                            {donationAsset} allowance: {donationAssetAllowance && ethers.constants.MaxUint256.eq(donationAssetAllowance) ? <strong>Unlimited</strong> : (donationAssetDecimals && <strong>{donationAssetAllowanceInInt}</strong>)}<br/>
                            <Button
                                onClick={() => {
                                    setFullTokenAllowance()
                                }}
                                >
                                Set allowance to max
                            </Button>
                            {" "}
                            <Button
                                onClick={() => {
                                    revokeTokenAllowance()
                                }}
                                >
                                Set allowance to 0
                            </Button>
                            <br/><br/>
                            How much do {donationAsset} do you want to deposit?{" "}
                            <input 
                                type="number" 
                                value={donationAmount} 
                                onChange={(e) => setDonationAmount(e.target.value)} />
                            <br/>

                            <Button
                                style={donationAssetAllowanceInInt >= donationAmount ? {} : { background: 'var(--success-bg)', color: '#fff'}}
                                loading={allowing}
                                disabled={donationAssetAllowanceInInt >= donationAmount}
                                onClick={() => setFullTokenAllowance() }
                            >
                                {donationAssetAllowanceInInt >= donationAmount ? 'Approved' : 'Approve'}
                            </Button>
                            {" "}
                            <Button
                                type={donationAssetAllowanceInInt >= donationAmount ? 'primary' : ''}
                                loading={depositing}
                                disabled={donationAssetAllowanceInInt < donationAmount}
                                onClick={() => depositAssetToOrgContract() }
                            >
                                Deposit to contract
                            </Button>

                        </> : <Skeleton avatar paragraph={{ rows: 4 }} />}
                </Card>
            </Row>
            <Row justify="center" align="middle" gutter={16}>
                <Card title={'Aave Events'} style={{ width: 800 }}>
                    <Table rowKey='key' dataSource={donationEvents} columns={eventColumns} pagination={false} />
                </Card>
            </Row>
        </>
    )
}

export default TestFaucet