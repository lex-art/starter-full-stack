'use client'
import React from 'react'
import Stack from '@mui/material/Stack'
import { Gauge } from '@mui/x-charts/Gauge'

export default function AppGauges() {
	return (
		<Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 1, md: 3 }}>
			<Gauge width={200} height={200} value={60} />
			<Gauge width={200} height={200} value={60} startAngle={-90} endAngle={90} />
		</Stack>
	)
}
