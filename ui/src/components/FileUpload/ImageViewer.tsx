'use client'
import { DialogActions, useMediaQuery } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import AppGrid from '../Common/Layout/Grid/Grid'
import AppIconButton from '../Common/Inputs/IconButton/IconButton'
import AppIcons from '../Common/Icons/Icons'
import AppTypography from '../Common/DataDisplay/Typography/Typography'
import AppButton from '../Common/Inputs/Button/Button'
import Image from 'next/image'
import AppDialog from '../Common/FeedBack/Dialog/Dialog'

interface AppImageViewerProps {
	imageUrl: string
	width?: number | `${number}`
	alt?: string
	className?: string
}

const AppImageViewer = ({ imageUrl, alt = 'Image', width = 275, className }: AppImageViewerProps) => {
	const t = useTranslations('common')
	const [open, setOpen] = useState(false)
	const isMobile: boolean = useMediaQuery('(min-width: 960px)')
	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const verifyFileExt = (url: string, ext?: string): boolean => {
		const lastSlashIndex = url.lastIndexOf('/')
		const questionMarkIndex = url.indexOf('?', lastSlashIndex)
		const extension = url.substring(lastSlashIndex + 1, questionMarkIndex)
		return extension.endsWith(ext ?? '.pdf')
	}

	return (
		<div>
			{verifyFileExt(imageUrl) ? (
				<AppGrid>
					<AppIconButton onClick={handleOpen} color="secondary">
						<AppIcons.PictureAsPdf
							sx={{
								width: '7rem',
								height: '7rem'
							}}
							color="error"
						/>
						<AppTypography color="error">{t('viewPdf')}</AppTypography>
					</AppIconButton>
				</AppGrid>
			) : (
				<Image
					src={imageUrl}
					alt={alt}
					width={width}
					height={width} // Set the height to match the width */
					className={className}
					style={{ borderRadius: '1rem', cursor: 'pointer' }}
					onClick={handleOpen}
					onKeyDown={handleOpen} // Add a keyboard listener
				/>
			)}

			<AppDialog
				fullScreen={!isMobile}
				open={open}
				onClose={handleClose}
				maxWidth="md"
				actionButtons={
					!isMobile && (
						<AppButton variant="outlined" color="error" onClick={handleClose}>
							Cerrar
						</AppButton>
					)
				}
			>
				{verifyFileExt(imageUrl) ? (
					<AppGrid width="50vw" height="90vh">
						<object data={imageUrl + '#toolbar=0'} type="application/pdf" width="100%" height="100%">
							<p>
								Este navegador no soporta la visualización de PDFs. Por favor, descarga el PDF para verlo:{' '}
								<a href={imageUrl}>Descargar PDF</a>.
							</p>
						</object>
					</AppGrid>
				) : (
					<img src={imageUrl} alt="Imagen ampliada" style={{ width: '100%' }} />
				)}
			</AppDialog>
		</div>
	)
}

AppImageViewer.displayName = 'AppImageViewer'
export { AppImageViewer }
export default AppImageViewer
