'use client'
import {
	Checkbox,
	FormControl,
	Select,
	SelectProps,
	Typography
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { forwardRef, useState } from 'react'
import AppTypography from '../../DataDisplay/Typography/Typography'
import AppCircularLoader from '../../FeedBack/CircularLoader/CircularLoader'
import AppFormHelperText from '../../FormControl/FormHelpText'
import AppInputLabel from '../../FormControl/InputLabel'
import AppIcons from '../../Icons/Icons'
import AppMenuItem from '../../Menu/MenuItem'
import AppIconButton from '../IconButton/IconButton'

interface AppDropDownProps {
	options: Array<{
		value: string
		name: string
	}>
	helperText?: string
	clearable?: boolean
	width?: string | number
	pills?: boolean
	loading?: boolean
}

const AppDropdown = forwardRef<
	HTMLSelectElement,
	AppDropDownProps & SelectProps
>((props, ref) => {
	const t = useTranslations('common')
	const {
		placeholder,
		label,
		onChange,
		value,
		error,
		helperText,
		multiple,
		disabled,
		multiline,
		rows,
		clearable = false,
		width,
		pills,
		variant,
		options,
		size,
		autoWidth,
		loading
	} = props
	const [open, setOpen] = useState(false)
	const clearOption = () => {
		if (onChange) {
			onChange({ target: { value: '' } } as any, null)
		}
	}

	return (
		<FormControl fullWidth={!width} error={error} sx={{ width, mb: 0.5 }}>
			<AppInputLabel
				id="App-select-label"
				size={size === 'small' ? 'small' : 'normal'}
				sx={{
					...(size === 'small' && {
						top: '15%',
						'&.Mui-error': {
							top: '13%'
						}
					})
				}}
			>
				{label}
			</AppInputLabel>
			<Select
				ref={ref}
				labelId="App-select-label"
				id="App-select"
				value={value}
				label={label}
				placeholder={placeholder}
				onChange={onChange}
				error={error}
				multiple={multiple}
				disabled={disabled}
				displayEmpty={open}
				size={size}
				onOpen={() => {
					setOpen(true)
				}}
				onClose={() => {
					setOpen(false)
				}}
				multiline={multiline}
				rows={rows}
				sx={{
					borderRadius: pills ? '5rem' : undefined
				}}
				variant={variant}
				renderValue={(selected) =>
					multiple || Array.isArray(selected) ? (
						<Typography variant="inherit">
							{(selected as Array<string>)
								.map(
									(item) =>
										options.find((option) => option.value === item)?.name
								)
								.join(', ')}
						</Typography>
					) : (
						<Typography variant="inherit">
							{options.find((option) => option.value === selected)?.name}
						</Typography>
					)
				}
				startAdornment={
					clearable &&
					value !== '' && (
						<AppIconButton sx={{ right: 5 }} onClick={clearOption}>
							<AppIcons.CloseOutlined
								sx={{
									height: '1.8rem',
									width: '1.8rem'
								}}
							/>
						</AppIconButton>
					)
				}
				endAdornment={
					loading && (
						<AppCircularLoader
							size={20}
							width="auto"
							sxGrid={{
								mt: 1,
								mr: 3.5
							}}
						/>
					)
				}
				autoWidth={autoWidth}
			>
				<AppMenuItem value="" disabled>
					<AppTypography variant="inherit">
						{options.length === 0 ? t('noOptions') : placeholder}
					</AppTypography>
				</AppMenuItem>
				{options.map((item) => (
					<AppMenuItem key={item.name} value={item.value}>
						{multiple && Array.isArray(value) && (
							<Checkbox
								size="small"
								checked={value.includes(item.value)}
							/>
						)}
						<Typography variant="inherit">{item.name}</Typography>
					</AppMenuItem>
				))}
			</Select>
			<AppFormHelperText>{helperText}</AppFormHelperText>
		</FormControl>
	)
})

AppDropdown.displayName = 'App Box Dropdown'
export default AppDropdown
