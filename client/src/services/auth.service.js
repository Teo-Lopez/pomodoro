import axios from 'axios'

class AuthService {
	constructor() {
		this.baseURL = `${process.env.REACT_APP_API_URI}/api/auth/`
		this.service = axios.create({
			baseURL: this.baseURL,
			withCredentials: true,
			timeout: 1000 * 30,
			timeoutErrorMessage: 'El servidor ha tardado demasiado tiempo en responder'
		})
	}

	login({ email, password }) {
		return this.service.post('login', { email, password }) //add form
	}

	signup({ email, password }) {
		return this.service.post('signup', { email, password }) //add form
	}

	logout() {
		return this.service.post('logout')
	}

	editUser({ user, currentTask }) {
		return this.service.put('', { user, currentTask })
	}

	loggedin() {
		return this.service.get('loggedin')
	}
}

export default AuthService
