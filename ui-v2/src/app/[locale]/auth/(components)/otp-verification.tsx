'use client'
import getSessionClient from '@/actions/auth/get-session-client.action'
import { resendOtpAction } from '@/actions/auth/resend-otp.action'
import { verifyUserAction } from '@/actions/auth/verify-user.action'
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
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useTransition } from 'react'
import { useForm } from 'react-hook-form'

export function OTPVerification({
	className,
	...props
}: React.ComponentPropsWithoutRef<'div'> & { locale: string }) {
	const t = useTranslations()
	const { toast } = useToast()
	const [isLoading, transaction] = useTransition()
	const form = useForm<{
		otp: string
	}>({
		defaultValues: {
			otp: ''
		}
	})
	const onSubmit = async ({ otp }: { otp: string }) => {
		const session: Session | null = await getSessionClient()
		const email = session?.user?.email
		if (email) {
			transaction(async () => {
				const response = await verifyUserAction(email, otp)
				if (response.code === 'OTP_VERIFIED') {
					toast({
						title: 'Success',
						description: t('common.accountVerified'),
						variant: 'default'
					})
				} else {
					toast({
						title: response.code ?? 'Error',
						description: response.message,
						variant: 'destructive'
					})
				}
			})
		} else {
			toast({
				title: 'Error',
				description: t('common.sessionsExpired'),
				variant: 'destructive'
			})
			return signOut({
				redirectTo: '/auth/login'
			})
		}
	}

	const resendCode = async () => {
		transaction(async () => {
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
						title: response.code ?? 'Error',
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
				return signOut({
					redirectTo: '/auth/login'
				})
			}
		})
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
												required: t('common.codeIsRequired'),
												maxLength: {
													value: 6,
													message: t('common.codeMustBe6Digits')
												},
												minLength: {
													value: 6,
													message: t('common.codeMustBe6Digits')
												}
											}}
											render={({ field: { onChange, ...rest } }) => (
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
															maxLength={6}
															placeholder={t('common.placeholderOtp')}
															onPaste={(event) => {
																event.preventDefault()
																const data = event.clipboardData
																	.getData('text/plain')
																	.replace(/\s/g, '')
																onChange(data)
															}}
															onChange={(
																value: ChangeEvent<HTMLInputElement>
															) => {
																value.target.value =
																	value.target.value.replace(/\s/g, '')
																onChange(value)
															}}
															{...rest}
														/>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
									<Button
										type="submit"
										className="w-full"
										isLoading={isLoading}
									>
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
							isLoading={isLoading}
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
