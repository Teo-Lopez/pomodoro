import React, { useState, useCallback, useEffect } from 'react'
import TaskService from '../../../services/task.service'
import styled from 'styled-components'
import TaskForm from './TaskForm'
import { Col, Row } from 'antd'
import TaskRow from './TaskRow'
const taskService = new TaskService()

const Wrapper = styled.section`
	padding: 10%;

	ul {
		margin: 0;
		padding: 0;
	}

	.header {
		font-size: 0.8em;
		font-weight: 600;
	}

	li {
		list-style: none;
		p {
		}
	}
`

function Tasks({ loggedUser, fetchUser }) {
	const [tasks, setTasks] = useState(null)

	const loadTasks = useCallback(() => {
		taskService
			.getTasks({ owner: loggedUser._id })
			.then(({ data }) => {
				console.log(data)
				setTasks(data)
			})
			.catch(err => console.log(err))
	}, [loggedUser])

	useEffect(() => {
		loadTasks()
	}, [loadTasks])

	return (
		<Wrapper>
			<Row gutter={16}>
				<Col span={12}>
					<p className='header'>Nombre de la tarea.</p>
				</Col>
				<Col span={12}>
					<p className='header'>Poms completados.</p>
				</Col>
			</Row>
			<ul>
				{tasks?.map(
					e =>
						!e.completed && (
							<li key={e._id}>
								<TaskRow
									loadTasks={loadTasks}
									fetchUser={fetchUser}
									loggedUser={loggedUser}
									task={e}
								/>
							</li>
						)
				)}
			</ul>
			<ul>
				Completadas
				{tasks?.map(
					e =>
						e.completed && (
							<li key={e._id}>
								<TaskRow
									loadTasks={loadTasks}
									fetchUser={fetchUser}
									loggedUser={loggedUser}
									task={e}
								/>
							</li>
						)
				)}
			</ul>
			<TaskForm loadTasks={loadTasks} />
		</Wrapper>
	)
}

export default Tasks
