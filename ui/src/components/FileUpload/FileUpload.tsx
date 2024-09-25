'use client'
import { colors } from '@/lib/designTokens'
import { useMediaQuery, useTheme } from '@mui/material'
import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import {
	ChangeEvent,
	Dispatch,
	DragEvent,
	FC,
	MouseEvent,
	SetStateAction,
	forwardRef,
	lazy,
	useEffect,
	useState
} from 'react'
import AppTypography from '../Common/DataDisplay/Typography/Typography'
import AppDialog from '../Common/FeedBack/Dialog/Dialog'
import AppFormHelperText from '../Common/FormControl/FormHelpText'
import AppIcons from '../Common/Icons/Icons'
import AppButton from '../Common/Inputs/Button/Button'
import AppIconButton from '../Common/Inputs/IconButton/IconButton'
import AppBox from '../Common/Layout/Box'
import AppGrid from '../Common/Layout/Grid/Grid'
import AppImageViewer from './ImageViewer'
import styles from './fileUpload.module.css'

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
	minHeight?: string
	urlAttachment?: string | null
	limitSizeMB?: number
	disabled?: boolean
	placeholder?: string
	clearable?: boolean
	showTakePhoto?: boolean
	showUploadButton?: boolean
	index?: string
}

const AppFileUpload: FC<FileUploadProps> = forwardRef<HTMLDivElement, FileUploadProps>(
	(
		{
			acceptFileTypes,
			acceptMultipleFiles = false,
			onChangeFiles,
			viewFiles,
			error,
			helperText,
			flexDirection = 'column',
			minHeight = '100%',
			urlAttachment,
			limitSizeMB,
			disabled,
			placeholder,
			clearable = true,
			showTakePhoto,
			showUploadButton = true,
			index
		},
		ref
	) => {
		const t = useTranslations('common')
		const theme = useTheme()
		const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'))
		const [cameraModalOpen, setCameraModalOpen] = useState<boolean>(false)
		const [stopCamera, setStopCamera] = useState<boolean>(false)
		const [takePhoto, setTakePhoto] = useState<boolean>(false)
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

		const validateSize = ({ file, limitSizeMB }: { file: File; limitSizeMB?: number }) => {
			if (!limitSizeMB) {
				return true
			}
			return !(limitSizeMB && file.size > limitSizeMB)
		}

		const isValidTypeFile = (file: File) => {
			if (acceptFileTypes === '*') {
				return true
			}
			return (
				file.type &&
				acceptFileTypes?.split(',').some((allowedType) => {
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
			const filesArray = Array.from(event.target.files)
			const filesToProcess = acceptMultipleFiles ? filesArray : filesArray.slice(0, 1)
			for (const file of filesToProcess) {
				const isValidFile = isValidTypeFile(file)

				if (isValidFile) {
					if (validateSize({ file, limitSizeMB })) {
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
							t('fileSizeExceeded', {
								size: (limitSizeMB ?? 1024) / (1024 * 1024),
								fileSize: (file.size / (1024 * 1024)).toFixed(2)
							})
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
			const filesArray = Array.from(event.dataTransfer.files)
			const filesToProcess = acceptMultipleFiles ? filesArray : filesArray.slice(0, 1)
			for (const file of filesToProcess) {
				const isValidFile = isValidTypeFile(file)

				if (isValidFile) {
					if (validateSize({ file, limitSizeMB })) {
						if (file.type === 'application/pdf') {
							const reader = new FileReader()
							reader.onload = () => {
								setPdfSrc(reader.result as string)
							}
							reader.readAsDataURL(file)
						}
						dataTransfer.items.add(file)
					} else {
						alert(
							t('fileSizeExceeded', {
								size: (limitSizeMB ?? 1024) / (1024 * 1024),
								fileSize: (file.size / (1024 * 1024)).toFixed(2)
							})
						)
					}
				} else {
					alert(t('fileNotValid'))
				}
			}
			onChangeFiles(dataTransfer.files.length > 0 ? dataTransfer.files : null)
		}
		const triggerSelectFile = () => {
			const inputFile: HTMLElement | null = window.document.getElementById('inputFile-' + (index ?? ''))
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

		const removeFileAtIndex = (index: number) => {
			if (!viewFiles) return

			const dataTransfer = new DataTransfer()
			for (let i = 0; i < viewFiles.length; i++) {
				if (i !== index) {
					dataTransfer.items.add(viewFiles[i])
				}
			}
			onChangeFiles(dataTransfer.files.length > 0 ? dataTransfer.files : null)
		}

		return (
			<AppGrid
				height="100%"
				width="100%"
				display="flex"
				flexDirection={flexDirection}
				justifyContent="flex-start"
				ref={ref}
				key={'fileUpload-' + index}
			>
				<input
					id={'inputFile-' + (index ?? '')}
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
							minHeight={minHeight}
							style={{
								cursor:
									viewFiles && viewFiles?.length > 0 && isImageFile(viewFiles[0]) ? 'not-allowed' : 'pointer'
							}}
							className={classNames(styles.containerSelectedFiles, { [styles.error]: error })}
							onClick={() => {
								if (!(viewFiles && viewFiles?.length > 0 && isImageFile(viewFiles[0]))) triggerSelectFile()
							}}
						>
							{viewFiles && viewFiles?.length > 0 ? (
								<AppGrid width="100%">
									{Array.from(viewFiles).map(
										(file, index) =>
											(acceptMultipleFiles || index === 0) && (
												<AppBox
													display="flex"
													alignItems="center"
													justifyContent="start"
													key={index + 'container'}
												>
													{(() => {
														if (isImageFile(file)) {
															return (
																<AppImageViewer
																	imageUrl={URL.createObjectURL(file)}
																	alt={file.name}
																	className={styles.imgSelectedFile}
																/>
															)
														} else if (file.type === 'application/pdf') {
															return (
																<AppIconButton onClick={openPdfInNewTab} color="secondary">
																	<AppIcons.PictureAsPdf
																		sx={{
																			width: '7rem',
																			height: '7rem'
																		}}
																		color="error"
																	/>
																</AppIconButton>
															)
														} else {
															return (
																<AppIcons.FileUploadRounded
																	sx={{
																		width: '7rem',
																		height: '7rem'
																	}}
																	color="success"
																/>
															)
														}
													})()}
													<AppTypography className={styles.dragDropText} variant="body2">
														{viewFiles[0].name}
													</AppTypography>
													{clearable && (
														<AppIconButton
															aria-label="close"
															onClick={(event) => {
																event.stopPropagation()
																removeFileAtIndex(index)
															}}
														>
															<AppIcons.Close />
														</AppIconButton>
													)}
												</AppBox>
											)
									)}
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
					{showUploadButton && (
						<AppButton variant="outlined" color="primary" onClick={triggerSelectFile} disabled={disabled}>
							{t(`selectFile`, { count: 1 })}
						</AppButton>
					)}
					{showTakePhoto && (
						<AppButton
							variant="outlined"
							color="inherit"
							startIcon={<AppIcons.Camera fontSize="small" />}
							onClick={() => setCameraModalOpen(true)}
							disabled={disabled}
						>
							{t(`takePhoto`, { count: 1 })}
						</AppButton>
					)}
				</AppGrid>
				<AppDialog
					open={cameraModalOpen}
					onClose={() => {
						setCameraModalOpen(false)
						setStopCamera(true)
					}}
					title={t('takePhoto', { count: 1 })}
					actionButtons={
						<>
							<AppButton variant="outlined" color="error" onClick={() => setCameraModalOpen(false)}>
								{t('cancel')}
							</AppButton>
							<AppButton
								variant="outlined"
								color="inherit"
								startIcon={<AppIcons.CameraAlt fontSize="small" />}
								onClick={() => {
									setTakePhoto(true)
								}}
							>
								{t('takePhoto', { count: 1 })}
							</AppButton>
						</>
					}
				>
					<CameraComponent
						setImageSrc={setImageSrc}
						isStopCamera={stopCamera}
						setStopCamera={setStopCamera}
						isTakePhoto={takePhoto}
						setTakePhoto={setTakePhoto}
						setCameraModalOpen={setCameraModalOpen}
					/>
				</AppDialog>
			</AppGrid>
		)
	}
)

AppFileUpload.displayName = 'AppFileUpload'
export default AppFileUpload
