'use client'
import { Severity } from '@/lib/types/Severity'
import { SelectChangeEvent, useMediaQuery, useTheme } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useSnackbar } from 'notistack'
import { Dispatch, FC, SetStateAction, useEffect, useRef, useState } from 'react'
import AppDropdown from '../../components/Common/Inputs/Dropdown/Dropdown'
import AppIcons from '../Common/Icons/Icons'
import AppButton from '../Common/Inputs/Button/Button'
import AppGrid from '../Common/Layout/Grid/Grid'

interface CameraComponentProps {
	setImageSrc: Dispatch<SetStateAction<string | null>>
	isStopCamera: boolean
	setStopCamera: Dispatch<SetStateAction<boolean>>
	isTakePhoto: boolean
	setTakePhoto: Dispatch<SetStateAction<boolean>>
	setCameraModalOpen?: Dispatch<SetStateAction<boolean>>
}

export const CameraComponent: FC<CameraComponentProps> = ({
	setImageSrc,
	isStopCamera,
	setStopCamera,
	isTakePhoto,
	setTakePhoto,
	setCameraModalOpen
}) => {
	const videoRef = useRef<HTMLVideoElement>(null)
	const { enqueueSnackbar } = useSnackbar()
	const theme = useTheme()
	const t = useTranslations('common')
	const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([])
	const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
	const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
	const isMobile: boolean = useMediaQuery(theme.breakpoints.down('sm'))

	useEffect(() => {
		getPermission()
		return () => {
			stopCamera()
		}
	}, [])

	useEffect(() => {
		if (isStopCamera) {
			startCamera()
			setStopCamera(false)
		}
	}, [isStopCamera])

	useEffect(() => {
		if (isTakePhoto) {
			takePhoto()
			setTakePhoto(false)
			stopCamera()
			setCameraModalOpen && setCameraModalOpen(false)
		}
	}, [isTakePhoto])

	const getPermission = async () => {
		navigator.mediaDevices
			.getUserMedia({ video: true })
			.then((stream) => {
				stream.getTracks().forEach((track) => track.stop())
				getCameraDevices()
			})
			.catch((error) => {
				console.error('Permission denied:', error)
				enqueueSnackbar(t('permissionDenied'), { variant: Severity.Error })
			})
	}

	const getCameraDevices = async () => {
		navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				const cameras = devices.filter((device) => device.kind === 'videoinput')
				setCameraDevices(cameras)
			})
			.catch((error) => {
				console.error('Error enumerating devices:', error)
				enqueueSnackbar(t('errorEnumeratingDevices'), { variant: Severity.Error })
			})
	}

	const startCamera = async () => {
		if (selectedCamera) {
			if (cameraStream) {
				stopCamera()
			}
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						deviceId: { exact: selectedCamera }
					}
				})

				if (videoRef.current) {
					videoRef.current.srcObject = stream
					setCameraStream(stream)
				}
			} catch (error) {
				console.error('Error accessing camera:', error)
				enqueueSnackbar(t('errorAccessingCamera'), { variant: Severity.Error })
			}
		}
	}

	const stopCamera = () => {
		if (cameraStream) {
			const tracks = cameraStream.getTracks()
			tracks.forEach((track) => track.stop())
			if (videoRef.current) {
				videoRef.current.srcObject = null
			}
			setCameraStream(null)
		}
	}

	const takePhoto = async () => {
		if (videoRef.current) {
			const video = videoRef.current
			const canvas = document.createElement('canvas')
			canvas.width = video.videoWidth * 2
			canvas.height = video.videoHeight * 2
			const context = canvas.getContext('2d')

			if (context) {
				context.drawImage(video, 0, 0, canvas.width, canvas.height)
				const photoURL = canvas.toDataURL('image/jpeg')
				setImageSrc(photoURL)
			}
		}
	}

	return (
		<AppGrid container width="100%" height="100%">
			<AppGrid
				item
				width="100%"
				height="100%"
				display="flex"
				alignItems={isMobile ? 'start' : 'end'}
				gap="1rem"
				flexDirection={isMobile ? 'column' : 'row'}
			>
				<AppDropdown
					options={cameraDevices.map((camera) => ({
						name: camera?.label,
						value: camera?.deviceId
					}))}
					value={selectedCamera ?? ''}
					label={t('selectCamera')}
					width={isMobile ? '30rem' : '100%'}
					onChange={(event: SelectChangeEvent<unknown>) => {
						setSelectedCamera(event.target.value as string)
					}}
				/>
				<AppButton
					onClick={startCamera}
					variant="outlined"
					sx={{
						minWidth: '22rem'
					}}
					startIcon={<AppIcons.PlayArrow />}
				>
					{t('startCamera')}
				</AppButton>
			</AppGrid>
			<AppGrid
				item
				marginTop="2rem"
				width="100%"
				height="100%"
				display="flex"
				alignItems="center"
				justifyContent={isMobile ? 'flex-start' : 'center'}
			>
				<video
					ref={videoRef}
					autoPlay
					style={{
						maxWidth: isMobile ? '30rem' : '100%',
						width: isMobile ? '30rem' : '100%',
						height: isMobile ? '30rem' : '100%',
						objectFit: 'cover'
					}}
				>
					<track kind="captions" srcLang="en" label="English" />
				</video>
			</AppGrid>
		</AppGrid>
	)
}
