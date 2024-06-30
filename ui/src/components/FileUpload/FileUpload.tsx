'use client'
import {
	ChangeEvent,
	Dispatch,
	DragEvent,
	FC,
	MouseEvent,
	SetStateAction,
	lazy,
	useEffect,
	useState
} from 'react'
import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import styles from './fileUpload.module.css'
import { useTranslations } from 'next-intl'
import AppGrid from '../Common/LAyout/Grid/Grid'
import AppIconButton from '../Common/Inputs/IconButton/IconButton'
import AppIcons from '../Common/Icons/Icons'
import AppTypography from '../Common/DataDisplay/Typography/Typography'
import AppFormHelperText from '../Common/FormControl/FormHelpText'
import AppButton from '../Common/Inputs/Button/Button'
import AppDialog from '../Common/FeedBack/Dialog/Dialog'
import { colors } from '@/lib/design-tokens'
import ImageViewer, { AppImageViewer } from './ImageViewer'

const CameraComponent = lazy(() =>
	import('../CameraComponent/CameraComponent').then((module) => ({ default: module.CameraComponent }))
)

interface FileUploadProps {
	acceptFileTypes?: string
	acceptMultipleFiles?: boolean
	onChangeFiles: Dispatch<SetStateAction<FileList | null>>
	viewFiles: FileList | null
	error?: boolean
	helperText?: string
	flexDirection?: 'column' | 'row'
	height?: string
	urlAttachment?: string | null
	limitZiseMB?: number
	disabled?: boolean
	placeholder?: string
}

