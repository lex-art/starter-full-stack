'use client'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import { signIn } from 'next-auth/react'
import React, { FormEventHandler } from 'react'

export default function Login() {
	const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault()
		const username = (event.target as HTMLFormElement)?.username.value
		const password = (event.target as HTMLFormElement)?.password.value

		const result = await signIn('credentials', {
			redirect: true, // Evita redirecciones automáticas
			username,
			password,
			callbackUrl: '/'
		})
		if (result?.error) {
			// Manejar errores, por ejemplo mostrando un mensaje al usuario
			console.error(result.error)
		}
	}

	return (
		<AppGrid container justifyContent="center" alignItems="center">
			<form onSubmit={handleSubmit}>
				<label htmlFor="username">Usuario:</label>
				<input type="text" id="username" name="username" required />

				<label htmlFor="password">Contraseña:</label>
				<input type="password" id="password" name="password" required />

				<button type="submit">Iniciar sesión</button>
			</form>
		</AppGrid>
	)
}
