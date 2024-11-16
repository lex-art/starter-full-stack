import { BaseEntityWithTimestamps } from '@app/lib/entity/Base-entity'
import { Type } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'verification_tokens' })
export class VerificationTokenEntity extends BaseEntityWithTimestamps {
	@PrimaryGeneratedColumn('uuid', {
		name: 'verification_token_id'
	})
	verificationTokenId!: string

	@Column()
	token!: string

	@Column()
	identifier!: string

	@Type(() => Date)
	@Column()
	expires!: Date

	@Column({ name: 'is_used', default: false })
	isUsed!: boolean
}
