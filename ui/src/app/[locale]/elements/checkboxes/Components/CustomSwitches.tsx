'use client'
import AppCheckbox from '@/components/Common/CheckBox/AppCheckBox'
import AppBox from '@/components/Common/Containers/Box'
import AppSwitch from '@/components/Common/Switch/Switch'
import AppTypography from '@/components/Common/Typography/Typography'
import { Stack, Switch, styled } from '@mui/material'
import React, { ChangeEvent, useState } from 'react'

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 62,
	height: 34,
	padding: 7,
	'& .MuiSwitch-switchBase': {
		margin: 1,
		padding: 0,
		transform: 'translateX(6px)',
		'&.Mui-checked': {
			color: '#fff',
			transform: 'translateX(22px)',
			'& .MuiSwitch-thumb:before': {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
					'#fff'
				)}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
			},
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
			}
		}
	},
	'& .MuiSwitch-thumb': {
		backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
		width: 32,
		height: 32,
		'&::before': {
			content: "''",
			position: 'absolute',
			width: '100%',
			height: '100%',
			left: 0,
			top: 0,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: 'center',
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
				'#fff'
			)}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
		}
	},
	'& .MuiSwitch-track': {
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
		borderRadius: 20 / 2
	}
}))

const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 28,
	height: 16,
	padding: 0,
	display: 'flex',
	'&:active': {
		'& .MuiSwitch-thumb': {
			width: 15
		},
		'& .MuiSwitch-switchBase.Mui-checked': {
			transform: 'translateX(9px)'
		}
	},
	'& .MuiSwitch-switchBase': {
		padding: 2,
		'&.Mui-checked': {
			transform: 'translateX(12px)',
			color: '#fff',
			'& + .MuiSwitch-track': {
				opacity: 1,
				backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff'
			}
		}
	},
	'& .MuiSwitch-thumb': {
		boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: theme.transitions.create(['width'], {
			duration: 200
		})
	},
	'& .MuiSwitch-track': {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
		boxSizing: 'border-box'
	}
}))

export default function CustomSwitches() {
	const [value, setValue] = useState(true)

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setValue(event.target.checked)
	}

	const [checked, setChecked] = useState([true, false])

	const handleChange1 = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked([event.target.checked, event.target.checked])
	}

	const handleChange2 = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked([event.target.checked, checked[1]])
	}

	const handleChange3 = (event: ChangeEvent<HTMLInputElement>) => {
		setChecked([checked[0], event.target.checked])
	}

	return (
		<>
			<AppSwitch label="Switch" checked={value} onChange={handleChange} />
			<AppSwitch label="Switch custom" CustomSwitch={MaterialUISwitch} />
			<Stack direction="row" spacing={1} alignItems="center">
				<AppTypography>Off</AppTypography>
				<AppSwitch CustomSwitch={AntSwitch} />
				<AppTypography>On</AppTypography>
			</Stack>
			<AppBox>
				<AppCheckbox
					label="Parent"
					checked={checked[0] && checked[1]}
					indeterminate={checked[0] !== checked[1]}
					onChange={handleChange1}
				/>
				<AppBox sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
					<AppSwitch label="Child 1" checked={checked[0]} onChange={handleChange2} />
					<AppSwitch label="Child 2" checked={checked[1]} onChange={handleChange3} />
				</AppBox>
			</AppBox>
		</>
	)
}
