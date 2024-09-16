import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntityWithTimestamps } from '../../lib/entity/Base-entity'
import { USER_PERMISSION, USER_ROLE, USER_TYPE } from '../../types/enums'

// in DB, the table name is 'users'
@Entity('users')
// for a entity class, should be call in singular
export class UserEntity extends BaseEntityWithTimestamps {
	@PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS', name: 'id_user' })
	idUser: number

	@Column({
		length: 100,
		unique: true
	})
	email: string

	@Column({ type: 'varchar' })
	password: string

	@Column({
		type: 'enum',
		enum: USER_ROLE,
		nullable: true
	})
	rol: USER_ROLE

	@Column({
		type: 'enum',
		enum: USER_TYPE,
		default: USER_TYPE.STANDARD
	})
	type: USER_TYPE

	@Column({
		type: 'simple-array',
		nullable: true
	})
	permissions: USER_PERMISSION[]

	@Column({
		name: 'user_name',
		type: 'varchar',
		nullable: true
	})
	userName?: string

	@Column({ type: 'bool', default: false })
	verified: boolean

	@Column({
		name: 'time_zone',
		type: 'varchar',
		nullable: true
	})
	timeZone?: string
}
