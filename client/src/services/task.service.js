import axios from 'axios'

class TaskService {
	constructor() {
		this.service = axios.create({
			baseURL: `${process.env.REACT_APP_API}/api/task`,
			withCredentials: true
		})
	}

	getTasks() {
		return this.service.get('')
	}

	getTaskById(id) {
		return this.service.get(id)
	}

	editTask(task) {
		return this.service.put(task._id, task)
	}

	createTask(task) {
		return this.service.post(task)
	}

	deleteTask(id) {
		return this.service.delete(id)
	}
}

export default TaskService
