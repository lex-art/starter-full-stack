'use client'
import getSessionClient from '@/actions/auth/get-session-client.action'
import { resendOtpAction } from '@/actions/auth/resend-otp.action'
import { signOut } from '@/auth'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { cn } from '@/lib/utils'
import { Session } from 'next-auth'
import { useTranslations } from 'next-intl'
import { useForm } from 'react-hook-form'

export function OTPVerification({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'> & { locale: string }) {
	const t = useTranslations()
	const { toast } = useToast()
	const form = useForm<{
		otp: string
	}>({
		defaultValues: {
			otp: ''
		}
	})
	const onSubmit = async () => {}

	const resendCode = async () => {
		const session: Session | null = await getSessionClient()

		if (session?.user?.email) {
			const response = await resendOtpAction(session.user.email)
			if (response.code === 'OTP_SENT') {
				toast({
					title: 'Success',
					description: t('common.otpSent'),
					variant: 'default'
				})
			} else {
				toast({
					title: 'Error',
					description: response.message,
					variant: 'destructive'
				})
			}
		} else {
			toast({
				title: 'Error',
				description: t('common.sessionsExpired'),
				variant: 'destructive'
			})
			await signOut()
		}
	}

	return (
		<div className={cn('flex flex-col gap-6', className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">{t('common.welcome')}</CardTitle>
					<CardDescription>{t('common.verifyAccount')}.</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="grid gap-6">
								<div className="grid gap-6">
									<div className="grid gap-2">
										<FormField
											control={form.control}
											name="otp"
											rules={{
												required: t('common.codeIsRequired')
											}}
											render={({ field }) => (
												<FormItem>
													<FormLabel>
														<Label htmlFor="code">
															{t('common.code')}
														</Label>
													</FormLabel>
													<FormControl>
														<Input
															id="code"
															type="text"
															placeholder={t('common.placeholderOtp')}
															{...field}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<Button type="submit" className="w-full">
										Verificar
									</Button>
								</div>
							</div>
						</form>
					</Form>
					<div className="text-center text-sm">
						{t('common.didNotReceiveCode')}{' '}
						<Button
							variant="link"
							onClick={resendCode}
							className="underline underline-offset-4"
						>
							{t('common.resendCode')}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
