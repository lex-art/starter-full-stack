'use server'

import { auth } from '@/auth'

export default async function getSessionClient() {
	const session = await auth()
	return session
}
