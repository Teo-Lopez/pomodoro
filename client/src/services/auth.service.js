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

	login({ username, email, password }) {
		return this.service.post('login', { username, email, password }) //add form
	}

	signup({ username, email, password }) {
		return this.service.post('signup', { username, email, password }) //add form
	}

	logout() {
		return this.service.post('logout')
	}

	loggedin() {
		return this.service.get('loggedin')
	}
}

export default AuthService
