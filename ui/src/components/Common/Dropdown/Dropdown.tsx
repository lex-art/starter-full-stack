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
import { forwardRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import AppIconButton from '../IconButton/IconButton'
import AppIcons from '../Icons/Icons'
import AppMenuItem from '../Menu/MenuItem'
import AppTypography from '../Typography/Typography'
import { font } from '@/lib/design-tokens'

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
					color: 'black',
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
			}
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
}

const AppDropdown = forwardRef<HTMLSelectElement, AppDropDownProps & SelectProps>((props, ref) => {
	const t = useTranslations('common')
	const {
		options,
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
		width
	} = props
	const [open, setOpen] = useState(false)
	const clearOption = () => {
		if (onChange) {
			onChange({ target: { value: '' } } as any, null)
		}
	}

	return (
		<FormControl fullWidth={!width} error={error} sx={{ width }}>
			<InputLabel
				id="TKB-select-label"
				sx={{
					'&.Mui-error': {
						top: '-9%'
					}
				}}
			>
				{label}
			</InputLabel>
			<Select
				ref={ref}
				labelId="TKB-select-label"
				id="TKB-select"
				value={value}
				label={label}
				placeholder={placeholder}
				onChange={onChange}
				error={error}
				multiple={multiple}
				disabled={disabled}
				displayEmpty={open}
				onOpen={() => {
					setOpen(true)
				}}
				onClose={() => {
					setOpen(false)
				}}
				multiline={multiline}
				rows={rows}
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
							<AppIcons.CloseOutlined />
						</AppIconButton>
					)
				}
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

AppDropdown.displayName = 'Tikal Box Dropdown'
export { AppDropdown, AppDropdownTheme }
export default AppDropdown
