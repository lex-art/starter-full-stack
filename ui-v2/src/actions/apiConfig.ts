import { auth, unstable_update } from '@/auth'
import { redirect } from '@/i18n/routing'
import { API_URLS } from '@/lib/emun'
import axios, { AxiosInstance } from 'axios'
import { JWT } from 'next-auth/jwt'
import { getLocale } from 'next-intl/server'
import { refreshAccessToken } from './auth/refreshToken.action'

interface IApi<T = any> {
	url: API_URLS | string
	body?: T | Record<string, any>
	params?: Record<string, any>
}

export interface IResponse<T = any> {
	message: string
	code: string
	error?:
		| {
				message: string
				code: string
		  }
		| Record<string, unknown>
		| string

	data?: T
	[key: string]:
		| T
		| string
		| number
		| boolean
		| Record<string, unknown>
		| undefined
}

class ApiService {
	private apiClient: AxiosInstance = axios.create()

	constructor() {
		this.getConfigApi()
	}

	getConfigApi() {
		const baseUrl =
			process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api'

		this.apiClient = axios.create({
			baseURL: baseUrl,
			timeout: 10000,
			headers: {
				'Content-Type': 'application/json'
			}
		})

		// Settings interceptors de request
		this.apiClient.interceptors.request.use(
			async (config) => {
				const session = await auth()
				if (session?.data?.accessToken) {
					config.headers.Authorization = `Bearer ${session?.data?.accessToken}`
				}
				return config
			},
			(error) => Promise.reject(new Error(error.message))
		)

		// Configurar interceptores de response para manejar errores 401 y refrescar el token
		this.apiClient.interceptors.response.use(
			(response) => response,
			async (error) => {
				const originalRequest = error.config
				const currentURL = originalRequest.url
				const excludeRefresh = [API_URLS.RESEND_OTP, API_URLS.VERIFY_USER]
				const UNAUTHORIZED_CODE = 401
				if (
					error.response?.status === UNAUTHORIZED_CODE &&
					!originalRequest._retry &&
					!excludeRefresh.includes(currentURL)
				) {
					originalRequest._retry = true
					const session = await auth()
					const token: JWT = {
						refreshToken: session?.data?.refreshToken ?? '',
						user: session?.data?.user
					}
					const refresh = await refreshAccessToken(token)

					if (refresh.accessToken && session?.data) {
						session.data.accessToken = refresh.accessToken
						// TODO: Follow next-auth@latest for unstable_update
						await unstable_update({
							...session,
							data: {
								...session.data,
								accessToken: refresh.accessToken
							}
						})
						originalRequest.headers.Authorization = `Bearer ${refresh.accessToken}`
						return this.apiClient(originalRequest)
					} else {
						console.error('Error: =>', refresh.error)
						//cookies().delete('next-auth.session-token')
						const locale = await getLocale()
						redirect({
							href: '/auth/login',
							locale
						})
					}
				}
				return Promise.reject(error)
			}
		)
	}

	private handleError(error: unknown): IResponse {
		if (axios.isAxiosError(error)) {
			return {
				message: error.response?.data?.message ?? 'Error desconocido',
				code: error.response?.data?.code ?? 'UNKNOWN_ERROR',
				status: error.response?.status,
				error: error.response?.data
			}
		}
		return {
			message: 'Error desconocido',
			code: '500',
			error: 'Error desconocido',
			data: {}
		}
	}

	async get<T>({ url, body, params }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.get(url, {
				data: body,
				params
			})
			return response.data
		} catch (error) {
			return this.handleError(error)
		}
	}

	async post<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.post(url, body)
			return response.data
		} catch (error) {
			return this.handleError(error)
		}
	}

	async put<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.put(url, body)
			return response.data
		} catch (error) {
			return this.handleError(error)
		}
	}

	async patch<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.patch(url, body)
			return response.data
		} catch (error) {
			return this.handleError(error)
		}
	}

	async delete<T>({ url, body }: IApi): Promise<IResponse<T>> {
		try {
			const response = await this.apiClient.delete(url, {
				data: body
			})
			return response.data
		} catch (error) {
			return this.handleError(error)
		}
	}
}

// Exportar una instancia de la clase para su uso
const apiConfig = new ApiService()
export default apiConfig
