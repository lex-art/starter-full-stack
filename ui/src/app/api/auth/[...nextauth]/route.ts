import configAuth from '@/app/api/auth/configAuth'
import NextAuth from 'next-auth'

const handler = NextAuth(configAuth)

export { handler as DELETE, handler as GET, handler as PATCH, handler as POST, handler as PUT }
