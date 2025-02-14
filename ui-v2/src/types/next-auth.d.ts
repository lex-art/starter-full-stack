// next-auth.d.ts
import 'next-auth'
import { IUser } from './Auth/user'
import { IProfile } from './Auth/profile'
import { IAuthMethod } from './Auth/auth-method'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface User {
    accessToken?: string;
    refreshToken?: string;
    user: IUser | null
    auth: IAuthMethod | null
    profile: IProfile | null
  }
  interface Session extends DefaultSession {
    data: User | null
    expires?: string | null
    user?: {
      userId?: string | null
      verified?: boolean | null
      isActive?: boolean | null
      email?: string | null
      username?: string | null
      timeZone?: string | null
    }
  }

  interface Profile extends IProfile {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User | null;
    accessToken?: string | null;
    refreshToken?: string | null; 
  }
}