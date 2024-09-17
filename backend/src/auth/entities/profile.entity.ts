import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { BaseEntityWithTimestamps } from '../../lib/entity/Base-entity'
import { UserEntity } from './user.entity'

// in DB, the table name is 'profiles'
@Entity('profiles')
// for a entity class, should be call in singular
export class ProfileEntity extends BaseEntityWithTimestamps {
	@PrimaryGeneratedColumn('identity', { generatedIdentity: 'ALWAYS', name: 'id_profile' })
	idProfile: number

	@OneToOne(() => UserEntity, (user) => user.profile, { nullable: false })
	@JoinColumn({ name: 'user' })
	user: UserEntity

	@Column({ type: 'varchar', name: 'first_name' })
	firstName: string

	@Column({ type: 'varchar', name: 'last_name' })
	lastName: string

	@Column({ type: 'varchar', nullable: true })
	phone: string

	@Column({ type: 'varchar', nullable: true, name: 'country_code' })
	countryCode?: string

	@Column({ type: 'varchar', nullable: true, name: 'country_calling_code' })
	countryCallingCode?: string

	@Column({
		type: 'date',
		name: 'birth_date'
	})
	birthDate: Date

	@Column({ type: 'varchar', length: 500 })
	address: string

	@Column({ type: 'varchar', length: 500, name: 'img_profile' })
	imgProfile: string
}
