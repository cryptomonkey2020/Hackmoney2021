import React, { useState } from "react";
import Superfluid from "../components/SuperFluid/Superfluid";
import { Form, Input, Radio } from "antd";


export default function Campaigns1({ address, userProvider }) {
  const [flow, setFlow] = useState();
  const [amount, setAmount] = useState();
  const [orgAddress, setOrgAddress] = useState();


  const flowAmount = (e) => {
    setFlow(e.target.value);
  }

  const donateAmount = (e) => {
    setAmount(e.target.value);
  }

  const org = (e) => {
    setOrgAddress(e.target.value);
  }

  return (
    <>
<Form labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal">
        <Form.Item label="Your Address">
          <h2>{ address }</h2>
          </Form.Item>
        <Form.Item label="Organization Address">
          <Input
            onChange={org}
            value={orgAddress}
          />
          </Form.Item>
          <Form.Item label="Amount To Stream">
            <Input
              value={amount}
            onChange={donateAmount}
            />
          </Form.Item>
          <Form.Item label="Rate">
          <Radio.Group
              name="rate"
              value={ flow }
              onChange={ flowAmount }
          >
            <Radio.Button value="minute">Minute</Radio.Button>
            <Radio.Button value="hour">Hour</Radio.Button>
            <Radio.Button value="day">Day</Radio.Button>
            <Radio.Button value="month">Month</Radio.Button>
          </Radio.Group>
          </Form.Item>
      </Form>

      <Superfluid
      address={ address }
        signer={ userProvider && userProvider.getSigner() }
        rateOfFlow={ flow }
        amountDonated={ amount }
        org={orgAddress}
      />
    </>
  );
}
