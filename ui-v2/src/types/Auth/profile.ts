export interface IProfile {
	// ProfileDto properties
	id: string
	firstName: string
	lastName?: string
	birthDate: Date
	phone: string
	address: string
	image?: string
	countryCode?: string
	countryCallingCode?: string
}
