import { BaseEntityWithTimestamps } from '@app/lib/entity/Base-entity'
import { TYPE_PROVIDER, USER_PERMISSION, USER_ROLE, USER_TYPE } from '@app/types/enums'
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProfileEntity } from './profile.entity'
import { UserEntity } from './user.entity'

@Entity({ name: 'accounts' })
export class AccountEntity extends BaseEntityWithTimestamps {
	@PrimaryGeneratedColumn('uuid', {
		name: 'account_id'
	})
	accountId!: string

	@Column({ type: 'uuid', name: 'user_id' })
	userId!: string

	@Column({ type: 'uuid', name: 'profile_id' })
	profileId!: string

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
		createForeignKeyConstraints: true
		/* onDelete: 'CASCADE' // Propaga el borrado desde la base de datos */
	})
	@JoinColumn({ name: 'user_id' })
	user!: UserEntity

	// this can be a one-to-one relationship if you want depending on your use case
	@OneToOne(
		() => ProfileEntity,
		(profileDto) => profileDto.account /* {
		cascade: true, // Propaga operaciones de persistencia y eliminación
		onDelete: 'CASCADE' // Borra el perfil al eliminar la cuenta
	} */
	)
	@JoinColumn({ name: 'profile_id' })
	profile!: ProfileEntity
}
