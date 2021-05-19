import React from 'react'
import styled from 'styled-components'
import { convertTimeToString } from '../../../utils'

const Wrapper = styled.section`
	padding: 10%;
`

function Streak({ streak }) {
	return (
		<Wrapper>
			<h2>Pomodoros totales:</h2>
			<p>{streak.pomodoros.completed}</p>
			<h2>Tiempo total:</h2>
			<p>{convertTimeToString(streak.totalTime)}</p>
		</Wrapper>
	)
}

export default Streak
