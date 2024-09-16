'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppFormGroup from '@/components/Common/FormControl/FormGroup'
import AppIcons from '@/components/Common/Icons/Icons'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppNumericField from '@/components/Common/Inputs/NumericField/NumericField'
import AppTextField from '@/components/Common/Inputs/TextField/TextField'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import AppStep from '@/components/Stepper/Step'
import AppStepButton from '@/components/Stepper/StepButton'
import AppStepContent from '@/components/Stepper/StepContent'
import AppStepLabel from '@/components/Stepper/StepLabel'
import AppStepper from '@/components/Stepper/Stepper'
import { zodResolver } from '@hookform/resolvers/zod'
import { StepIconProps } from '@mui/material'
import { useState } from 'react'
import { Controller, FormProvider, useFieldArray, useForm } from 'react-hook-form'
import { z } from 'zod'
import FormPart1 from './components/FormPar1'
import FormPart2 from './components/FormPart2'
import { advancedValidationSchema } from './utils/validations/advancedSchema'
import { arraySchema } from './utils/validations/arraySchema'
import { simpleFormSchema } from './utils/validations/schema'

type Schema = z.infer<typeof simpleFormSchema>
type AdvancedSchema = z.infer<typeof advancedValidationSchema>
type ArraySchema = z.infer<typeof arraySchema>

export default function Forms() {
	const [activeStep, setActiveStep] = useState(0)
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

	const methods3 = useForm<ArraySchema>({
		resolver: zodResolver(arraySchema),
		defaultValues: {
			fields: [
				{
					name: '',
					age: null,
					relationship: ''
				}
			]
		}
	})
	const { handleSubmit: handleSubmit3, control: control3 } = methods3
	const { fields, append, remove } = useFieldArray({
		control: control3,
		name: 'fields',
		rules: {
			validate: (value) => {
				if (value.length < 1) {
					return 'At least 1 field is required'
				}
				return true
			}
		}
	})
	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1)
	}

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1)
	}
	const handleStep = (step: number) => () => {
		setActiveStep(step)
	}

	const AddIcon = (props: StepIconProps) => {
		const { active, completed, className } = props
		if (completed) {
			return <AppIcons.CheckCircle color="success" className={className} />
		}
		return <AppIcons.Add className={className} color={active ? 'info' : 'inherit'} />
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
							<AppStepper alternativeLabel activeStep={activeStep} orientation="horizontal">
								<AppStep key="addKey">
									<AppStepLabel StepIconComponent={AddIcon}>Add Info</AppStepLabel>
									<AppStepContent currentStep={activeStep === 0}>
										<FormPart1 />
										<AppButton onClick={handleNext} color="secondary">
											Next
										</AppButton>
									</AppStepContent>
								</AppStep>

								<AppStep key="step2">
									<AppStepLabel
										StepIconComponent={(props: StepIconProps) => {
											const { active, completed, className } = props
											if (completed) {
												return <AppIcons.CheckCircle color="success" className={className} />
											}
											return <AppIcons.Settings className={className} color={active ? 'info' : 'inherit'} />
										}}
									>
										Step 2
									</AppStepLabel>
									<AppStepContent currentStep={activeStep === 1}>
										<FormPart2 />
										<AppButton onClick={handleNext}>Next</AppButton>
										<AppButton onClick={handleBack} color="secondary">
											Back
										</AppButton>
									</AppStepContent>
								</AppStep>
								<AppStep key="step3">
									<AppStepButton
										icon={<AppIcons.Send color={activeStep === 2 ? 'info' : 'inherit'} />}
										onClick={handleStep(2)}
									>
										Step 3
									</AppStepButton>
									<AppStepContent currentStep={activeStep === 2}>
										<AppButton type="submit">Send Form</AppButton>
										<AppButton onClick={handleBack} color="secondary">
											Back
										</AppButton>
									</AppStepContent>
								</AppStep>
							</AppStepper>
						</form>
					</FormProvider>
				</AppPaper>
			</AppGrid>
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography
					variant="subtitle2"
					sx={{
						whiteSpace: 'nowrap'
					}}
				>
					Array Field
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
						Array field
					</AppTypography>
					<form onSubmit={handleSubmit3((data) => console.log(data))}>
						<AppBox>
							{fields.map((item, index) => (
								<AppFormGroup key={item.id}>
									<Controller
										control={control3}
										name={`fields.${index}.name`}
										render={({ field, fieldState: { error } }) => (
											<AppTextField label="Name" {...field} error={!!error} helperText={error?.message} />
										)}
									/>
									<Controller
										control={control3}
										name={`fields.${index}.age`}
										render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
											<AppNumericField
												label="Age"
												value={value ? value.toString() : null}
												onChange={(values) => onChange(values.floatValue)}
												onBlur={onBlur}
												error={!!error}
												helperText={error?.message}
											/>
										)}
									/>
									<Controller
										control={control3}
										name={`fields.${index}.relationship`}
										render={({ field, fieldState: { error } }) => (
											<AppTextField
												label="Relationship"
												{...field}
												error={!!error}
												helperText={error?.message}
											/>
										)}
									/>
									<AppButton
										onClick={() => remove(index)}
										color="error"
										/* sx={{
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
										}} */
									>
										Remove
									</AppButton>
								</AppFormGroup>
							))}
							<AppFormGroup
								sx={{
									m: 3,
									gap: '1rem'
								}}
							>
								<AppButton
									onClick={() => append({ name: '', age: null, relationship: '' })}
									sx={{
										width: '50%',
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
								>
									Add
								</AppButton>
								<AppButton
									type="submit"
									color="info"
									sx={{
										width: '50%',
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
								>
									Submit
								</AppButton>
							</AppFormGroup>
						</AppBox>
					</form>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
