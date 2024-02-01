export const parseNumberToLocaleString = (value?: string): string => {
	if (!value) {
		return '0.00'
	}
	return Number(value).toLocaleString('en-US', {
		style: 'decimal',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2
	})
}

export const currencyToLocalString = (value?: number, currency?: string): string => {
	if (!value) {
		value = 0
	}
	return value.toLocaleString('en-US', {
		style: 'currency',
		currency: currency ?? 'USD'
	})
}

export const unitsLocaleString = (value?: number, unit: string = 'pound'): string => {
	if (!value) {
		value = 0
	}
	return value.toLocaleString('en-US', {
		style: 'unit',
		unit
	})
}

export const parseCurrencyToLocaleString = (value?: string, currency: string = 'USD'): string => {
	return Number(value).toLocaleString('en-US', {
		style: 'currency',
		currency
	})
}

export const parseUnitsLocaleString = (value?: string, unit: string = 'pound'): string => {
	return Number(value).toLocaleString('en-US', {
		style: 'unit',
		unit
	})
}
