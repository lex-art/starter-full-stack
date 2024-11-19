import { NotificationEmailOTPVerifyHandler } from './notification-email-otp-verify'
import { NotificationEmailUserHandler } from './notification-email-user-created.handler'
import { NotificationVerifyAccountHandler } from './notification-email-verify-account.handler'

export const EventsHandlers = [
	NotificationEmailUserHandler,
	NotificationVerifyAccountHandler,
	NotificationEmailOTPVerifyHandler
]
