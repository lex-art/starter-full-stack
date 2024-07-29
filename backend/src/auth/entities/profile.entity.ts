import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { UserEntity } from './user.entity'


@Entity('profiles')
export class ProfilesEntity extends BaseEntity {
	@PrimaryGeneratedColumn('increment', { name: 'id_profile' })
	idProfile: number

	@OneToOne(() => UserEntity, (user) => user.email, { nullable: false })
	@JoinColumn({ name: 'user' })
	user: UserEntity

	@Column({ type: 'varchar', length: 50, name: 'first_name' })
	firstName: string

	@Column({ type: 'varchar', length: 50, name: 'last_name' })
	lastName: string

	@Column({ type: 'varchar', length: 15, nullable: true })
	phone: string

	@Column({ type: 'varchar', length: 3, nullable: true, name: 'country_code' })
	countryCode?: string

	@Column({ type: 'varchar', length: 5, nullable: true, name: 'country_calling_code' })
	countryCallingCode?: string

	@Column({
		type: 'datetime',
		name: 'birth_date'
	})
	birthDate: Date

    @Column({ type: 'varchar', length: 100 })
    address: string

    @Column({ type: 'varchar', length: 100, name: 'img_profile' })
    imgProfile: string
}