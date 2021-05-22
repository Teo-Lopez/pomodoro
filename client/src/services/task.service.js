import axios from 'axios'

class TaskService {
	constructor() {
		this.service = axios.create({
			baseURL: `${process.env.REACT_APP_API_URI}/api/`,
			withCredentials: true
		})
	}

	getTasks(query) {
		let string = 'task?'
		for (let key in query) {
			string += `${key}=${query[key]}`
		}

		return this.service.get(string)
	}

	getTaskById(id) {
		return this.service.get(`task/${id}`)
	}

	editTask(task) {
		return this.service.put(`task/${task._id}`, task)
	}

	createTask(task) {
		return this.service.post('task', task)
	}

	deleteTask(id) {
		return this.service.delete(`task/${id}`)
	}
}

export default TaskService
