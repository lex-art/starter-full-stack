import {
	Column,
	Entity,
	Index,
	JoinColumn,
	OneToMany,
	OneToOne,
	PrimaryGeneratedColumn,
	Relation
} from 'typeorm'
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
	@OneToMany(() => AccountEntity, (account: AccountEntity) => account.user, {
		cascade: true,
		onDelete: 'CASCADE'
	})
	account!: Relation<AccountEntity[]>

	/*
	 * @JoinColumn must be set only on one side of the relation - the side that must have the foreign key in the database table.
	 */
	@OneToOne(() => ProfileEntity, {
		onDelete: 'CASCADE',
		cascade: true
	})
	@JoinColumn({
		name: 'profile_id'
	})
	profile!: Relation<ProfileEntity>
}
