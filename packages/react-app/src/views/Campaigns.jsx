import React, { useState } from "react";
import Superfluid from "../components/SuperFluid/Superfluid";
import { Form, Input, Select } from "antd";


export default function Campaigns1({ address, userProvider }) {
  const [flow, setFlow] = useState("minute");
  const [amount, setAmount] = useState();


  const flowAmount = (e) => {
    setFlow(e.target.textContent);
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
          <Select
              name="rate"
              value={ flow }
              onChange={ flowAmount }
          >
            <Select.Option value="minute">Minute</Select.Option>
            <Select.Option value="hour">Hour</Select.Option>
            <Select.Option value="day">Day</Select.Option>
            <Select.Option value="month">Month</Select.Option>
          </Select>
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
