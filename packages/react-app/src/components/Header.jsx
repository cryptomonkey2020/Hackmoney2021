import { PageHeader } from "antd";
import React from "react";

// displays a page header

export default function Header() {
  return (
    <a href="https://github.com/cryptomonkey2020/Hackmoney2021">
      <PageHeader title="DeDP" subTitle="Decentralized Donation Platform" style={{ cursor: "pointer" }} />
    </a>
  );
}
