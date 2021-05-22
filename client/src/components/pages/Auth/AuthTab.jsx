import { Button } from 'antd'
import React, { useState } from 'react'
import LoginForm from './Login'
import styled from 'styled-components'
import SignupForm from './Signup'
const Wrapper = styled.section`
	padding: 10%;
`
function AuthTab({ setLoggedUser }) {
	const [login, setLogin] = useState(true)
	const toogle = () => setLogin(!login)
	return login ? (
		<Wrapper>
			<LoginForm onClick={toogle} setLoggedUser={setLoggedUser} />
			<Button onClick={toogle}>Registrate si no tienes una cuenta aún!</Button>
		</Wrapper>
	) : (
		<Wrapper>
			<SignupForm setLoggedUser={setLoggedUser} />
			<Button onClick={toogle}>Ya registrado? Haz Log in!</Button>
		</Wrapper>
	)
}

export default AuthTab
