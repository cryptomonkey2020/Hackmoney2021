import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import moment from "moment"
import { Divider, Statistic, Steps, Row, Col, Tooltip, Carousel, Radio } from 'antd'
import { HeartFilled } from '@ant-design/icons'
import { DualAxes } from '@ant-design/charts'
import { Link as ScrollLink, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'
import AnimatedNumber from "animated-number-react"
import { useInterval } from "../hooks"
import "./Campaign.scss"

const { Countdown } = Statistic
const { Step } = Steps


const Campaign = ({
    organisationInfo = dummyOrganisationInfo,
    campaignInfo = dummyCampaignInfo,
    blockExplorer
}) => {

    useEffect(() => {
        Events.scrollEvent.register('begin', function (to, element) { });
        Events.scrollEvent.register('end', function (to, element) { });
        scrollSpy.update();

        return () => {
            Events.scrollEvent.remove('begin');
            Events.scrollEvent.remove('end');
        }
    }, [])

    const { id: organisationId, name: organisationName, location } = organisationInfo || {}

    const {
        id, address, name, category, description, images,
        startDate, endDate,
        goal, raised, donorCount, lendingPercentage,
        generatedIncome: initialGeneratedIncome, incomeDistributions, incomeGeneratingAssets, apr
    } = campaignInfo || {}

    const daysLeft = (startDate && endDate) ? moment(endDate).diff(moment(startDate), 'days') : '?'

    const [amount, setAmount] = useState(100)
    const [generatedIncome, setGeneratedIncome] = useState(initialGeneratedIncome ? initialGeneratedIncome : 0);
    const [chartConfig, setChartConfig] = useState(null)

    useEffect(() => {
        setGeneratedIncome(initialGeneratedIncome)
    }, [initialGeneratedIncome])

    useEffect(() => {
        if (incomeGeneratingAssets) {
            setChartConfig({
                data: [incomeGeneratingAssets, incomeGeneratingAssets],
                xField: 'date',
                yField: ['amount', 'income'],
                seriesField: 'category',
                limitInPlot: false,
                theme: {
                    colors10: [
                        '#FFC049',
                        '#2775CA',
                        '#FFC100',
                        '#9FB40F',
                        '#76523B',
                        '#DAD5B5',
                        '#0E8E89',
                        '#E19348',
                        '#F383A2',
                        '#247FEA',
                    ]
                },
                padding: 'auto',
                height: 280,
                slider: null,
                meta: { 
                    date: { 
                        formatter: (v) => moment(v).format('DD MMM'),
                        type: 'time',
                        showLast: true
                    },
                    amount: { alias: 'Total Donations', formatter: (v) => `$${v}` },
                    income: { alias: 'Generated Income', formatter: (v) => `$${v}` }
                },
                tooltip: {
                    showMarkers: false,
                },
                geometryOptions: [
                    { 
                        geometry: 'column', 
                        columnStyle: { fill: '#FFC049'},
                        columnWidthRatio: 0.5
                    }, 
                    { 
                        geometry: 'line', 
                        smooth: true, 
                        lineStyle: {
                            stroke: '#2775CA'
                        }
                    }
                ],
                yAxis: {
                    amount: { 
                        title: { 
                            text: 'Income-generating assets',
                            style: {
                                fontWeight: 600
                            }
                        },
                        label: { 
                            style: {
                                fill: '#000',
                            }
                        }
                    },
                    income: { 
                        title: { 
                            text: 'Generated income',
                            style: {
                                fontWeight: 600
                            }
                        },
                        label: { 
                            style: {
                                fill: '#000'
                            }
                        }
                    },
                },
            })
        }
    }, [incomeGeneratingAssets])

    useInterval(() => {
        setGeneratedIncome(generatedIncome * 1.00005);
    }, 1000);

    const percentage = (goal && raised) ? (raised / goal * 100) : 0
    const blockExplorerLink = (address, blockExplorer) =>
        `${blockExplorer || "https://etherscan.io/"}${"address/"}${address}`
    const etherscanLink = blockExplorerLink(address, blockExplorer)

    const deadline = endDate && new Date(endDate)

    const formatValue = value => `$ ${Number(value).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`


    return (
        <div className="campaign-page">

            <Row gutter={16}>
                <Col span={16}>
                    {/* 
                        Header 
                    */}
                    <div className="campaign-header">
                        <Row gutter={16}>
                            <Col span={3}></Col>
                            <Col span={18}>
                            <div className="category">{category && category[0]}</div>
                            <div className="name">{name}</div>
                            <div>
                                <div className="organisation d-inline-block">
                                    by <Link to={`/organisations/${organisationId}`}>{organisationName}</Link>
                                </div>
                                <div className="location d-inline-block">
                                    <div className="d-flex align-items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <circle cx="12" cy="11" r="3" />
                                            <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                                        </svg>
                                        {location}
                                    </div>
                                </div>
                            </div>
                            </Col>
                            <Col span={3}></Col>
                        </Row>
                    </div>

                    {/* 
                        Body 
                    */}
                    <div className="campaign-body">
                        <Row gutter={16}>
                            <Col span={3}></Col>
                            <Col span={20}>
                                <Row gutter={50}>
                                    <Col span={7}>
                                        <nav className="campaign-menu">
                                            <ScrollLink to="why-are-we-raising-money" className="nav-item" activeClass="is-active" spy={true} smooth={true} offset={50} duration={500}>Summary</ScrollLink>
                                            <ScrollLink to="finances" className="nav-item" activeClass="is-active" spy={true} smooth={true} offset={50} duration={500}>Finances</ScrollLink>
                                            <ScrollLink to="assets" className="nav-item sub" activeClass="is-active" spy={true} smooth={true} offset={50} duration={500}><span className="gray-line"></span>Assets</ScrollLink>
                                            <ScrollLink to="income-distributions" className="nav-item sub" activeClass="is-active" spy={true} smooth={true} offset={50} duration={500}><span className="gray-line"></span>Income Distributions</ScrollLink>
                                            <ScrollLink to="governance" className="nav-item sub disabled" activeClass="is-active" spy={true} smooth={true} offset={50} duration={500}><span className="gray-line"></span>Governance <Tooltip title="Coming soon"><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-lock" width="16" height="16" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <rect x="5" y="11" width="14" height="10" rx="2" />
                                            <circle cx="12" cy="16" r="1" />
                                            <path d="M8 11v-4a4 4 0 0 1 8 0v4" />
                                            </svg></Tooltip></ScrollLink>
                                            <ScrollLink to="wallet-addresses" className="nav-item sub" activeClass="is-active" spy={true} smooth={true} offset={50} duration={500}><span className="gray-line"></span>Wallet Addresses</ScrollLink>
                                        </nav>
                                    </Col>
                                    <Col span={17}>
                                        {/* 
                                        Why are we raising money?
                                    */}
                                        {description && (
                                            <section className="why-are-we-raising-money">
                                                <Element name="why-are-we-raising-money" className="element">
                                                    <div className="section-title">Why are we raising money?</div>
                                                    <div className="description">
                                                        {description}
                                                    </div>
                                                </Element>
                                            </section>
                                        )}

                                        {/* 
                                            Images 
                                        */}
                                        <section 
                                            className="campaign-image-container" 
                                            alt={organisationName}>
                                                <Carousel dotPosition="right" autoplay autoplaySpeed="40" effect="fade">

                                                    {images && images.map( img => (
                                                        <div>
                                                        <div 
                                                            className="campaign-image" 
                                                            style={{ backgroundImage: `url(${img})` }} ></div>
                                                            </div>
                                                    ))}

                                                </Carousel>
                                        </section>

                                        {/* 
                                            Finances
                                        */}
                                        <section className="finances">
                                            <Element name="finances" className="element">

                                                <div className="section-title">Finances</div>

                                                {/* Allocation Summary */}

                                                {/* <section className="allocation-summary">
                                                    <Statistic title="Total Donations" value={raised} prefix="$" />
                                                    <Statistic title={`In ${organisationName}'s wallet`} value={raised ? raised * 0.5 : 0} prefix="$" />
                                                    <Statistic title="Income-generating assets" value={raised ? raised * 0.5 : 0} prefix="$" />
                                                    <Statistic title="Income generated" value={raised ? raised * 0.5 : 0} prefix="$" />
                                                </section> */}


                                                {/* Income-generating Assets */}

                                                <section className="income-generating-assets">

                                                    <div className="sub-section-title">Income-generating assets</div>

                                                    <Row gutter={8}>
                                                        <Col span={16}>
                                                            {chartConfig && <DualAxes {...chartConfig} />}
                                                        </Col>
                                                        <Col span={1}></Col>
                                                        <Col span={7}>
                                                            <Statistic title="Income-generating Donations" value={raised ? raised * 0.5 : 0} prefix="$" />
                                                            <Divider />
                                                            <Statistic title="Generated Income" value={generatedIncome ? generatedIncome.toFixed(2) : 0} prefix="$" precision="2" style={{ marginBottom: '1rem' }} />
                                                            <Statistic title="APR" value={apr ? apr.toFixed(2) : 0} suffix="%" />
                                                        </Col>
                                                    </Row>
                                                </section>


                                                {/* Income Distributions */}

                                                <section className="income-distributions">
                                                    <div className="sub-section-title">Income Distributions</div>
                                                    {incomeDistributions && incomeDistributions.map((distribution, i) => (
                                                        <a href={etherscanLink} target="_blank" className="distribution-item" key={`distribution-${i}`}>
                                                            <div className="date">
                                                                {distribution.date && 
                                                                    moment(distribution.date).format('DD MMM YYYY')
                                                                }
                                                            </div>
                                                            <div className="amount">
                                                                {distribution.amount && `${distribution.amount} USDC distributed`}
                                                            </div>
                                                        </a>
                                                    ))}
                                                </section>


                                                {/* Governance */}

                                                <section className="governance">
                                                    <div className="sub-section-title">Governance</div>
                                                Governance
                                                
                                                </section>


                                                {/* Associated Wallet Addresses */}

                                                <section className="governance">
                                                    <div className="sub-section-title">Associated Wallet Addresses</div>
                                                    <a href={etherscanLink} target="_blank" className="wallet-address-item">
                                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clip-path="url(#clip0)">
                                                                <path d="M4.98812 11.4266C4.98809 11.2926 5.01454 11.1599 5.06594 11.0361C5.11734 10.9123 5.19268 10.7999 5.28764 10.7054C5.38259 10.6108 5.49528 10.536 5.61924 10.4851C5.7432 10.4342 5.87598 10.4084 6.00996 10.409L7.70407 10.4145C7.97419 10.4145 8.23325 10.5219 8.42425 10.713C8.61526 10.904 8.72256 11.1632 8.72256 11.4334V17.8417C8.9134 17.7852 9.15816 17.7249 9.42629 17.6619C9.61245 17.6181 9.77837 17.5126 9.89713 17.3627C10.0159 17.2127 10.0805 17.027 10.0806 16.8357V8.88671C10.0806 8.75289 10.1069 8.62038 10.1581 8.49674C10.2093 8.37311 10.2843 8.26077 10.3789 8.16613C10.4735 8.0715 10.5858 7.99643 10.7093 7.94521C10.8329 7.89399 10.9654 7.86762 11.0992 7.86761H12.7966C13.0667 7.86765 13.3258 7.97501 13.5168 8.16608C13.7077 8.35714 13.8151 8.61626 13.8151 8.88647V16.2644C13.8151 16.2644 14.2399 16.0923 14.654 15.9175C14.8078 15.8524 14.939 15.7435 15.0313 15.6043C15.1236 15.4652 15.1729 15.3019 15.173 15.1349V6.33912C15.173 6.20533 15.1994 6.07284 15.2505 5.94923C15.3017 5.82562 15.3767 5.7133 15.4713 5.61869C15.5659 5.52408 15.6781 5.44903 15.8017 5.39783C15.9253 5.34662 16.0577 5.32027 16.1915 5.32027H17.8889C18.159 5.32027 18.4181 5.42761 18.6091 5.61868C18.8001 5.80975 18.9075 6.0689 18.9075 6.33912V13.5819C20.3792 12.515 21.8707 11.2317 23.0543 9.68867C23.226 9.46469 23.3396 9.20167 23.385 8.92307C23.4304 8.64448 23.4062 8.35897 23.3145 8.09203C22.5136 5.75727 21.0114 3.72694 19.0133 2.27866C17.0151 0.830387 14.6186 0.034855 12.1513 0.000843759C5.49814 -0.0885625 -0.000351852 5.34438 0.000301709 12.0007C-0.00623089 14.107 0.54331 16.1777 1.59336 18.0034C1.73817 18.2531 1.95121 18.4563 2.20745 18.5891C2.46369 18.7218 2.75249 18.7787 3.03993 18.753C3.36108 18.7247 3.76089 18.6848 4.2362 18.629C4.44307 18.6054 4.63407 18.5066 4.7728 18.3513C4.91153 18.1959 4.98832 17.995 4.98852 17.7867V11.4266" fill="#21325B" />
                                                                <path d="M4.95089 21.7042C6.74017 23.0063 8.85466 23.7879 11.0604 23.9625C13.2662 24.1371 15.4772 23.6979 17.4489 22.6934C19.4207 21.689 21.0762 20.1585 22.2323 18.2713C23.3885 16.384 24.0003 14.2136 23.9999 12.0002C23.9999 11.7239 23.9871 11.4507 23.9686 11.179C19.5863 17.7169 11.4949 20.7734 4.95081 21.7045" fill="#979695" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0">
                                                                    <rect width="24" height="24" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    Organisation Wallet</a>
                                                </section>
                                            </Element>
                                        </section>
                                    </Col>
                                </Row>
                            </Col>
                            <Col span={1}></Col>
                        </Row>
                    </div>
                </Col>

                <Col span={6}>
                    <div className="campaign-sidebar">
                        <div className="campaign-sidebar-section scrollbar">

                            {/* Progress */}

                            <div className="progress">
                                <Row gutter={10} style={{ marginBottom: '0.2rem', alignItems: 'center' }}>
                                    <Col span={8}>
                                        <Statistic value={goal} prefix="$" valueStyle={{ fontSize: '92%' }} suffix="goal" className="goal" />
                                    </Col>
                                    <Col span={8}>
                                        <Statistic value={daysLeft} valueStyle={{ fontSize: '92%' }} suffix="days left" className="days-left" />
                                    </Col>
                                    <Col span={8}>
                                        <Statistic value={donorCount} valueStyle={{ fontSize: '92%' }} suffix="donors" className="donors" />
                                    </Col>
                                </Row>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
                                </div>
                            </div>

                            <div className="ant-statistic total-donations" style={{ marginTop: '0.8rem', marginBottom: '1rem' }}>
                                <div className="ant-statistic-content">
                                    <div className="ant-statistic-title">Total to be received by {organisationName}:</div>
                                    <span className="ant-statistic-content-value">
                                        <AnimatedNumber
                                            value={generatedIncome + raised}
                                            formatValue={formatValue}
                                            duration={1000}
                                        />
                                    </span>
                                </div>
                            </div>

                            <Row gutter={10} style={{ marginBottom: '1.4rem' }}>
                                <Col span={12}>
                                    <Statistic title="Raised" value={raised ? raised : 0} prefix="$" className="raised" />
                                </Col>
                                <Col span={12}>
                                    <div className="ant-statistic income-generated">
                                        <div className="ant-statistic-title">Income generated</div>
                                        <div className="ant-statistic-content">
                                            <span className="ant-statistic-content-value">
                                                <AnimatedNumber
                                                    value={generatedIncome}
                                                    formatValue={formatValue}
                                                    duration={1000}
                                                />
                                            </span>
                                        </div>
                                    </div>
                                </Col>
                            </Row>

                            

                            {/* Donation Box */}

                            <div className="donation-box">
                                <h3>Give</h3>
                                <input type="number" className="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                <button className="btn btn-primary">
                                    Give <HeartFilled />
                                </button>
                            </div>
                            </div>
                            <div className="campaign-sidebar-section scrollbar">

                            {/* Timeline */}

                            <section className="timeline">
                                    <Steps current={1} size="small" direction="vertical" progressDot>
                                        <Step title={startDate && moment(startDate).format('DD MMM YYYY')} description="Project created" />
                                        <Step 
                                        title="In Progress" 
                                        subTitle={`Left ${daysLeft} days`} 
                                        description={
                                            <ul style={{ paddingLeft: '1rem', marginBottom: '0' }}>
                                                <li>Accepting donations.</li>
                                                <li>{organisationName} receives {100 - lendingPercentage}% donations immediately</li>
                                                <li>Generating income using {lendingPercentage}% of donations</li>
                                            </ul>
                                        } 
                                        status="process" />
                                        <Step title={endDate && moment(endDate).format('DD MMM YYYY')} description="All funds will be withdrawn from vaults and sent to project wallet." />
                                    </Steps>
                            </section>
                        </div>
                    </div>

                </Col>
                <Col span={2}></Col>
            </Row>
        </div>
    )
}

const dummyOrganisationInfo = {
    id: 4,
    name: "Wildlife Alliance",
    description: "The wildlife trade is a multi-billion dollar industry that threatens endangered species' survival and human health as zoonotic diseases such as COVID-19 emerge. Cambodia is both a wildlife source and transit country, and illegal trafficking was rampant in 2001 when the Wildlife Rapid Rescue Team (WRRT) was established to crack down on the trade. To date, WRRT has rescued over 69,000 live animals, apprehended over 7,700 traders, and confiscated large quantities of animal parts and contraband.",
    logo: "https://i.imgur.com/lCdyivk.jpg",
    url: "https:/​/​www.wildlifealliance.org/​",
    location: "New York, United States",
}
const dummyCampaignInfo = {
    id: 4,
    address: "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506",
    name: "Help Stop Illegal Wildlife Trafficking",
    category: ['Wildlife Conservation'],
    description: "The wildlife trade is a multi-billion dollar industry that threatens endangered species' survival and human health as zoonotic diseases such as COVID-19 emerge. Cambodia is both a wildlife source and transit country, and illegal trafficking was rampant in 2001 when the Wildlife Rapid Rescue Team (WRRT) was established to crack down on the trade. To date, WRRT has rescued over 69,000 live animals, apprehended over 7,700 traders, and confiscated large quantities of animal parts and contraband.",
    images: ["https://i.imgur.com/XxWLj09.jpg","https://i.imgur.com/8E6xldh.jpg", "https://i.imgur.com/zbneBGE.jpg", "https://i.imgur.com/c25Ul4t.jpg"],
    startDate: '2021-05-17T10:41:31+00:00',
    endDate: '2022-01-31T10:41:31+00:00',
    goal: 100000,
    raised: 88368,
    donorCount: 3920,
    lendingPercentage: 50,
    generatedIncome: 334.6,
    apr: 9.58,
    incomeDistributions: [
        {
            date: '2021-06-01T00:00:00+00:00',
            amount: 288.4
        }
    ],
    incomeGeneratingAssets: [
        {
            date: '2021-05-17T00:00:00+00:00',
            amount: 28663,
            income: 59
        },
        {
            date: '2021-05-22T00:00:00+00:00',
            amount: 32812,
            income: 79
        },
        {
            date: '2021-05-27T00:00:00+00:00',
            amount: 38989,
            income: 120
        },
        {
            date: '2021-06-01T00:00:00+00:00',
            amount: 45229,
            income: 151.8
        },
        {
            date: '2021-06-07T00:00:00+00:00',
            amount: 59888,
            income: 180.33
        },
        {
            date: '2021-06-12T00:00:00+00:00',
            amount: 62382,
            income: 200.5
        },
        {
            date: '2021-06-17T00:00:00+00:00',
            amount: 73297,
            income: 244.7
        },
        {
            date: '2021-06-22T00:00:00+00:00',
            amount: 76982,
            income: 276.82
        },
        {
            date: '2021-06-28T00:00:00+00:00',
            amount: 79182,
            income: 301.2
        },
        {
            date: new Date(),
            amount: 88368,
            income: 334.6
        }
    ]
}

export default Campaign