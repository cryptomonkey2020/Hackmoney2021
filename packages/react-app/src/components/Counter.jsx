import React from "react"
import useOdometer from 'use-odometer';

const Counter = ({initialValue, rate}) => {
    const [count,setCount] = React.useState(initialValue)
    
    const targetRef = React.useRef(null);
    useOdometer(targetRef, count, {
        format: "(,ddd).dddd"
    });

    const interestEarnedIn2Seconds = rate * 2

    React.useEffect(() => {
        const timer = setTimeout(() => {
          setCount(count + interestEarnedIn2Seconds);
        }, 2000);
        return () => clearTimeout(timer);
    });

    return (
        <>
            Animated: <p className="target" ref={targetRef} />
        </>
    )
}

export default Counter