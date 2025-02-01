import { BaseEntityWithTimestamps } from '@app/common/entity/Base-entity'
import { TYPE_VERIFICATION_TOKEN } from '@app/types/enums'
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

	@Column({
		type: 'enum',
		enum: TYPE_VERIFICATION_TOKEN
	})
	type: TYPE_VERIFICATION_TOKEN
}
