import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'email_verification_codes' })
export class EmailVerificationCodeEntity extends BaseEntity {
	@PrimaryGeneratedColumn()
	idEmailVerificationCode: number

	@Column({
		length: 10
	})
	otp: string

	@Column()
	email: string

	@Column({ name: 'expires_at' })
	expiresAt: Date

	@CreateDateColumn({
		name: 'generated_at'
	})
	generatedAt: Date

	@Column({
		name: 'is_used',
		default: false
	})
	isUsed: boolean
}
