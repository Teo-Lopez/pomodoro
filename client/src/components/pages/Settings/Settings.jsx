import React, { useState } from 'react'
import styled from 'styled-components'
import { Button, Form, InputNumber } from 'antd'

const Wrapper = styled.div`
	padding: 10%;

	input {
		padding: 20px;
		margin-right: 12px;
	}

	button {
		display: block;
		margin: 0 0 0 auto;
	}
`

function Settings({ updateSettings }) {
	const [settings, setSettings] = useState({ cycle: { long: 60 * 25, short: 60 * 5 } })
	const onChange = ({ value, name }) => {
		setSettings({ cycle: { ...settings.cycle, [name]: value * 60 } })
	}

	const onSubmit = () => {
		updateSettings(settings)
	}
	const layout = {
		labelCol: { xs: 4 },
		wrapperCol: { xs: 14 }
	}
	return (
		<Wrapper>
			<h1>Settings</h1>
			<hr />
			<Form
				{...layout}
				layout='horizontal'
				name='basic'
				initialValues={{ remember: true }}
				// onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
			>
				<Form.Item label='Duración del pomodoro:: ' name='long'>
					<InputNumber
						min={1}
						max={60}
						defaultValue={25}
						onChange={value => onChange({ value, name: 'long' })}
					/>
				</Form.Item>
				<Form.Item label='Duración del descanso:: ' name='short'>
					<InputNumber
						min={1}
						max={60}
						defaultValue={5}
						onChange={value => onChange({ value, name: 'short' })}
					/>
				</Form.Item>

				<Button onClick={onSubmit}>Save changes</Button>
			</Form>
		</Wrapper>
	)
}

export default Settings
