'use client'

import PageLayout from '@/components/PageLayout/PageLayout'
import { useTranslations } from 'next-intl'

export default function Secret() {
	const t = useTranslations('common')

	return (
		<PageLayout>
			<p>{t('home')}</p>
		</PageLayout>
	)
}
