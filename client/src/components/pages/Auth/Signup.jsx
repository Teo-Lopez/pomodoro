import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import AuthService from '../../../services/auth.service'
const authService = new AuthService()

const formItemLayout = {
	labelCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 8
		}
	},
	wrapperCol: {
		xs: {
			span: 24
		},
		sm: {
			span: 16
		}
	}
}
const tailFormItemLayout = {
	wrapperCol: {
		xs: {
			span: 24,
			offset: 0
		},
		sm: {
			span: 16,
			offset: 8
		}
	}
}

const SignupForm = ({ setLoggedUser }) => {
	const [form] = Form.useForm()
	const [message, setMessage] = useState('')

	const onFinish = values => {
		setMessage('')
		authService
			.signup(values)
			.then(res => {
				setLoggedUser(res.data)
			})
			.catch(err => {
				setMessage(err.response.data.message)
				setTimeout(() => {
					setMessage('')
				}, 2000)
			})
	}

	return (
		<Form {...formItemLayout} form={form} name='register' onFinish={onFinish} scrollToFirstError>
			<Form.Item
				name='email'
				label='E-mail'
				rules={[
					{
						type: 'email',
						message: 'The input is not valid E-mail!'
					},
					{
						required: true,
						message: 'Please input your E-mail!'
					}
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				name='password'
				label='Password'
				rules={[
					{
						required: true,
						message: 'Please input your password!'
					}
				]}
				hasFeedback
			>
				<Input.Password />
			</Form.Item>

			<Form.Item
				name='confirm'
				label='Confirm Password'
				dependencies={['password']}
				hasFeedback
				rules={[
					{
						required: true,
						message: 'Please confirm your password!'
					},
					({ getFieldValue }) => ({
						validator(_, value) {
							if (!value || getFieldValue('password') === value) {
								return Promise.resolve()
							}

							return Promise.reject(new Error('The two passwords that you entered do not match!'))
						}
					})
				]}
			>
				<Input.Password />
			</Form.Item>

			<Form.Item {...tailFormItemLayout}>
				<Button type='primary' htmlType='submit'>
					Register
				</Button>
			</Form.Item>
			{message && <p>{message}</p>}
		</Form>
	)
}

export default SignupForm
