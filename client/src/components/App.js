import 'antd/dist/antd.css'
import './App.css'
import { Tabs, Modal } from 'antd'
import Counter from './pages/Counter/Counter'
import Settings from './pages/Settings/Settings'
import { useState, useEffect } from 'react'
import CustomModal from './shared/Modal'
import Streak from './pages/Streak/Streak'
import TaskService from '../services/task.service'
import AuthService from '../services/auth.service'
const { TabPane } = Tabs

const taskService = new TaskService()
const authService = new AuthService()
function App() {
	const [loggedUser, setLoggedUser] = useState(undefined)
	const fetchUser = () => authService.loggedin().then(res => setLoggedUser(res.data))
	const [settings, setSettings] = useState({
		cycle: { long: 60 * 25, short: 60 * 5, current: 'long' }
	})
	const [streak, setStreak] = useState({ pomodoros: { completed: 0 }, totalTime: 0 })
	const [modal, setModal] = useState({ text: '', visible: false, children: null })

	const addPomodoro = () =>
		setStreak({
			pomodoros: { completed: streak.pomodoros.completed + 1 },
			totalTime: streak.totalTime + settings.cycle.long
		})
	const changeCycle = () =>
		updateSettings({ cycle: { current: settings.cycle.current === 'long' ? 'short' : 'long' } })

	const updateSettings = newSettings =>
		setSettings({ cycle: { ...settings.cycle, ...newSettings.cycle } })

	useEffect(() => {
		fetchUser()
	}, [])

	return (
		<>
			<Tabs onChange={e => console.log('changing', e)} type='card'>
				<TabPane tab='Counter' key='1'>
					<Counter
						setModal={setModal}
						startTime={
							settings.cycle.current === 'long' ? settings.cycle.long : settings.cycle.short
						}
						cycle={settings.cycle.current}
						changeCycle={changeCycle}
						addPomodoro={addPomodoro}
					/>
				</TabPane>
				<TabPane tab='Settings' key='2'>
					<Settings updateSettings={updateSettings} />
				</TabPane>
				<TabPane tab='Streak' key='3'>
					<Streak streak={streak} />
				</TabPane>
			</Tabs>
			<CustomModal text={modal.text} setModal={setModal} visible={modal.visible}>
				{modal.children}
			</CustomModal>
		</>
	)
}

export default App
