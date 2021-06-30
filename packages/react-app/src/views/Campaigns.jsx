import React, { useState } from "react";
import Select from "react-select";
import Superfluid from "../components/SuperFluid/Superfluid";
import { Form, Input } from "antd";


export default function Campaigns1({ address, userProvider }) {
  const [flow, setFlow] = useState();
  const [amount, setAmount] = useState();


  const flowAmount = (e) => {
    setFlow(e.target.value);
  }

  const donateAmount = (e) => {
    setAmount(e.target.value);
  }

  return (
    <>
<Form labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal">
        <Form.Item label="Your Address">
          <h2>{ address }</h2>
          </Form.Item>
          <Form.Item label="Amount To Stream">
            <Input
              value={amount}
            onChange={donateAmount}
            />
          </Form.Item>
          <Form.Item label="Rate">
          <select
              name="rate"
              value={ flow }
              onSelect={ flowAmount }
          >
            <option value="minute">Minute</option>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="month">Month</option>
          </select>
          </Form.Item>
      </Form>

      <Superfluid
      address={ address }
        signer={ userProvider && userProvider.getSigner() }
        rateOfFlow={ flow }
        amountDonated={amount}
      />
    </>
  );
}
