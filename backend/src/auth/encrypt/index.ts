import { ProfileSubscriber } from './profile.subscriber'
import { UserSubscriber } from './user.subscriber'

export const EncryptEntitiesSubscriber = [ProfileSubscriber, UserSubscriber]
