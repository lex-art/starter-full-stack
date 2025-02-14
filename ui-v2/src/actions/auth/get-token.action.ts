'use server'

import { cookies } from 'next/headers'

export default async function getTokenApi() {
	const cookie = await cookies()
	const token = cookie.get('next-auth.session-token')
	return token
}
