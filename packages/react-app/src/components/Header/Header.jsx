import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Row, Col } from 'antd'
import { useOuterClick } from '../../hooks'
import Logo from '../Logo'

import Address from '../Address'
import NetworkCard from './NetworkCard'
import "./Header.scss"

export default function Header({
  address,
  web3Modal, loadWeb3Modal, logoutOfWeb3Modal,
  faucetHint,

  targetNetwork,
  localChainId,
  selectedChainId
}) {

  const [isDropdownActive, setIsDropdownActive] = useState(false)
  const ref = useOuterClick(ev => setIsDropdownActive(false))

  return (
    <div className="header">
      <Row gutter={16}>
        <Col span={2}></Col>
        <Col span={20}>
          <div className="d-flex justify-content-between">

            <div className="left-col">
              <Link to="/"><Logo /></Link>

              <nav>
                <NavLink to="/donate" className="inline-flex-item-fill-height">Donate Now</NavLink>
                <NavLink to="/create" className="inline-flex-item-fill-height">Create</NavLink>
                <NavLink to="/dev-tools" className="inline-flex-item-fill-height">Dev Tools</NavLink>
                {/* <NavLink to="/stream" className="inline-flex-item-fill-height">Stream Now</NavLink> */}
              </nav>
            </div>

            <div className="right-col d-flex align-items-center">

              <NetworkCard
                targetNetwork={targetNetwork}
                localChainId={localChainId}
                selectedChainId={selectedChainId}
              />

              <div className="address-container">
                {address &&
                  <a>

                    <div className={`dropdown ${isDropdownActive ? 'is-active' : ''}`} ref={ref}>

                      <button className="address inline-flex-item-fill-height" onClick={() => setIsDropdownActive(!isDropdownActive)}>
                        <Address address={address} fontSize={17} /> <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="caret-down" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" class="dropdown-indicator" style={{ width: '0.625em' }}><path fill="currentColor" d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z" class=""></path></svg>
                      </button>

                      <div className="dropdown-menu">
                        <div className="dropdown-content">
                          <Link to="/profile" className="dropdown-item">
                            My Donations
                          </Link>
                          <Link to="/manage-organisations" className="dropdown-item">
                            Manage Organisations
                          </Link>
                          <div className="dropdown-divider"></div>
                          {(web3Modal && web3Modal.cachedProvider) &&
                            <button
                              className="dropdown-item d-flex align-items-center"
                              onClick={logoutOfWeb3Modal}>
                              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-square-x" style={{ marginRight: '.4rem' }} width="22" height="22" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <rect x="4" y="4" width="16" height="16" rx="2" />
                                <path d="M10 10l4 4m0 -4l-4 4" />
                              </svg> Disconnect
                </button>
                          }
                        </div>
                      </div>


                    </div>
                  </a>
                }
              </div>

              {!(web3Modal && web3Modal.cachedProvider) &&
                (
                  <button
                    className="btn btn-primary-light"
                    onClick={loadWeb3Modal}>
                    Connect
                  </button>
                )
              }

              {/* {faucetHint} */}
            </div>

          </div>
        </Col>
        <Col span={2}></Col>
      </Row>



    </div>
  )
}
