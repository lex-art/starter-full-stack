'use client'
import { font } from '@/lib/design-tokens'
import {
	Checkbox,
	FormControl,
	FormHelperText,
	InputLabel,
	Select,
	SelectProps,
	ThemeOptions,
	Typography
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { forwardRef, useState } from 'react'
import AppTypography from '../../DataDisplay/Typography/Typography'
import AppCircularLoader from '../../FeedBack/CircularLoader/CircularLoader'
import AppIcons from '../../Icons/Icons'
import AppMenuItem from '../../Menu/MenuItem'
import AppIconButton from '../IconButton/IconButton'

const AppDropdownTheme: ThemeOptions = {
	components: {
		MuiSelect: {
			defaultProps: {
				variant: 'outlined'
			},
			styleOverrides: {
				root: {
					'& .MuiSelect-select': {
						alignItems: 'center',
						display: 'flex'
					},
					'& .MuiSvgIcon-fontSizeMedium ': {
						fontSize: '4.5rem',
						margin: '0',
						padding: '0'
					},
					'& .MuiTypography-root': {
						textOverflow: 'ellipsis',
						overflow: 'hidden',
						whiteSpace: 'nowrap',
						maxWidth: '100%'
					}
				},
				icon: {
					height: '4.5rem',
					width: '4rem'
				}
			},
			variants: [
				{
					props: { variant: 'standard' },
					style: {
						'& .MuiSelect-select': {
							padding: '1.5rem 1rem'
						}
					}
				},
				{
					props: { size: 'small' },
					style: {
						top: '4%'
					}
				}
			]
		}
	}
}
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

const AppDropdown = forwardRef<HTMLSelectElement, AppDropDownProps & SelectProps>((props, ref) => {
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
		<FormControl fullWidth={!width} error={error} sx={{ width, my: 0.5 }}>
			<InputLabel
				id="App-select-label"
				sx={{
					'&.Mui-error': {
						top: '-1%'
					}
				}}
			>
				{label}
			</InputLabel>
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
								.map((item) => options.find((option) => option.value === item)?.name)
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
						<AppIconButton sx={{ right: 10 }} onClick={clearOption}>
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
						{multiple && Array.isArray(value) && <Checkbox checked={value.includes(item.value)} />}
						<Typography variant="inherit" fontSize={font.sizes.fontSizeLarge}>
							{item.name}
						</Typography>
					</AppMenuItem>
				))}
			</Select>
			<FormHelperText>{helperText}</FormHelperText>
		</FormControl>
	)
})

AppDropdown.displayName = 'App Box Dropdown'
export { AppDropdown, AppDropdownTheme }
export default AppDropdown
