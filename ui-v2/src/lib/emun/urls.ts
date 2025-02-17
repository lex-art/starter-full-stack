export enum API_URLS {
	LOGIN = '/auth/login',
	LOGOUT = '/auth/logout',
	REGISTER = '/auth/register',
	RESEND_VERIFICATION = 'auth/resend-verification',
	FORGOT_PASSWORD = '/auth/forgot-password',
	RESET_PASSWORD = '/auth/reset-password',
	REFRESH_TOKEN = '/auth/refresh-token',
	USER = '/user',
	USER_GET = '/user/:email',
	USER_LIST = '/user/list'
}
