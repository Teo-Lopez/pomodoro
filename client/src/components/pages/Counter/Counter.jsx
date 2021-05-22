import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Button } from 'antd'
import { convertTimeToString, usePrevious } from '../../../utils'
import Circle from './Circle'

const CounterWrapper = styled.section`
	height: calc(100vh - 60px);
	padding-top: 80px;
	user-select: none;
	svg:active {
		box-shadow: 5px 5px 15px 5px #d3d3d3;
		border-radius: 50%;
	}

	button {
		margin: 40px auto;
		display: block;
	}
	p {
		text-align: center;
		margin: 0 auto;
	}
`

let timer
function Counter({ startTime, setModal, addPomodoro, changeCycle, loggedUser }) {
	const [isCounting, setIsCounting] = useState(false)
	const [time, setTime] = useState({ text: convertTimeToString(startTime), inSeconds: startTime })
	const prevTime = usePrevious(startTime)
	const updateTime = newTime => setTime({ text: convertTimeToString(newTime), inSeconds: newTime })
	
	/** Main control function. */
	const toogleTimer = () => {
		isCounting ? stopTimer() : startTimer()
		setIsCounting(!isCounting)
	}

	/** Start timer interval. Should not be called outside of toogleTimer */
	const startTimer = _ => {
		if (isRestart()) {
			updateTime(startTime)
			//workaround to react closures and state updates
			time.inSeconds = startTime
		}

		timer = setInterval(() => {
			updateTime(--time.inSeconds)
			if (time.inSeconds <= 0) {
				stopTimer()
				addPomodoro()
				changeCycle()
			}
		}, 1000)
	}
	const stopTimer = () => {
		clearInterval(timer)
		timer = null
		setIsCounting(false)
	}

	const isRestart = () => time.inSeconds <= 0

	/** Checks if restarting the timer is needed */
	useEffect(
		_ => {
			if (prevTime && prevTime !== startTime) {
				if (isCounting) {
					setModal({
						visible: true,
						text: 'We detected a change in the settings. That will restart the timer.'
					})
				}

				updateTime(startTime)
				stopTimer()
			}
		},
		[startTime, isCounting, prevTime, setModal, addPomodoro]
	)

	return (
		<CounterWrapper>
			<Circle
				maxValue={startTime}
				onClick={toogleTimer}
				isCounting={isCounting}
				time={time.inSeconds}
				text={time.text}
			/>
			{loggedUser && <p>{loggedUser.currentTask?.name}</p>}
			<Button onClick={() => toogleTimer()}>
				{isCounting ? 'Stop the timer' : 'Start the timer'}
			</Button>
		</CounterWrapper>
	)
}

export default Counter
