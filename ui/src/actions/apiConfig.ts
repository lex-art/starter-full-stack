'use server'

import { HTTP } from '@/lib/utilities/emuns'
import { cookies } from 'next/headers'

interface IApi {
	url: string
	method: HTTP
	body?: Record<string, any>
}

interface IResponse {
	status: number
	data: Record<string, any>
}

export default async function api({ url, method, body }: IApi): Promise<IResponse> {
	const cookie = cookies()
	const session = cookie.get('next-auth.session-token')
	const token = session?.value
	const baseUrl = process.env.NEXT_PUBLIC_API_URL

	const response = await fetch(`${baseUrl}${url}`, {
		method,
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(body)
	})

	const result = await response.json()
	return {
		status: response.status,
		data: result
	}
}
