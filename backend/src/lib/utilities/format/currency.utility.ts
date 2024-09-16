import { Currency, Unit } from 'src/types'

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

export const currencyToLocalString = (value?: number, currency?: Currency): string => {
	if (!value) {
		value = 0
	}
	return value.toLocaleString('en-US', {
		style: 'currency',
		currency: currency ?? 'USD'
	})
}

export const unitsLocaleString = (value?: number, unit?: Unit): string => {
	if (!value) {
		value = 0
	}
	return value.toLocaleString('en-US', {
		style: 'unit',
		unit
	})
}

export const parseCurrencyToLocaleString = (currency: Currency, value?: string): string => {
	return Number(value).toLocaleString('en-US', {
		style: 'currency',
		currency
	})
}

export const parseUnitsLocaleString = (value?: string, unit?: Unit): string => {
	return Number(value).toLocaleString('en-US', {
		style: 'unit',
		unit
	})
}
