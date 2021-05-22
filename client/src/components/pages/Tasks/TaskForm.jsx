import { Form, Input, InputNumber, Button, Checkbox } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import TaskService from '../../../services/task.service'
const taskService = new TaskService()
const layout = {
	labelCol: {
		span: 8
	},
	wrapperCol: {
		span: 16
	}
}
const tailLayout = {
	wrapperCol: {
		offset: 8,
		span: 16
	}
}

const TaskForm = ({ loadTasks }) => {
	const [tasksForm] = useForm()
	const onFinish = values => {
		console.log('Success:', values)
		taskService.createTask(values).then(res => loadTasks(res))
	}

	const onFinishFailed = errorInfo => {
		console.log('Failed:', errorInfo)
	}

	return (
		<Form
			{...layout}
			form={tasksForm}
			name='task'
			initialValues={{ pomodoros: 1 }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label='name'
				name='name'
				rules={[
					{
						required: true,
						message: 'Please input a name for the task'
					}
				]}
			>
				<Input />
			</Form.Item>

			<Form.Item
				label='pomodoros'
				name='pomodoros'
				rules={[
					{
						required: true,
						message: 'Please input your pomodoros!'
					}
				]}
			>
				<InputNumber />
			</Form.Item>

			<Form.Item {...tailLayout}>
				<Button type='primary' htmlType='submit'>
					Submit
				</Button>
			</Form.Item>
		</Form>
	)
}

export default TaskForm
