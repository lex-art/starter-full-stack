'use client'
import { Dialog, DialogActions, DialogContent, useMediaQuery } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import AppGrid from '../Grid/Grid'
import AppIconButton from '../IconButton/IconButton'
import AppIcons from '../Icons/Icons'
import AppTypography from '../Typography/Typography'
import AppButton from '../Button/Button'

interface AppImageViewerProps {
	imageUrl: string
	width?: string
	alt?: string
	className?: string
}

const AppImageViewer = ({ imageUrl, alt = 'Image', width = '275rem', className }: AppImageViewerProps) => {
	const t = useTranslations('common')
	const [open, setOpen] = useState(false)
	const isMobile: boolean = useMediaQuery('(min-width: 960px)')
	const handleOpen = () => {
		setOpen(true)
	}

	const handleClose = () => {
		setOpen(false)
	}
	const vefifyFileExt = (url: string, ext?: string) => {
		const lastSlashIndex = url.lastIndexOf('/')
		const questionMarkIndex = url.indexOf('?', lastSlashIndex)
		const extension = url.substring(lastSlashIndex + 1, questionMarkIndex)
		return extension.endsWith(ext ?? '.pdf')
	}

	return (
		<div>
			{vefifyFileExt(imageUrl) ? (
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
				<img
					src={imageUrl}
					alt={alt}
					width={width}
					className={className}
					style={{ borderRadius: '1rem', cursor: 'pointer' }}
					onClick={handleOpen}
				/>
			)}

			<Dialog fullScreen={!isMobile} open={open} onClose={handleClose} maxWidth="md">
				<DialogContent>
					{vefifyFileExt(imageUrl) ? (
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
				</DialogContent>
				{!isMobile && (
					<DialogActions>
						<AppButton variant="outlined" color="error" onClick={handleClose}>
							Cerrar
						</AppButton>
					</DialogActions>
				)}
			</Dialog>
		</div>
	)
}

AppImageViewer.displayName = 'AppImageViewer'
export { AppImageViewer }
export default AppImageViewer
