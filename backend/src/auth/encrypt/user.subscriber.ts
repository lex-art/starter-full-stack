import { CryptoUtility, EntityProperties } from '@app/lib/utilities'
import { Logger } from '@nestjs/common'
import {
	DataSource,
	EntitySubscriberInterface,
	EventSubscriber,
	InsertEvent,
	LoadEvent,
	UpdateEvent
} from 'typeorm'
import { UserEntity } from '../entities'
import { AuthException } from '../exceptions'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<UserEntity> {
	private readonly logger = new Logger(UserSubscriber.name)
	private readonly fieldsToEncrypt: Array<keyof EntityProperties<UserEntity>> = []

	constructor(
		readonly _dataSource: DataSource,
		private readonly _crypto: CryptoUtility
	) {
		this._dataSource.subscribers.push(this)
		this.fieldsToEncrypt = ['username']
	}

	listenTo() {
		return UserEntity
	}

	async afterLoad(entity: UserEntity, event?: LoadEvent<UserEntity>): Promise<UserEntity | void> {
		this.logger.debug(`After load event on entity ${entity.constructor.name}`)
		try {
			event.entity = await this._crypto.decryptEntityData<UserEntity>(entity, this.fieldsToEncrypt)
		} catch (error) {
			this.logger.error(`Error after load event on entity ${entity.constructor.name}`, error)
		}
	}

	async beforeInsert(event: InsertEvent<UserEntity>) {
		this.logger.debug(`Before insert event on entity ${event.entity.constructor.name}`)
		try {
			event.entity = await this._crypto.encryptEntityData<UserEntity>(
				event.entity,
				this.fieldsToEncrypt
			)
		} catch (error) {
			this.logger.error(`Error before insert event on entity ${event.entity.constructor.name}`, error)
			throw new AuthException('Error encrypting data', 'ERROR_ENCRYPTING_DATA')
		}
	}

	async beforeUpdate(event: UpdateEvent<UserEntity>) {
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

	async afterInsert(event: InsertEvent<UserEntity>) {
		this.logger.debug(`After insert event on entity ${event.entity.constructor.name}`)
		try {
			event.entity = await this._crypto.decryptEntityData<UserEntity>(
				event.entity,
				this.fieldsToEncrypt
			)
		} catch (error) {
			this.logger.error(`Error after insert event on entity ${event.entity.constructor.name}`, error)
		}
	}
}
