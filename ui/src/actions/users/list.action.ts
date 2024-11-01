'use server'
export async function listUsersAction<T>(): Promise<T | { message: string }> {
	try {
		const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/users')
		return response.json()
	} catch (error) {
		console.error('Error:', error)
		return { message: 'Unknown error' }
	}
}
