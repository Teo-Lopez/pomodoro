import React from 'react'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import canIcon from './thras.svg'
import AuthService from '../../../services/auth.service'
import TaskService from '../../../services/task.service'
const authService = new AuthService()
const taskService = new TaskService()
const Wrapper = styled.div`
	border: 0.5px solid rgba(240, 240, 240);
	border-radius: 5px;
	background-color: ${props => props.active && 'rgb(224 255 224)'};
	.centerer {
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	img {
		height: 1.8em;
	}
	p {
		margin: 0;
		padding: 6px 3px;
	}
`

const updateCurrentTask = (user, currentTask) => authService.editUser({ user, currentTask })
const deleteTask = id => taskService.deleteTask(id)
function TaskRow({ loggedUser, task, fetchUser, loadTasks }) {
	const onClickName = () => updateCurrentTask(loggedUser, task).then(_ => fetchUser())
	const onClickDelete = () => {
		deleteTask(task._id)
		loadTasks()
	}
	return (
		<Wrapper active={task.completed || loggedUser.currentTask?._id === task._id}>
			<Row gutter={16}>
				<Col onClick={onClickName} span={12}>
					<p>{task.name}.</p>
				</Col>
				<Col span={8}>
					<p>{task.pomodoros.current}poms</p>
				</Col>
				<Col span={2}>
					<div onClick={onClickDelete} className='centerer'>
						<img src={canIcon} alt='papelera' />
					</div>
				</Col>
			</Row>
		</Wrapper>
	)
}

export default TaskRow
