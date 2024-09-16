export const passwordGenerator = (): string => {
	const character = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const length = 8
	let password: string = ''

	for (let i = 0; i < length; i++) {
		const randomChar = character.charAt(Math.floor(Math.random() * character.length))

		password += randomChar
	}
	return password
}
