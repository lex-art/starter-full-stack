import configAuth from '@/app/api/auth/configAuth'
import NextAuth from 'next-auth'

const handler = NextAuth(configAuth)

export { handler as GET, handler as POST }
