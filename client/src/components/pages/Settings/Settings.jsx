import React from 'react'
import styled from 'styled-components'
import { Button, Form, InputNumber, Radio } from 'antd'
import AuthService from '../../../services/auth.service'

const authService = new AuthService()
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
const layout = {
	labelCol: { xs: 4 },
	wrapperCol: { xs: 14 }
}

function Settings({ updateSettings }) {
	const [form] = Form.useForm()

	/**
	 * Modifies the state of App.js
	 * @param  {{long: {Number}, short: {Number}}} value Object with both inputs value
	 * @returns
	 */
	const onSubmit = value => {
		const settings = { ...value }
		settings.long = value.long * 60
		settings.short = value.short * 60
		updateSettings({ cycle: settings })
	}
	return (
		<Wrapper>
			<h1>Settings</h1>
			<hr />
			<Form
				{...layout}
				form={form}
				layout='horizontal'
				name='basic'
				initialValues={{ long: 25, short: 5, current: 'long' }}
				onFinish={onSubmit}
				// onFinishFailed={onFinishFailed}
			>
				<Form.Item label='Duración del pomodoro:: ' name='long'>
					<InputNumber
						min={1}
						max={60}
						rules={[{ type: Number, min: 1, message: 'Value must be superior to 0' }]}
					/>
				</Form.Item>
				<Form.Item label='Duración del descanso:: ' name='short'>
					<InputNumber
						min={1}
						max={60}
						rules={[{ type: Number, min: 1, message: 'Value must be superior to 0' }]}
					/>
				</Form.Item>
				<Form.Item name='current' label='Current cycle: '>
					<Radio.Group>
						<Radio value='long'>Working</Radio>
						<Radio value='short'>Rest</Radio>
					</Radio.Group>
				</Form.Item>
				<Form.Item>
					<Button type='primary' htmlType='submit'>
						Submit
					</Button>
				</Form.Item>
				<Button onClick={() => authService.logout()}>Logout</Button>
			</Form>
		</Wrapper>
	)
}

export default Settings
