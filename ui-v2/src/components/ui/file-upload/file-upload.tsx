import { Close } from '@radix-ui/react-toast'
import { Camera, CameraOff, FileText, Upload } from 'lucide-react'
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
import { Button } from '../button'
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '../dialog'
import { Label } from '../label'
import { Typography } from '../typography'

const CameraComponent = lazy(() =>
	import('../../camera-component').then((module) => ({
		default: module.CameraComponent
	}))
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

const FileUpload: FC<FileUploadProps> = forwardRef<
	HTMLDivElement,
	FileUploadProps
>(
	(
		{
			acceptFileTypes,
			acceptMultipleFiles = false,
			onChangeFiles,
			viewFiles,
			helperText,
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
				const file = new File([byteArray], Date.now() + '.jpeg', {
					type: 'image/jpeg'
				})

				const dataTransfer = new DataTransfer()
				dataTransfer.items.add(file)
				onChangeFiles(dataTransfer.files)
			}
		}, [imageSrc])

		const validateSize = ({
			file,
			limitSizeMB
		}: {
			file: File
			limitSizeMB?: number
		}) => {
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
						(trimmedAllowedType.endsWith('/*') &&
							file.type.startsWith(trimmedAllowedType.slice(0, -2))) ||
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
			const filesToProcess = acceptMultipleFiles
				? filesArray
				: filesArray.slice(0, 1)
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
			const filesToProcess = acceptMultipleFiles
				? filesArray
				: filesArray.slice(0, 1)
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
			onChangeFiles(
				dataTransfer.files.length > 0 ? dataTransfer.files : null
			)
		}
		const triggerSelectFile = () => {
			const inputFile: HTMLElement | null = window.document.getElementById(
				'inputFile-' + (index ?? '')
			)
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
				pdfWindow?.document.write(
					`<iframe width="100%" height="100%" src="${pdfSrc}"></iframe>`
				)
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
			onChangeFiles(
				dataTransfer.files.length > 0 ? dataTransfer.files : null
			)
		}

		return (
			<div
				className="w-full h-full flex justify-start "
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
				/>

				{!viewFiles && urlAttachment ? (
					<>{/* <AppImageViewer imageUrl={urlAttachment} /> */}</>
				) : (
					<div className="flex flex-col items-center w-full">
						<input
							onDragEnter={onDragEnter}
							onDragOver={onDragOver}
							onDrop={onDrop}
							style={{
								minHeight: minHeight,
								cursor:
									viewFiles &&
									viewFiles?.length > 0 &&
									isImageFile(viewFiles[0])
										? 'not-allowed'
										: 'pointer'
							}}
							/* className={classNames(styles.containerSelectedFiles, {
								[styles.error]: error
							})} */
							onClick={() => {
								if (
									!(
										viewFiles &&
										viewFiles?.length > 0 &&
										isImageFile(viewFiles[0])
									)
								)
									triggerSelectFile()
							}}
						>
							{viewFiles && viewFiles?.length > 0 ? (
								<div className="w-full">
									{Array.from(viewFiles).map(
										(file, index) =>
											(acceptMultipleFiles || index === 0) && (
												<div
													className="flex items-center justify-start"
													key={index + 'container'}
												>
													{(() => {
														if (isImageFile(file)) {
															return (
																<>
																	{/* 
																<AppImageViewer
																	imageUrl={URL.createObjectURL(file)}
																	alt={file.name}
																	className={styles.imgSelectedFile}
																/> */}
																</>
															)
														} else if (file.type === 'application/pdf') {
															return (
																<Button
																	onClick={openPdfInNewTab}
																	color="secondary"
																>
																	<FileText size={64} />
																</Button>
															)
														} else {
															return <Upload size={64} />
														}
													})()}
													<Typography variant="body">
														{viewFiles[0].name}
													</Typography>
													{clearable && (
														<Button
															aria-label="close"
															size="icon"
															onClick={(event) => {
																event.stopPropagation()
																removeFileAtIndex(index)
															}}
														>
															<Close />
														</Button>
													)}
												</div>
											)
									)}
								</div>
							) : (
								<Typography variant="body">
									{placeholder ?? t('dragAndDropText')}
								</Typography>
							)}
						</input>
						<Label className="m-2" color="error">
							{helperText}
						</Label>
					</div>
				)}
				<div className="flex items-center justify-center mr-6 gap-4">
					{showUploadButton && (
						<Button
							variant="outline"
							color="primary"
							onClick={triggerSelectFile}
							disabled={disabled}
						>
							{t(`selectFile`, { count: 1 })}
						</Button>
					)}
					{showTakePhoto && (
						<Dialog>
							<DialogTrigger asChild>
								<Button variant="outline" disabled={disabled}>
									<Camera />
									{t(`takePhoto`, { count: 1 })}
								</Button>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>{t('takePhoto', { count: 1 })}</DialogTitle>
									{/* <DialogDescription>
										Make changes to your profile here. Click save when
										you&apos;re done.
									</DialogDescription> */}
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<CameraComponent
										setImageSrc={setImageSrc}
										isStopCamera={stopCamera}
										setStopCamera={setStopCamera}
										isTakePhoto={takePhoto}
										setTakePhoto={setTakePhoto}
										setCameraModalOpen={setCameraModalOpen}
									/>
								</div>
								<DialogFooter>
									<Button
										variant="outline"
										color="error"
										onClick={() => setCameraModalOpen(false)}
									>
										{t('cancel')}
									</Button>
									<Button
										variant="outline"
										onClick={() => {
											setTakePhoto(true)
										}}
									>
										<CameraOff />
										{t('takePhoto', { count: 1 })}
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					)}
				</div>
			</div>
		)
	}
)

FileUpload.displayName = 'AppFileUpload'
export { FileUpload }
