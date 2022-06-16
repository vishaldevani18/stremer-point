import React, { useEffect } from "react";
import { useState } from "react";
import styled from 'styled-components';
interface CounterProps {
    startNumber: number;
    endNumber: number;
    duration: number
}
export const CounterContainer = styled.div`
    display: flex;
    align-items: center;
    font-size:25px;
    font-weight:500;
    @media (max-width: 767px) {
    font-size:20px;
    margin:15px 0;
    font-weight:400;
    }
`;
export const CounterText = styled.p`
    padding-left: 5px;
    display: flex;
    align-items: center;
    color:#bab8b8;
    font-size:22px;
    font-weight:300;
    margin:15px 0;
    @media (max-width: 767px) {
        display:none
    }
}
`
const Score = (props: CounterProps) => {
    const [count, setCount] = useState(JSON.stringify(props.startNumber))
    useEffect(() => {
        counter(JSON.stringify(props.endNumber), JSON.stringify(props.duration))
    }, [props.endNumber, props.startNumber])

    const counter = (endNumber: string, durations: string) => {
        let start = 0
        const end = parseInt(endNumber.substring(0, 2))
        if (start === end) {
            return
        }
        let totalMilSecDur = parseInt(durations)
        let incrementTime = (totalMilSecDur / end) * 500
        let timer = setInterval(() => {
            start += 1;
            setCount(String(start) + endNumber.substring(2));
            if (start === end) clearInterval(timer)
        }, incrementTime)
    }
    return <CounterContainer>{count}<CounterText>points</CounterText></CounterContainer>

}
export default Score