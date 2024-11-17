import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntityWithTimestamps } from '../../lib/entity/Base-entity'
import { AccountEntity } from './accounts.entity'

// in DB, the table name is 'users'
@Entity('users')
@Index('email', ['email'], { unique: true })
// for a entity class, should be call in singular
export class UserEntity extends BaseEntityWithTimestamps {
	@PrimaryGeneratedColumn('uuid', {
		name: 'user_id'
	})
	userId!: string

	@Column({
		length: 100,
		unique: true
	})
	email!: string

	@Column({ type: 'varchar' })
	password!: string

	@Column({
		name: 'username',
		type: 'varchar',
		nullable: true
	})
	username!: string

	@Column({ type: 'bool', default: false })
	verified!: boolean

	@Column({
		name: 'time_zone',
		type: 'varchar',
		nullable: true
	})
	timeZone?: string

	// add plural name for the relation if yo wan to use multiple accounts
	@OneToMany(() => AccountEntity, (account) => account.user, {
		cascade: true
		/* onDelete: 'CASCADE' */
	})
	account!: AccountEntity[]
}
