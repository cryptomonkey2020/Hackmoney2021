/* eslint-disable jsx-a11y/accessible-emoji */
import React from "react";
import logo from "../assets/logo192.png";
import "./MainPage.css";

function MainPage() {
  return (
    <>
      <img src={logo} alt="company logo" />
      <h1>give, a Decentralized Donation Platform</h1>
      <p>
        Our mission is to create a social positive donation platform which maximize the value and impact of your
        donations by
      </p>
      <p>1. Investing the initial donation</p>
      <p>2. Generate a Monthly revenue stream using the principal</p>
      <p>3. You will receive the principal on maturity date</p>
    </>
  );
}

export default MainPage;
