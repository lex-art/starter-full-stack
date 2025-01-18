import { matchIsValidTel } from 'mui-tel-input'
import { ERRORS } from './errors'

export const FORM_RULES = {
	required: {
		value: true,
		message: ERRORS.requiredField
	},
	minLength: {
		value: 8,
		message: 'common:weakPass'
	},
	patternEmail: {
		value: new RegExp(/^[^@]+@\w+([.-]?\w+)*(\.\w\w+)+$/),
		message: 'common:invalidEmail'
	},
	validateNumber: (value: number) => value > 0 || ERRORS.requiredField,
	validatePhone: (value: any) =>
		value?.replace(/^\+\d+\s?/, '')?.length > 0
			? matchIsValidTel(value) || ERRORS.phoneNotValid
			: ERRORS.requiredField,
	validateOptionaPhone: (value: any) =>
		value?.replace(/^\+\d+\s?/, '')?.length > 0 ? matchIsValidTel(value) || ERRORS.phoneNotValid : true
}
