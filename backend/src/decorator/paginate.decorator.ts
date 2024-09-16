export const Paginate =
	(
		defaultOptions: { limit?: number; page?: number; orderBy?: string; orderColumn?: 'asc' | 'desc' } = {}
	) =>
	(target: any, propertyName: string, descriptor: PropertyDescriptor) => {
		const method = descriptor.value
		descriptor.value = async function (...args: any[]) {
			// Find the index of the paginationOptions object
			const paginationIndex = args.findIndex((arg) => arg && arg.paginationOptions)
			const paginationOptions =
				paginationIndex > -1
					? { ...defaultOptions, ...args[paginationIndex].paginationOptions }
					: defaultOptions

			const { limit = 1, page = 1, orderBy = 'createdDate', orderColumn = 'asc' } = paginationOptions
			// Check if limit is -1 for fetching all results
			if (limit === -1) {
				// Execute the original method with all arguments without pagination
				const [result, total] = await method.apply(this, args)

				return {
					data: result,
					total,
					page: 1,
					nextPage: null,
					prevPage: null,
					lastPage: 1,
					limit: total
				}
			} else {
				const skip = (page - 1) * limit

				// If paginationOptions were found, prepare them with pagination logic
				if (paginationIndex > -1) {
					args[paginationIndex].paginationOptions = {
						take: limit,
						skip,
						order: { [orderBy]: orderColumn }
					}
				}
				// Execute the original method with all arguments
				const [result, total] = await method.apply(this, args)

				return {
					data: result,
					total,
					page,
					nextPage: page * limit < total ? page + 1 : null,
					prevPage: page > 1 ? page - 1 : null,
					lastPage: Math.ceil(total / limit),
					limit
				}
			}
		}
	}
