import React from "react";
import { NavLink, Link } from "react-router-dom";
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

  return (
    <div className="header">
      <div className="container">
        <div className="d-flex justify-content-between">

          <div className="left-col">
            <Logo />
            
            <nav>
              <NavLink to="/donate" className="inline-flex-item-fill-height">Donate Now</NavLink>
              <NavLink to="/create" className="inline-flex-item-fill-height">Create</NavLink>
              <NavLink to="/dev-tools" className="inline-flex-item-fill-height">Dev Tools</NavLink>
            </nav>
          </div>
      
          <div className="right-col">

            <NetworkCard 
              targetNetwork={targetNetwork}
              localChainId={localChainId}
              selectedChainId={selectedChainId}
              />

            <div className="address-container">
              {address && 
                <Link to="/profile" className="address">
                  <Address address={address} fontSize={17} />
                </Link>
              }
            </div>

            {(web3Modal && web3Modal.cachedProvider)
              ? (
                <button 
                  className="btn btn-primary-light inline-flex-item-fill-height"
                  onClick={logoutOfWeb3Modal}>
                    Log out
                </button>
              )
              : (
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
    </div>

    </div>
  )
}
