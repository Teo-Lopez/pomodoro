import 'antd/dist/antd.css'
import './App.css'
import { Tabs } from 'antd'
import Counter from './pages/Counter/Counter'
import Settings from './pages/Settings/Settings'

function App() {
	const { TabPane } = Tabs
	return (
		<Tabs onChange={e => console.log('changing', e)} type='card'>
			<TabPane tab='Counter' key='1'>
				<Counter startTime={10} />
			</TabPane>
			<TabPane tab='Settings' key='2'>
				<Settings />
			</TabPane>
			<TabPane tab='Tasks' key='3'>
				Content of Tab Pane 3
			</TabPane>
		</Tabs>
	)
}

export default App
