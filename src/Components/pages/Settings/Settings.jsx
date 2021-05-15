import React, { useState } from 'react'
import styled from 'styled-components'
import { InputNumber } from 'antd'

const Wrapper = styled.div``

function Settings() {
	const [settings, setSettings] = useState({ cycle: { long: 60 * 25, short: 60 * 5 } })
	const onChange = ({ value, name }) => {
		setSettings({ cycle: { ...settings.cycle, [name]: value * 60 } })
	}
	return (
		<Wrapper>
			<InputNumber
				name='long'
				min={1}
				max={60}
				defaultValue={25}
				onChange={value => onChange({ value, name: 'long' })}
			/>
			<InputNumber
				name='short'
				min={1}
				max={60}
				defaultValue={5}
				onChange={value => onChange({ value, name: 'short' })}
			/>
		</Wrapper>
	)
}

export default Settings
