import 'dotenv/config'
import { z } from 'zod'

interface Env {
	NODE_ENV: string
	DATABASE_HOST: string
	DATABASE_PORT: string
	DATABASE_USERNAME: string
	DATABASE_PASSWORD: string
	DATABASE_NAME: string
	DATABASE_SCHEMA: string
	JWT_SECRET: string
	JWT_REFRESH_SECRET: string
	JWT_EXPIRATION_IN: string
	JWT_EXPIRATION_FORGOT_PASS_TIME: string
	CRYPT_KEY: string
	CRYPT_KEY_16: string
	CRYPT_ALGORITHM: string
	EMAIL_HOST: string
	EMAIL_PORT: string
	EMAIL_SECURE: string
	EMAIL_USER: string
	EMAIL_PASSWORD: string
	JWT_EXPIRATION_TIME: string
	JWT_REFRESH_TOKEN_EXPIRATION_TIME: string
	AWS_BUCKET_NAME: string
	AWS_ACCESS_KEY_ID: string
	AWS_SECRET_ACCESS_KEY: string
	AWS_REGION: string
	AWS_ENDPOINT: string
	DESTINATION_PATH: string
	URL_FRONTEND: string
	FLAG_METHOD_VERIFY: string
	PORT: string
}

const envSchema = z.object({
	NODE_ENV: z.string().nonempty(),
	DATABASE_HOST: z.string().nonempty(),
	DATABASE_PORT: z.string().nonempty(),
	DATABASE_USERNAME: z.string().nonempty(),
	DATABASE_PASSWORD: z.string().nonempty(),
	DATABASE_NAME: z.string().nonempty(),
	DATABASE_SCHEMA: z.string().nonempty(),
	JWT_SECRET: z.string().nonempty(),
	JWT_REFRESH_SECRET: z.string().nonempty(),
	JWT_EXPIRATION_IN: z.string().nonempty(),
	JWT_EXPIRATION_FORGOT_PASS_TIME: z.string().nonempty(),
	CRYPT_KEY: z.string().nonempty(),
	CRYPT_KEY_16: z.string().nonempty(),
	CRYPT_ALGORITHM: z.string().nonempty(),
	EMAIL_HOST: z.string().nonempty(),
	EMAIL_PORT: z.string().nonempty(),
	EMAIL_SECURE: z.string().nonempty(),
	EMAIL_USER: z.string().nonempty(),
	EMAIL_PASSWORD: z.string().nonempty(),
	JWT_EXPIRATION_TIME: z.string().nonempty(),
	JWT_REFRESH_TOKEN_EXPIRATION_TIME: z.string().nonempty(),
	AWS_BUCKET_NAME: z.string().nonempty(),
	AWS_ACCESS_KEY_ID: z.string().nonempty(),
	AWS_SECRET_ACCESS_KEY: z.string().nonempty(),
	AWS_REGION: z.string().nonempty(),
	AWS_ENDPOINT: z.string().nonempty(),
	DESTINATION_PATH: z.string().nonempty(),
	URL_FRONTEND: z.string().nonempty(),
	FLAG_METHOD_VERIFY: z.string().nonempty(),
	PORT: z.string().nonempty()
})

const { error, data } = envSchema.safeParse(process.env)

if (error) {
	throw new Error(`Config validation error:  ${error.errors[0].message}`)
}

export const envs = data as Env
