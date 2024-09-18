import { CommandHandler, ICommandHandler } from '@nestjs/cqrs'
import { DeleteAccountCommand } from '../command/delete-account.command'
import { DeleteAccountService } from '../services/delete-account.service'

@CommandHandler(DeleteAccountCommand)
export class DeleteAccountHandler implements ICommandHandler<DeleteAccountCommand> {
	constructor(private readonly deleteAccountService: DeleteAccountService) {}

	async execute(command: DeleteAccountCommand) {
		try {
			// here we another service to delete the account
			return await this.deleteAccountService.deleteAccount(command.email)
		} catch (error) {
			return error
		}
	}
}
