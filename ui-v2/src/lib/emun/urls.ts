export enum API_URLS {
	LOGIN = '/auth/login',
	LOGOUT = '/auth/logout',
	REGISTER = '/auth/register',
	RESEND_VERIFICATION = 'auth/resend-verification',
	VERIFY_USER = '/auth/verify-otp',
	FORGOT_PASSWORD = '/auth/forgot-password',
	RESET_PASSWORD = '/auth/reset-password',
	REFRESH_TOKEN = '/auth/refresh-token',
	RESEND_OTP = '/auth/resend-otp',
	USER = '/user',
	USER_GET = '/user/:email',
	USER_LIST = '/user/list'
}
