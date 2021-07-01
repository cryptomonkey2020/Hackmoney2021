import React, { useState } from "react";
import Superfluid from "../components/SuperFluid/Superfluid";
import { Form, Input, Space } from "antd";

export default function Campaigns1({ address }) {
  const [amount, setAmount] = useState();

  // need to get props from donate page to calaculate % going to superfluid
  const donateAmount = e => {
    setAmount(e.target.value);
  };

  return (
    <>
      <Space align="center">
        <Form labelCol={{ span: 16 }} wrapperCol={{ span: 4 }} layout="horizontal">
          <Form.Item label="Amount To Stream Monthly $(USDC)">
            <Input value={amount} onChange={donateAmount} />
          </Form.Item>
        </Form>
      </Space>
      <Superfluid address={address} amountDonated={amount} />
    </>
  );
}
