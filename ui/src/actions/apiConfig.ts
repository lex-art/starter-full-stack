'use server'

import { API_URLS } from '@/lib/utilities/emun'
import axios, { AxiosInstance } from 'axios'
import { cookies } from 'next/headers'

interface IApi<T = any> {
	url: API_URLS
	body?: T | Record<string, any>
}

interface IResponse<T = any> {
	status: number
	data: T | Record<string, any>
	error?: Record<string, any> | string
	code?: string
}

class ApiService {
	private apiClient: AxiosInstance

	constructor() {
		const cookie = cookies()
		const session = cookie.get('next-auth.session-token')
		const token = session?.value
		const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

		this.apiClient = axios.create({
			baseURL: baseUrl,
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// Configurar interceptores de request
		this.apiClient.interceptors.request.use(
			(config) => {
				if (token) {
					config.headers.Au = `Bearer ${token}`
				}
				return config
			},
			(error) => Promise.reject(error)
		)
	}

	private handleError(error: unknown): IResponse {
		if (axios.isAxiosError(error)) {
			return {
				status: error.response?.status || 500,
				error: error.response?.data || 'Error desconocido',
				data: error.response?.data
			}
		}
		return { status: 500, error: error as string, data: {} }
	}

	async get<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.get(url, { data: body })
			return { status: response.status, data: response.data }
		} catch (error) {
			return this.handleError(error)
		}
	}

	async post<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.post(url, body)
			return { status: response.status, data: response.data }
		} catch (error) {
			return this.handleError(error)
		}
	}

	async put<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.put(url, body)
			return { status: response.status, data: response.data }
		} catch (error) {
			return this.handleError(error)
		}
	}

	async patch<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.patch(url, body)
			return { status: response.status, data: response.data }
		} catch (error) {
			return this.handleError(error)
		}
	}

	async delete<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.delete(url, { data: body })
			return { status: response.status, data: response.data }
		} catch (error) {
			return this.handleError(error)
		}
	}
}

// Exportar una instancia de la clase para su uso
const apiConfig = new ApiService()
export default apiConfig
