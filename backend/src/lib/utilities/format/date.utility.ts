const formatDateWithTimeZoneToString = ({ date, timeZone }: { date: Date; timeZone: string }) => {
	const dateFormatter = new Intl.DateTimeFormat('es-ES', {
		year: 'numeric',
		month: 'short',
		day: '2-digit',
		timeZone: timeZone ?? 'utc'
	})
	return dateFormatter.format(date).replace(/(\d{2}) (\w{3}) (\d{4})/, '$1-$2-$3')
}

export { formatDateWithTimeZoneToString }