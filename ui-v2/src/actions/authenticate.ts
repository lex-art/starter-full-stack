'use server'

import { signIn } from '@/auth'

export async function authenticate(formData: any) {
	try {
		await signIn('credentials', formData)
		return { success: true, message: 'login successful' }
	} catch (err: any) {
		if (err.type === 'CredentialsSignin') {
			return {
				error: {
					message: err?.message,
					code: err?.code,
					data: {}
				}
			}
		}
		return { error: { message: 'Failed to login', data: err } }
	}
}
