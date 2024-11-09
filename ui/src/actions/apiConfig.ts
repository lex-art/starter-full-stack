import { API_URLS } from '@/lib/utilities/emun'
import { IUser } from '@/types'
import axios, { AxiosInstance } from 'axios'
import { decode, encode, JWT } from 'next-auth/jwt'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { refreshAccessToken } from './auth/refreshToken.action'

interface IApi<T = any> {
	url: API_URLS | string
	body?: T | Record<string, any>
	params?: Record<string, any>
}

interface User extends IUser {
	accessToken?: string
	refreshToken?: string
}
interface DataToken {
	user: User | null
	accessToken?: string | null
	refreshToken?: string | null
	expires?: string | null
}
export interface IResponse<T = any> {
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
		const tokenNext = session?.value

		const baseUrl =
			process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

		this.apiClient = axios.create({
			baseURL: baseUrl,
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// Configurar interceptores de request
		this.apiClient.interceptors.request.use(
			async (config) => {
				const data = (await decode({
					token: tokenNext,
					secret: process.env.NEXTAUTH_SECRET ?? ''
				})) as unknown as DataToken
				if (data.accessToken) {
					config.headers.Authorization = `Bearer ${data.accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error)
		)

		// Configurar interceptores de response para manejar errores 401 y refrescar el token
		this.apiClient.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config
				if (error.response?.status === 401 && !originalRequest._retry) {
					originalRequest._retry = true
					const data = (await decode({
						token: tokenNext,
						secret: process.env.NEXTAUTH_SECRET ?? ''
					})) as unknown as DataToken
					const dataToken: JWT = {
						refreshToken: data.refreshToken ?? ''
					}
					const refresh = await refreshAccessToken(dataToken)

					if (refresh.accessToken) {
						data.accessToken = refresh.accessToken
						cookies().set(
							'next-auth.session-token',
							await encode({
								token: data as unknown as JWT,
								secret: process.env.NEXTAUTH_SECRET ?? ''
							})
						)
						originalRequest.headers.Authorization = `Bearer ${refresh.accessToken}`
						return this.apiClient(originalRequest)
					} else {
						console.error('Error:', refresh.error)
						cookies().delete('next-auth.session-token')
						redirect('/auth/login')
					}
				}
				return Promise.reject(error)
			}
		)
	}

	private handleError(error: unknown): IResponse {
		if (axios.isAxiosError(error)) {
			return {
				status: error.response?.status || 500,
				error: error.response?.data || 'Error desconocido',
				data: {}
			}
		}
		return { status: 500, error: error as string, data: {} }
	}

	async get<T>({ url, body, params }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.get(url, {
				data: body,
				params
			})
			return {
				status: response?.status,
				data: response?.data
			}
		} catch (error) {
			return this.handleError(error)
		}
	}

	async post<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.post(url, body)
			return {
				status: response?.status,
				data: response?.data
			}
		} catch (error) {
			return this.handleError(error)
		}
	}

	async put<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.put(url, body)
			return {
				status: response?.status,
				data: response?.data
			}
		} catch (error) {
			return this.handleError(error)
		}
	}

	async patch<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.patch(url, body)
			return {
				status: response?.status,
				data: response?.data
			}
		} catch (error) {
			return this.handleError(error)
		}
	}

	async delete<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.delete(url, {
				data: body
			})
			return {
				status: response?.status,
				data: response?.data?.data
			}
		} catch (error) {
			return this.handleError(error)
		}
	}
}

// Exportar una instancia de la clase para su uso
const apiConfig = new ApiService()
export default apiConfig