export const FileUpload: FC<FileUploadProps> = ({
	acceptFileTypes,
	acceptMultipleFiles = false,
	onChangeFiles,
	viewFiles,
	error,
	helperText,
	flexDirection = 'column',
	height = '100%',
	urlAttachment,
	limitZiseMB,
	disabled,
	placeholder
}) => {
	const t = useTranslations('common')
	const theme = useTheme()
	const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'))
	const [cameraModalOpen, setCameraModalOpen] = useState<boolean>(false)
	const [stopCamera, setStopCamera] = useState<boolean>(false)
	const [tackePhoto, setTackePhoto] = useState<boolean>(false)
	const [imageSrc, setImageSrc] = useState<string | null>(null)
	const resetInput = (event: MouseEvent<HTMLInputElement>) => {
		const element = event.target as HTMLInputElement
		element.value = ''
	}
	const [pdfSrc, setPdfSrc] = useState<string | undefined>(undefined)

	useEffect(() => {
		if (imageSrc) {
			const base64Data = imageSrc.split(',')[1]
			const byteCharacters = atob(base64Data)
			const byteNumbers = new Array(byteCharacters.length)

			for (let i = 0; i < byteCharacters.length; i++) {
				byteNumbers[i] = byteCharacters.charCodeAt(i)
			}

			const byteArray = new Uint8Array(byteNumbers)
			const file = new File([byteArray], Date.now() + '.jpeg', { type: 'image/jpeg' })

			const dataTransfer = new DataTransfer()
			dataTransfer.items.add(file)
			onChangeFiles(dataTransfer.files)
		}
	}, [imageSrc])

	const validateSize = ({ file, limitZiseMB }: { file: File; limitZiseMB?: number }) => {
		if (!limitZiseMB) {
			return true
		}
		return !(limitZiseMB && file.size > limitZiseMB)
	}

	const isValidTypeFile = (file: File) => {
		return (
			file.type &&
			acceptFileTypes &&
			acceptFileTypes.split(',').some((allowedType) => {
				const trimmedAllowedType = allowedType.trim()
				return (
					(trimmedAllowedType.endsWith('/*') && file.type.startsWith(trimmedAllowedType.slice(0, -2))) ||
					file.type === trimmedAllowedType
				)
			})
		)
	}

	const onChange = (event: ChangeEvent<HTMLInputElement>) => {
		event.persist()
		if (!event.target.files) {
			return
		}
		for (const file of Array.from(event.target.files)) {
			const isValidFile = isValidTypeFile(file)

			if (isValidFile) {
				if (validateSize({ file, limitZiseMB })) {
					if (file.type === 'application/pdf') {
						const reader = new FileReader()
						reader.onload = () => {
							setPdfSrc(reader.result as string)
						}
						reader.readAsDataURL(file)
					}
					onChangeFiles(event.target.files)
				} else {
					alert(
						'El tamaño del archivo excede el límite permitido de: ' +
							(limitZiseMB || 1024) / (1024 * 1024) +
							' MB' +
							' y el archivo tiene: ' +
							(file.size / (1024 * 1024)).toFixed(2) +
							' MB, por favor comprime tú archivo.'
					)
				}
			} else {
				alert('El tipo de archivo no es permitido')
			}
		}
	}

	const onDragEnter = (event: DragEvent<HTMLDivElement>) => {
		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'copy'
		}
	}

	const onDragOver = (event: DragEvent<HTMLDivElement>) => {
		event.preventDefault()
		event.dataTransfer.effectAllowed = 'copyMove'
		event.dataTransfer.dropEffect = 'copy'
	}

	const onDrop = (event: DragEvent<HTMLDivElement>) => {
		event.stopPropagation()
		event.preventDefault()
		if (disabled) {
			return
		}
		const dataTransfer = new DataTransfer()
		for (const file of Array.from(event.dataTransfer.files)) {
			const isValidFile = isValidTypeFile(file)

			if (isValidFile) {
				if (validateSize({ file, limitZiseMB })) {
					if (file.type === 'application/pdf') {
						const reader = new FileReader()
						reader.onload = () => {
							setPdfSrc(reader.result as string)
						}
						reader.readAsDataURL(file)
					}
					onChangeFiles(event.dataTransfer.files)
					dataTransfer.items.add(file)
				} else {
					alert(
						'El tamaño del archivo excede el límite permitido de: ' +
							(limitZiseMB || 1024) / (1024 * 1024) +
							' MB' +
							' y el archivo tiene: ' +
							(file.size / (1024 * 1024)).toFixed(2) +
							' MB, por favor comprime tú archivo.'
					)
				}
			} else {
				alert('El tipo de archivo no es permitido')
			}
		}
	}
	const triggerSelectFile = () => {
		const inputFile: HTMLElement | null = window.document.getElementById('inputFile')
		if (inputFile) {
			inputFile.click()
		}
	}
	const isImageFile = (file: File) => {
		return file.type.startsWith('image/')
	}

	const openPdfInNewTab = () => {
		if (pdfSrc) {
			const pdfWindow = window.open()
			pdfWindow?.document.write(`<iframe width="100%" height="100%" src="${pdfSrc}"></iframe>`)
		}
	}

	return (
		<AppGrid
			height="100%"
			width="100%"
			display="flex"
			flexDirection={flexDirection}
			justifyContent="flex-start"
		>
			<input
				id="inputFile"
				type="file"
				multiple={acceptMultipleFiles}
				accept={acceptFileTypes}
				onClick={resetInput}
				onChange={onChange}
				className={styles.inputFile}
			/>

			{!viewFiles && urlAttachment ? (
				<AppImageViewer imageUrl={urlAttachment} />
			) : (
				<AppGrid display="flex" flexDirection="column" alignItems="center" minWidth="100%">
					<AppGrid
						onDragEnter={onDragEnter}
						onDragOver={onDragOver}
						onDrop={onDrop}
						height={height}
						className={classNames(styles.containerSelectedFiles, { [styles.error]: error })}
					>
						{viewFiles && viewFiles?.length > 0 ? (
							<AppGrid width="100%" display="flex" justifyContent="flex-start" alignItems="center">
								{isImageFile(viewFiles[0]) ? (
									<AppImageViewer
										imageUrl={URL.createObjectURL(viewFiles[0])}
										alt={viewFiles[0].name}
										className={styles.imgSelectedFile}
									/>
								) : viewFiles[0].type === 'application/pdf' ? (
									<AppIconButton onClick={openPdfInNewTab} color="secondary">
										<AppIcons.PictureAsPdf
											sx={{
												width: '7rem',
												height: '7rem'
											}}
											color="error"
										/>
									</AppIconButton>
								) : (
									<AppIcons.FileUploadRounded
										sx={{
											width: '7rem',
											height: '7rem'
										}}
										color="success"
									/>
								)}

								<AppTypography className={styles.dragDropText} variant="body2">
									{viewFiles[0].name}
								</AppTypography>
							</AppGrid>
						) : (
							<AppTypography className={styles.dragDropText} variant="body2">
								{placeholder ?? t('dragAndDropText')}
							</AppTypography>
						)}
					</AppGrid>
					<AppFormHelperText
						style={{
							margin: '0.5rem 1rem'
						}}
						error={error}
					>
						{helperText}
					</AppFormHelperText>
				</AppGrid>
			)}
			<AppGrid
				display="flex"
				flexDirection={isMobile ? 'column' : 'row'}
				alignItems="center"
				justifyContent="center"
				marginRight="1.5rem"
				gap="1rem"
				color={colors.light.text}
			>
				<AppButton
					variant="outlined"
					color="primary"
					sx={{ height: '4.7rem' }}
					onClick={triggerSelectFile}
					disabled={disabled}
				>
					{t(`selectFile`, { count: 1 })}
				</AppButton>
				<AppButton
					variant="outlined"
					color="inherit"
					startIcon={<AppIcons.Camera />}
					onClick={() => setCameraModalOpen(true)}
					disabled={disabled}
				>
					{t(`takePhoto`, { count: 1 })}
				</AppButton>
			</AppGrid>
			<AppDialog
				open={cameraModalOpen}
				onClose={() => {
					setCameraModalOpen(false)
					setStopCamera(true)
				}}
				titleText={t('takePhoto', { count: 1 })}
				actionButtons={
					<>
						<AppButton variant="outlined" color="error" onClick={() => setCameraModalOpen(false)}>
							{t('cancel')}
						</AppButton>
						<AppButton
							variant="outlined"
							color="inherit"
							startIcon={<AppIcons.CameraAlt />}
							onClick={() => {
								setTackePhoto(true)
							}}
						>
							{t('takePhoto', { count: 1 })}
						</AppButton>
					</>
				}
				minWidth="90rem"
				maxWidth="md"
			>
				<CameraComponent
					setImageSrc={setImageSrc}
					isStopCamera={stopCamera}
					setStopCamera={setStopCamera}
					isTackePhoto={tackePhoto}
					setTackePhoto={setTackePhoto}
					setCameraModalOpen={setCameraModalOpen}
				/>
			</AppDialog>
		</AppGrid>
	)
}
