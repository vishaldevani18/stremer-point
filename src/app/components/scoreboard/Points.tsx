import React, { useEffect } from "react";
import { useState } from "react";
import { PointsContainer, PointsText } from './styles'
interface CounterProps {
    startNumber: number;
    endNumber: number;
    duration: number
}

const Points = (props: CounterProps) => {
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
    return <PointsContainer>{count}<PointsText>points</PointsText></PointsContainer>

}
export default Points