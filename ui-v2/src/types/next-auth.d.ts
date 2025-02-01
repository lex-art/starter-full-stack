// next-auth.d.ts
import 'next-auth'
import { IUser } from './Auth/user'
import { IProfile } from './Auth/profile'
import { IAuthMethod } from './Auth/auth-method'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    accessToken?: string | null
    refreshToken?: string | null
    user: IUser | null
    profile?: IProfile | null
    auth?: IAuthMethod | null
  }
  interface Session {
    accessToken?: string | null
    refreshToken?: string | null
    user: User | null
    profile?: IProfile | null
    auth?: IAuthMethod | null
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user?: IUser | null
    profile?: IProfile | null
    auth?: IAuthMethod| null
    accessToken?: string| null
  }
} 