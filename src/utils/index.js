export const convertTimeToString = time => {
	const secs = Math.floor(time % 60)
		.toString()
		.padStart(2, '0')
	const minutes = Math.floor(time / 60)
		.toString()
		.padStart(2, '0')

    return minutes+":"+secs
}
