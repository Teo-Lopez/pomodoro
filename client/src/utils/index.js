import { useRef, useEffect } from 'react'

export const convertTimeToString = time => {
	const secs = Math.floor(time % 60)
		.toString()
		.padStart(2, '0')
	const minutes = Math.floor(time / 60)
		.toString()
		.padStart(2, '0')
	return minutes + ':' + secs
}

export function usePrevious(value) {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}
