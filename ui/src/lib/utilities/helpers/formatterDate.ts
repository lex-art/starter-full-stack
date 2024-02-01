import dayjs, { Dayjs } from 'dayjs'
import * as timezone from 'dayjs/plugin/timezone'
import * as utc from 'dayjs/plugin/utc'

const DATE_UNITS = {
	year: 31536000,
	month: 2592000,
	day: 86400,
	hour: 3600,
	minute: 60,
	second: 1
}

const formatDateWithTimeZoneToString = ({
	date,
	timeZoneValue,
	format
}: {
	date: Date | Dayjs
	timeZoneValue?: string
	format?: string
}): string => {
	if (date) {
		const currentTimeZone = timeZoneValue
			? timeZoneValue
			: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'America/New_York'
		dayjs.extend(utc)
		dayjs.extend(timezone)
		return dayjs(date)
			.tz(currentTimeZone)
			.format(format ?? 'DD/MM/YYYY')
	} else {
		return '-'
	}
}

const formatDateWithTimeZone = ({ date, timeZoneValue }: { date: string; timeZoneValue?: string }): Dayjs => {
	if (date) {
		const currentTimeZone = timeZoneValue
			? timeZoneValue
			: Intl.DateTimeFormat().resolvedOptions().timeZone ?? 'America/New_York'
		dayjs.extend(utc)
		dayjs.extend(timezone)
		return dayjs(date).tz(currentTimeZone)
	} else {
		return dayjs()
	}
}

const getRelativeTime = (secondsElapsed: number) => {
	for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
		if (secondsElapsed >= secondsInUnit || unit === 'second') {
			const value = Math.floor(secondsElapsed / secondsInUnit) * -1
			return { value, unit }
		}
	}
}

const getTimeAgo = ({ timestamp, locale }: { timestamp: number; locale: string }) => {
	const rtf = new Intl.RelativeTimeFormat(locale)
	const secondsElapsed = (Date.now() - timestamp) / 1000
	const relativeTime = getRelativeTime(secondsElapsed)
	const { value, unit } = relativeTime ?? { value: 0, unit: '' }
	return rtf.format(value, unit as Intl.RelativeTimeFormatUnit)
}

const formatDateFromNow = ({ date }: { date: string }) => {
	const timpestamp = new Date(date).getTime()
	const locale = navigator.language
	const timeAgo = getTimeAgo({ timestamp: new Date(timpestamp).getTime(), locale })

	return timeAgo
}

export { formatDateFromNow, formatDateWithTimeZone, formatDateWithTimeZoneToString }
