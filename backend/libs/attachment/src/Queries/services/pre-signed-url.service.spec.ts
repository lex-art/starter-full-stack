import { Test, TestingModule } from '@nestjs/testing'
import { PreSignedUrlService } from './pre-signed-url.service'

describe('AttachmentService', () => {
	let service: PreSignedUrlService

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [PreSignedUrlService]
		}).compile()

		service = module.get<PreSignedUrlService>(PreSignedUrlService)
	})

	it('should be defined', () => {
		expect(service).toBeDefined()
	})
})
