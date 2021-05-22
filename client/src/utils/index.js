import { useRef, useEffect } from 'react'

/**
 * Number formatter
 * @param {Number} time
 * @returns {String} A string with mm:ss format
 */
export const convertTimeToString = time => {
	const secs = Math.floor(time % 60)
		.toString()
		.padStart(2, '0')
	const minutes = Math.floor(time / 60)
		.toString()
		.padStart(2, '0')
	return minutes + ':' + secs
}

/**
 * Keeps a reference for a previous state value
 * @param {Any} value
 * @returns {Any} ref.current The previous value of the param.
 */
export function usePrevious(value) {
	const ref = useRef()
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}
