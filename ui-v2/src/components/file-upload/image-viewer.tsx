'use client'
import * as VisuallyHidden from '@radix-ui/react-visually-hidden'
import { FileAxis3d } from 'lucide-react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { AspectRatio } from '../ui/aspect-ratio'
import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogTrigger
} from '../ui/dialog'
import { Typography } from '../ui/typography'

interface AppImageViewerProps {
	imageUrl: string
	width?: number | `${number}`
	alt?: string
	className?: string
}

export function ImageViewer({
	imageUrl,
	alt = 'Image',
	width = 275
}: AppImageViewerProps) {
	const t = useTranslations('common')

	const verifyFileExt = (url: string, ext?: string): boolean => {
		const lastSlashIndex = url.lastIndexOf('/')
		const questionMarkIndex = url.indexOf('?', lastSlashIndex)
		const extension = url.substring(lastSlashIndex + 1, questionMarkIndex)
		return extension.endsWith(ext ?? '.pdf')
	}

	return (
		<div>
			{verifyFileExt(imageUrl) ? (
				<Dialog>
					<DialogTrigger asChild>
						<Button size="lg" color="secondary" className="text-xl">
							<FileAxis3d
								size={64}
								strokeWidth={1.5}
								absoluteStrokeWidth
							/>
							<Typography color="error">{t('viewPdf')}</Typography>
						</Button>
					</DialogTrigger>
					<DialogContent className="max-w-7xl border-0 bg-transparent p-0">
						<div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
							<VisuallyHidden.Root>
								<DialogTitle>x</DialogTitle>
							</VisuallyHidden.Root>
							<object
								data={imageUrl + '#toolbar=0'}
								type="application/pdf"
								width="100%"
								height="100%"
							>
								<p>
									Este navegador no soporta la visualización de PDFs. Por
									favor, descarga el PDF para verlo:{' '}
									<a href={imageUrl}>Descargar PDF</a>.
								</p>
							</object>
						</div>
					</DialogContent>
				</Dialog>
			) : (
				<Dialog>
					<DialogTrigger asChild>
						<Image
							src={imageUrl}
							alt={alt || ''}
							sizes="100vw"
							width={width}
							height={width} // Set the height to match the width */
							className="size-20 object-cover rounded-lg"
							style={{ cursor: 'pointer' }}
						/>
					</DialogTrigger>
					<DialogContent className="max-w-7xl border-0 bg-transparent p-0">
						<div className="relative h-[calc(100vh-220px)] w-full overflow-clip rounded-md bg-transparent shadow-md">
							<VisuallyHidden.Root>
								<DialogTitle>x</DialogTitle>
							</VisuallyHidden.Root>
							<AspectRatio ratio={16 / 9}>
								<Image
									src={imageUrl}
									fill
									alt={alt || ''}
									className="h-full w-full object-cover"
								/>
							</AspectRatio>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</div>
	)
}
