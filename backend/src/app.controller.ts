import { Controller, Get } from '@nestjs/common'
import { ApiResponse } from '@nestjs/swagger'

@Controller()
export class AppController {
	@Get('health')
	@ApiResponse({
		status: 200,
		description: 'App API OK',
		type: String
	})
	health(): string {
		return 'Ok'
	}
}
