import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntityWithTimestamps } from '../../common/entity/Base-entity'
import { AccountEntity } from './accounts.entity'
import { ProfileEntity } from './profile.entity'

// in DB, the table name is 'users'
@Entity('users')

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
	@Index({ unique: true })
	email!: string

	@Column({ type: 'varchar', nullable: true })
	password?: string

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
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE'
	})
	account!: AccountEntity[]

	@OneToOne(() => ProfileEntity, (profile) => profile.user, {
		cascade: ['insert', 'update'],
		onDelete: 'CASCADE'
	})
	@JoinColumn({
		name: 'profile_id'
	})
	profile!: ProfileEntity
}
