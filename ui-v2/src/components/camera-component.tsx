'use client'
import { useIsMobile } from '@/hooks/use-mobile'
import { PlayIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
	Dispatch,
	SetStateAction,
	useEffect,
	useRef,
	useState
} from 'react'
import { Button } from './ui/button'
import { Select } from './ui/select'

interface CameraComponentProps {
	setImageSrc: Dispatch<SetStateAction<string | null>>
	isStopCamera: boolean
	setStopCamera: Dispatch<SetStateAction<boolean>>
	isTakePhoto: boolean
	setTakePhoto: Dispatch<SetStateAction<boolean>>
	setCameraModalOpen?: Dispatch<SetStateAction<boolean>>
}

export function CameraComponent({
	setImageSrc,
	isStopCamera,
	setStopCamera,
	isTakePhoto,
	setTakePhoto,
	setCameraModalOpen
}: CameraComponentProps) {
	const isMobile = useIsMobile()
	const videoRef = useRef<HTMLVideoElement>(null)
	const t = useTranslations('common')
	const [cameraDevices, setCameraDevices] = useState<MediaDeviceInfo[]>([])
	const [selectedCamera, setSelectedCamera] = useState<string | null>(null)
	const [cameraStream, setCameraStream] = useState<MediaStream | null>(
		null
	)
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
			})
	}

	const getCameraDevices = async () => {
		navigator.mediaDevices
			.enumerateDevices()
			.then((devices) => {
				const cameras = devices.filter(
					(device) => device.kind === 'videoinput'
				)
				setCameraDevices(cameras)
			})
			.catch((error) => {
				console.error('Error enumerating devices:', error)
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
		<div className="w-full h-full">
			<div className="flex w-full h-full gap-1 sm:flex-col sm:gap-4 sm:items-start">
				<Select
					label="Outline"
					placeholder="Select an option"
					options={cameraDevices.map((camera) => ({
						label: camera?.label,
						value: camera?.deviceId
					}))}
					variant="outline"
					onChangeValue={(value: string) => {
						setSelectedCamera(value)
					}}
					fullWidth
				/>
				<Button onClick={startCamera} variant="outline">
					<PlayIcon />
					{t('startCamera')}
				</Button>
			</div>
			<div className="w-full h-full mt-8 flex items-center justify-center">
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
			</div>
		</div>
	)
}
