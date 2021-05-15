import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { convertTimeToString } from '../../../utils'
import Circle from './Circle'
const CounterWrapper = styled.section`
	height: calc(100vh - 60px);
	padding-top: 80px;
	button {
		margin: 40px auto;
		display: block;
	}
	p {
		text-align: center;
		margin: 0 auto;
	}
`

function Counter({ startTime }) {
	const [timeText, setTimeText] = useState(convertTimeToString(startTime))
	const [isCounting, setIsCounting] = useState(false)
	const [time, setTime] = useState(startTime)
	const intervalRef = useRef()

	const toogleTimer = () => {
		debugger
		if (isCounting) {
			console.log('parando', isCounting)
			clearInterval(intervalRef.current)
			intervalRef.current = null
		} else {
			console.log('iniciando')
			startTimer(time)
		}
		setIsCounting(!isCounting)
	}

	const startTimer = startTime => {
		let newTime = startTime
		const timer = setInterval(() => {
			setTimeText(convertTimeToString(--newTime))
			setTime(newTime)
			if (newTime <= 0) {
				toogleTimer()
			}
		}, 1000)

		intervalRef.current = timer
	}

	return (
		<CounterWrapper>
			<Button onClick={() => toogleTimer()}>
				{isCounting ? 'Stop the timer' : 'Start the timer'}
			</Button>

			<Circle onClick={toogleTimer} isCounting={isCounting} time={time} text={timeText} />
		</CounterWrapper>
	)
}

export default Counter
