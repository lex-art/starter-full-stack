import { BaseEntityWithTimestamps } from '@app/common/entity/Base-entity'
import { TYPE_PROVIDER, USER_PERMISSION, USER_ROLE, USER_TYPE } from '@app/types/enums'
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'

@Entity({ name: 'accounts' })
@Index(['provider', 'providerAccountId'], { unique: true })
export class AccountEntity extends BaseEntityWithTimestamps {
	@PrimaryGeneratedColumn('uuid', {
		name: 'account_id'
	})
	accountId!: string

	@Column({
		type: 'enum',
		enum: TYPE_PROVIDER
	}) // for example: 'google', 'facebook', 'email', 'email provider'. 'local'
	provider!: string

	@Column({
		nullable: true,
		name: 'provider_user_id'
	})
	providerAccountId!: string

	@Column({ type: 'varchar', nullable: true, name: 'access_type' })
	token_type!: string | null

	@Column({
		type: 'enum',
		enum: USER_ROLE,
		nullable: true
	})
	role: USER_ROLE

	@Column({
		type: 'enum',
		enum: USER_TYPE,
		default: USER_TYPE.STANDARD
	})
	type!: USER_TYPE

	@Column({
		type: 'enum',
		enum: USER_PERMISSION,
		array: true,
		default: [USER_PERMISSION.ALL]
	})
	permissions!: USER_PERMISSION[]

	@ManyToOne(() => UserEntity, (user) => user.account, {
		createForeignKeyConstraints: true,
		onDelete: 'CASCADE' // Propaga el borrado desde la base de datos
	})
	@JoinColumn({ name: 'user_id' })
	user!: UserEntity
}
