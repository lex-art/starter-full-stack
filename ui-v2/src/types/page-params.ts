export interface PageParams {
	params: Promise<
		Record<string, string> & {
			locale: 'en' | 'es'
		}
	>
	searchParams: Promise<Record<string, string>>
}
