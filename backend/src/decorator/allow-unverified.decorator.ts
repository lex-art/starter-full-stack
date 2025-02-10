import { SetMetadata } from '@nestjs/common'

export const ALLOW_UNVERIFIED = 'allow_unverified'
export const AllowUnverified = () => SetMetadata(ALLOW_UNVERIFIED, true)
