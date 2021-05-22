import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import AuthService from '../../../services/auth.service'
import { useState } from 'react'

const authService = new AuthService()

const LoginForm = ({ setLoggedUser }) => {
	const [message, setMessage] = useState('')

	const onFinish = values => {
		authService
			.login(values)
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
		<Form
			name='normal_login'
			className='login-form'
			initialValues={{ remember: true }}
			onFinish={onFinish}
		>
			{message && <p>{message}</p>}
			<Form.Item name='email' rules={[{ required: true, message: 'Please input your email!' }]}>
				<Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='email' />
			</Form.Item>
			<Form.Item
				name='password'
				rules={[{ required: true, message: 'Please input your Password!' }]}
			>
				<Input
					prefix={<LockOutlined className='site-form-item-icon' />}
					type='password'
					placeholder='Password'
				/>
			</Form.Item>
			<Form.Item>
				<Form.Item name='remember' valuePropName='checked' noStyle>
					<Checkbox>Remember me</Checkbox>
				</Form.Item>
			</Form.Item>

			<Form.Item>
				<Button type='primary' htmlType='submit' className='login-form-button'>
					Log in
				</Button>
			</Form.Item>
		</Form>
	)
}

export default LoginForm
