'use client'

import PageLayout from '@/components/PageLayout/PageLayout'
import { useTranslations } from 'next-intl'

export default function Secret() {
	const t = useTranslations('common.Secret')

	return (
		<PageLayout title={t('title')}>
			<p>{t('description')}</p>
		</PageLayout>
	)
}
