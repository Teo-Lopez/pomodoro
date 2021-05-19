import React from 'react'
import styled from 'styled-components'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Wrapper = styled.div`
	margin: 0 auto;
	width: 80%;
`

const Canvas = props => {
	return (
		<Wrapper onClick={props.onClick}>
			<CircularProgressbar
				strokeWidth={5}
				value={props.time}
				maxValue={props.maxValue}
				text={props.text}
			/>
		</Wrapper>
	)
}

export default Canvas
