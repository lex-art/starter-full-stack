'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import React, { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { simpleFormSchema } from './utils/validations/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { advancedValidationSchema } from './utils/validations/advancedSchema'
import AppStepper from '@/components/Stepper/Stepper'
import AppStep from '@/components/Stepper/Step'
import AppStepLabel from '@/components/Stepper/StepLabel'
import AppIcons from '@/components/Common/Icons/Icons'
import AppStepButton from '@/components/Stepper/StepButton'
import AppStepContent from '@/components/Stepper/StepContent'
import FormPart1 from './components/FormPar1'
import FormPart2 from './components/FormPart2'

type Schema = z.infer<typeof simpleFormSchema>
type AdvancedSchema = z.infer<typeof advancedValidationSchema>

export default function Forms() {
	const [activeStep, setActiveStep] = useState(0)
	const [completed, setCompleted] = useState<{
		[k: number]: boolean
	}>({})

	const method = useForm<Schema>({
		resolver: zodResolver(simpleFormSchema)
	})
	const { handleSubmit, control } = method
	const onSubmit = (data: Schema) => {
		console.log(data)
	}
	const methods2 = useForm<AdvancedSchema>({
		resolver: zodResolver(advancedValidationSchema)
	})
	const { handleSubmit: handleSubmit2 } = methods2

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}
	const handleStep = (step: number) => () => {
		setActiveStep(step)
	}
	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Form</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Example simple Form
					</AppTypography>
					<form onSubmit={handleSubmit(onSubmit)}>
						<AppFormGroup gridAreaTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))">
							<Controller
								control={control}
								name="email"
								render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
									<AppTextField
										label="Email"
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										error={!!error}
										helperText={error?.message}
									/>
								)}
							/>
							<Controller
								control={control}
								name="password"
								render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
									<AppTextField
										label="Password"
										value={value}
										onChange={onChange}
										onBlur={onBlur}
										error={!!error}
										helperText={error?.message}
									/>
								)}
							/>
							<AppButton
								sx={{
									gridColumn: {
										xs: 'span 2',
										sm: 'span 2',
										md: 'span 1'
									},
									justifySelf: {
										xs: 'center',
										sm: 'center',
										md: 'stretch'
									}
								}}
								type="submit"
							>
								Submit
							</AppButton>
						</AppFormGroup>
					</form>
				</AppPaper>
			</AppGrid>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography
					variant="subtitle2"
					sx={{
						whiteSpace: 'nowrap'
					}}
				>
					Advance forms
				</AppTypography>
			</AppDivider>
			<AppGrid container display="grid" gap="2rem">
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Example advance Form
					</AppTypography>
					<FormProvider {...methods2}>
						<form onSubmit={handleSubmit2((data) => console.log(data))}>
							<AppStepper alternativeLabel nonLinear activeStep={activeStep}>
								<AppStep>
									<AppStepLabel
										key={0}
										StepIconComponent={AppIcons.Add}
										StepIconProps={{
											active: activeStep === 0,
											completed: completed[0],
											icon: <AppIcons.Add color="primary" />
										}}
										/* StepIconProps={{
											classes: {
												active: 
											}
										}} */
									>
										Add Info
									</AppStepLabel>
									<AppStepContent>
										<FormPart1 />
										<AppButton onClick={handleNext}>Next</AppButton>
									</AppStepContent>
								</AppStep>
								<AppStep>
									<AppStepLabel
										key={1}
										StepIconComponent={AppIcons.Settings}
										StepIconProps={{
											active: activeStep === 1,
											completed: completed[1]
										}}
									>
										Step 2
									</AppStepLabel>
									<AppStepContent>
										<FormPart2 />
									</AppStepContent>
								</AppStep>
								<AppStep>
									<AppStepButton key={2} icon={<AppIcons.Send />} color="inherit" onClick={handleStep(2)}>
										Step 3
									</AppStepButton>
									<AppStepContent>
										<AppButton type="submit">Send Form</AppButton>
									</AppStepContent>
								</AppStep>
							</AppStepper>
						</form>
					</FormProvider>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
