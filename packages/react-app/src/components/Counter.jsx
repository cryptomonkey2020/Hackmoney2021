import React, { useState, useEffect, useRef } from "react";
import useOdometer from "use-odometer";

const Counter = ({ initialValue, rate }) => {
  const [count, setCount] = useState(initialValue);

  const targetRef = useRef(null);
  useOdometer(targetRef, count, {
    format: "(,ddd).dddd",
  });
  
  const interestEarned = initialValue / rate;

  setTimeout(() => {
    setCount(count - interestEarned);
  }, 1000);

  return (
      <>
      <h4>Donation Streamming at </h4>
      <span style={{ fontSize: 16 }}>
        $<p className="target" ref={targetRef} />
      </span>
    </>
  );
};

export default Counter;
