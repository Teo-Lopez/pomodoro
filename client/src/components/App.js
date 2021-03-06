import 'antd/dist/antd.css'
import './App.css'
import { Tabs } from 'antd'
import Counter from './pages/Counter/Counter'
import Settings from './pages/Settings/Settings'
import { useState, useEffect } from 'react'
import CustomModal from './shared/Modal'
import Streak from './pages/Streak/Streak'
import AuthService from '../services/auth.service'
import TaskService from '../services/task.service'

import Tasks from './pages/Tasks/Tasks'
import AuthTab from './pages/Auth/AuthTab'
const { TabPane } = Tabs

const authService = new AuthService()
const taskService = new TaskService()

function App() {
	const [loggedUser, setLoggedUser] = useState(undefined)
	const [settings, setSettings] = useState({
		cycle: { long: 60 * 25, short: 60 * 5, current: 'long' }
	})
	const [streak, setStreak] = useState({ pomodoros: { completed: 0 }, totalTime: 0 })
	const [modal, setModal] = useState({ text: '', visible: false, children: null })

	const fetchUser = () => authService.loggedin().then(res => setLoggedUser(res.data))
	const updateSettings = newSettings =>
		setSettings({ cycle: { ...settings.cycle, ...newSettings.cycle } })
	const changeCycle = () =>
		updateSettings({ cycle: { current: settings.cycle.current === 'long' ? 'short' : 'long' } })
	//**adds up streak when cycle is completed */
	const addPomodoro = () => {
		setStreak({
			pomodoros: { completed: streak.pomodoros.completed + 1 },
			totalTime: streak.totalTime + settings.cycle.long
		})
		addPomToTask(loggedUser.currentTask).then(_ => fetchUser())
	}
	const addPomToTask = task => {
		if (++task.pomodoros.current === task.pomodoros.total) {
			task.completed = true
		}
		return taskService.editTask(task)
	}

	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<>
			<Tabs onChange={e => console.log('changing', e)} type='card'>
				<TabPane tab='Counter' key='1'>
					<Counter
						loggedUser={loggedUser}
						setModal={setModal}
						startTime={
							settings.cycle.current === 'long' ? settings.cycle.long : settings.cycle.short
						}
						cycle={settings.cycle.current}
						changeCycle={changeCycle}
						addPomodoro={addPomodoro}
					/>
				</TabPane>
				<TabPane tab='Streak' key='3'>
					<Streak streak={streak} />
				</TabPane>
				<TabPane tab='Settings' key='2'>
					<Settings updateSettings={updateSettings} />
				</TabPane>
				{!loggedUser ? (
					<TabPane tab='Login/Signup' key='4'>
						<AuthTab setLoggedUser={setLoggedUser} />
					</TabPane>
				) : (
					<TabPane tab='Tasks' key='4'>
						<Tasks fetchUser={fetchUser} loggedUser={loggedUser} />
					</TabPane>
				)}
			</Tabs>
			<CustomModal text={modal.text} setModal={setModal} visible={modal.visible}>
				{modal.children}
			</CustomModal>
		</>
	)
}

export default App
