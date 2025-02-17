import { getLocale } from 'next-intl/server'
import { OTPVerification } from '../(components)/otp-verification'

export default async function VerifyAccountPage() {
	const locale = await getLocale()
	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<OTPVerification locale={locale} />
			</div>
		</div>
	)
}
