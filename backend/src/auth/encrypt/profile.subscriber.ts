import { CryptoUtility } from '@app/lib/utilities'
import { EntityProperties } from '@app/lib/utilities/common'
import { Logger } from '@nestjs/common'
import {
	DataSource,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	LoadEvent,
	UpdateEvent
} from 'typeorm'
import { ProfileEntity } from '../entities'
import { AuthException } from '../exceptions'

@EventSubscriber()
export class ProfileSubscriber implements EntitySubscriberInterface<ProfileEntity> {
	private readonly logger = new Logger(ProfileSubscriber.name)
	private readonly fieldsToEncrypt: Array<keyof EntityProperties<ProfileEntity>> = []

	constructor(
		readonly _dataSource: DataSource,
		private readonly _crypto: CryptoUtility
	) {
		this._dataSource.subscribers.push(this)
		this.fieldsToEncrypt = [
			'firstName',
			'lastName',
			'phone',
			'countryCode',
			'countryCallingCode',
			'address'
		]
	}

	listenTo() {
		return ProfileEntity
	}

	async afterLoad(entity: ProfileEntity, event?: LoadEvent<ProfileEntity>): Promise<ProfileEntity | void> {
		this.logger.debug(`After load event on entity ${entity.constructor.name}`)
		try {
			event.entity = await this._crypto.decryptEntityData<ProfileEntity>(entity, this.fieldsToEncrypt)
		} catch (error) {
			this.logger.error(`Error after load event on entity ${entity.constructor.name}`, error)
		}
	}

	async beforeInsert(event: InsertEvent<ProfileEntity>) {
		this.logger.debug(`Before insert event on entity ${event.entity.constructor.name}`)
		try {
			event.entity = await this._crypto.encryptEntityData<ProfileEntity>(
				event.entity,
				this.fieldsToEncrypt
			)
		} catch (error) {
			this.logger.error(`Error before insert event on entity ${event.entity.constructor.name}`, error)
			throw new AuthException('Error encrypting data', 'ERROR_ENCRYPTING_DATA')
		}
	}

	async beforeUpdate(event: UpdateEvent<ProfileEntity>) {
		this.logger.debug(`Before update event on entity ${event.entity.constructor.name}`)
		try {
			event.entity = await this._crypto.encryptEntityData<Record<string, any>>(
				event.entity,
				this.fieldsToEncrypt
			)
		} catch (error) {
			this.logger.error(`Error before update event on entity ${event.entity.constructor.name}`, error)
			throw new AuthException('Error encrypting data', 'ERROR_ENCRYPTING_DATA')
		}
	}

	async afterInsert(event: InsertEvent<ProfileEntity>) {
		this.logger.debug(`After insert event on entity ${event.entity.constructor.name}`)
		try {
			event.entity = await this._crypto.decryptEntityData<ProfileEntity>(
				event.entity,
				this.fieldsToEncrypt
			)
		} catch (error) {
			this.logger.error(`Error after insert event on entity ${event.entity.constructor.name}`, error)
		}
	}
}
