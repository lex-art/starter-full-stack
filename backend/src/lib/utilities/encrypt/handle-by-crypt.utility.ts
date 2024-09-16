import * as bcrypt from 'bcrypt'

export const encrypt = async (pass: string) => {
	return await bcrypt.hash(pass, 10) // Todo <----- 10 genera un novil de encriptacion mas segura, mas alta, consume mas recursos
}

export const compare = async (pass: string, hashPass: string) => {
	return await bcrypt.compare(pass, hashPass)
}