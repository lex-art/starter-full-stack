import { GetAllUserHandler } from './get-all-user.handler'
import { GetUserHandler } from './get-user.handler'

export const QueryUserHandler = [GetUserHandler, GetAllUserHandler]
