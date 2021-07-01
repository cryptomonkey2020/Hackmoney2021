import React, { useState } from "react";
import Superfluid from "../components/SuperFluid/Superfluid";
import { Form, Input } from "antd";

export default function Campaigns1({ address }) {
  const [amount, setAmount] = useState();

  // need to get props from donate page to calaculate % going to superfluid
  const donateAmount = e => {
    setAmount(e.target.value);
  };

  return (
    <>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 6 }} layout="horizontal">
        <Form.Item label="Amount To Stream">
          <Input value={amount} onChange={donateAmount} />
        </Form.Item>
        <Form.Item>
          <h3>Rate: Monthly</h3>
        </Form.Item>
      </Form>

      <Superfluid address={address} amountDonated={amount} />
    </>
  );
}
