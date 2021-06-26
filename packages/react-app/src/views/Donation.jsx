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

const { Option } = Select;
const { Title, Text, Paragraph } = Typography;
const { Step } = Steps;

const Donation = ({ address: walletAddress, selectedProvider }) => {

    const { reserveTokens, assetData, userAccountData, userConfiguration, userAssetList, userAssetData } = useAaveData({ selectedProvider })

    const [donationAsset, setDonationAsset] = useState('USDC')
    const [donationAssetAddress, setDonationAssetAddress] = useState('0xe22da380ee6B445bb8273C81944ADEB6E8450422')
    const [donationAssetDecimals, setDonationAssetDecimals] = useState(18)
    const [donationAssetBalance, setDonationAssetBalance] = useState(0)
    const [donationAssetAllowance, setDonationAssetAllowance] = useState(-1)

    const getTokenInfo = async () => {
        if (donationAssetAddress && walletAddress) {

            console.log(`getting info of ${donationAsset} token (${donationAssetAddress}) in ${walletAddress}`)

            let tokenContract = new ethers.Contract(donationAssetAddress, DAI_ABI, signer)
            let _decimals = await tokenContract.decimals();
            let _balance = await tokenContract.balanceOf(walletAddress);
            let donationVaultAddress = writeContracts['Donation'].address
            let _allowance = await tokenContract.allowance(walletAddress, donationVaultAddress);
            console.log(`decimals: ${_decimals}, balance: ${_balance}, allowance: ${_allowance}`)
            setDonationAssetDecimals(_decimals)
            setDonationAssetBalance(_balance);
            setDonationAssetAllowance(_allowance);
        }
    }

    useEffect(() => {
        getTokenInfo()
    }, [donationAsset, walletAddress])

    useOnBlock(selectedProvider, () => getTokenInfo());

    useEffect(() => {
        if (donationAssetAllowance == 0) {
            setFullTokenAllowance()
        }
    }, [donationAssetAllowance])

    const [aTokenAllowance, setATokenAllowance] = useState()
    const [allowing, setAllowing] = useState(false)
    const [depositing, setDepositing] = useState(false)
    const [donationEvents, setDonationEvents] = useState([]);
    const writeContracts = useContractLoader(selectedProvider)

    const findAsset = (_asset) => {
        return assetData.find(obj => { return obj.underlyingAsset.toLowerCase() === _asset.toLowerCase() })
    }

    let signer = selectedProvider.getSigner()
    
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

                let _approve = await tokenContract.approve(donationContractAddress, ethers.constants.MaxUint256)
                console.log(_approve)

                notification.open({
                    message: `You gave approval on your ${donationAsset}!`,
                    description:
                        <><Text>{`The platform can now move ${donationAsset} on your behalf`}</Text></>,
                });
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
                    <Text>{`Donation`}</Text>{
                        (writeContracts && writeContracts['Donation']) ?
                            <Address
                                value={writeContracts['Donation'].address}
                                fontSize={16}
                            /> :
                            <Text type="warning">Has the ape been deployed?</Text>}
                </Space>}
                    style={{ width: 600, textAlign: 'left' }}
                    extra={
                        <AccountSettings userAccountData={userAccountData} userConfiguration={userConfiguration} userAssetList={userAssetList} />}
                >
                    {(writeContracts && writeContracts['Donation']) ?
                        <>
                            {userAccountData ? <AccountSummary userAccountData={userAccountData} /> : <Skeleton active />}

                            {userAccountData &&
                                <>
                                    <Title level={4}>Select asset to donate</Title>
                                    <Row justify="center" align="middle" gutter={16}>
                                        <Col>
                                            <Select showSearch value={donationAsset} style={{ width: '120px' }} size={'large'} onChange={(value) => {
                                                setDonationAsset(value)
                                                console.log(findAsset(value))
                                                setDonationAssetAddress(findAsset(value).tokenAddress)
                                            }} filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            } optionFilterProp="children">
                                                {/* <Option key={"USDT"} value={"USDT"}>{"USDT"}</Option> */}
                                                {assetData && assetData.filter(function (asset) { return asset.usageAsCollateralEnabled }).map(token => (
                                                    <Option key={token.symbol} value={token.symbol}>{token.symbol}</Option>
                                                ))}
                                            </Select>
                                        </Col>
                                        
                                        {/* <Col>
                                            {userAssetData && userAssetData[donationAsset] && <Statistic title={"Deposited"} value={parseFloat(ethers.utils.formatUnits(userAssetData[donationAsset]['currentATokenBalance'], userAssetData[donationAsset].decimals)).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 5 })} suffix={donationAsset} />}
                                        </Col> */}
                                    </Row>
                                    <Divider />
                                </>
                            }
                            You have {formatUnits(donationAssetBalance, donationAssetDecimals)} {donationAsset}<br/>
                            {donationAsset} allowance from your address {walletAddress} for spender ({writeContracts && writeContracts['Donation'] && writeContracts['Donation'].address}): {donationAssetAllowance && donationAssetDecimals && formatUnits(donationAssetAllowance, donationAssetDecimals)}<br/>
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

export default Donation