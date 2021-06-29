import React from 'react'
import { Alert } from "antd"
import { NETWORK } from "../../constants"
import "./NetworkCard.scss"

const NetworkCard = ({
    targetNetwork,
    localChainId,
    selectedChainId
}) => {

    let networkDisplay = "";

    if (localChainId && selectedChainId && localChainId !== selectedChainId) {

        const networkSelected = NETWORK(selectedChainId);
        const networkLocal = NETWORK(localChainId);

        if (selectedChainId === 1337 && localChainId === 31337) {
            networkDisplay = (
                <Alert
                    message="⚠️ Wrong Network ID"
                    description={
                        <div>You have <b>chain id 1337</b> for localhost and you need to change it to <b>31337</b> to work with HardHat.<div>(MetaMask -&gt; Settings -&gt; Networks -&gt; Chain ID -&gt; 31337)</div>
                        </div>
                    }
                    type="error"
                    closable={false}
                />
            );
        } else {
            networkDisplay = (
                <Alert
                    message="⚠️ Wrong Network"
                    description={
                        <div>
                            You have <b>{networkSelected && networkSelected.name}</b> selected and you need to be on{" "}
                            <b>{networkLocal && networkLocal.name}</b>.
                        </div>
                    }
                    type="error"
                    closable={false}
                />
            );
        }
    } else {
        networkDisplay = targetNetwork.name
    }

    let cssProperty = {}
    cssProperty['--network-card-color'] = targetNetwork.color

    return (
        <div 
            className="network-card" 
            style={cssProperty}>
            {networkDisplay}
        </div>
    )
}

export default NetworkCard