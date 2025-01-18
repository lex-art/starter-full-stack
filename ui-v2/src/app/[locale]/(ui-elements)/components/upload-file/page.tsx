'use client'
import { CameraComponent } from '@/components/camera-component'
import { FileUpload } from '@/components/file-upload/file-upload'
import { ImageViewer } from '@/components/file-upload/image-viewer'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { SIZE } from '@/utils/constants/sizes'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function UploadFilesPage() {
	const t = useTranslations()
	const [imageSrc, setImageSrc] = useState<FileList | null>(null)
	const [imageMultipleSrc, setImageMultipleSrc] =
		useState<FileList | null>(null)
	const [anyFile, setAnyFile] = useState<FileList | null>(null)
	const [imageFromCamera, setImageFromCamera] = useState<FileList | null>(
		null
	)
	const [stopCamera, setStopCamera] = useState<boolean>(false)
	const [takePhoto, setTakePhoto] = useState<boolean>(false)
	const [photoSrc, setPhotoSrc] = useState<string | null>(null)
	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.upload')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-x  bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.upload')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<FileUpload
							acceptFileTypes="*"
							index="1"
							viewFiles={anyFile}
							onChangeFiles={setAnyFile}
							limitSizeMB={SIZE.ONE_MB}
							placeholder={t('elements.uploadAnyFile')}
						/>

						<FileUpload
							key="image+1"
							index="2"
							acceptFileTypes="image/*"
							viewFiles={imageSrc}
							onChangeFiles={setImageSrc}
							limitSizeMB={SIZE.EIGHT_MB}
						/>

						<FileUpload
							key="image+2"
							index="3"
							acceptFileTypes="*"
							acceptMultipleFiles
							viewFiles={imageMultipleSrc}
							onChangeFiles={setImageMultipleSrc}
							limitSizeMB={SIZE.EIGHT_MB}
							placeholder={t('elements.uploadMultipleFiles')}
						/>
						<FileUpload
							key="image+4"
							index="4"
							acceptFileTypes="image/*"
							showTakePhoto
							showUploadButton={false}
							viewFiles={imageFromCamera}
							onChangeFiles={setImageFromCamera}
							limitSizeMB={SIZE.EIGHT_MB}
							placeholder={t('elements.takePhotoWithCamera')}
							minHeight="10rem"
						/>
					</div>
				</div>
				<div className="w-full h-full rounded-x  bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.upload')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<CameraComponent
							setImageSrc={setPhotoSrc}
							isStopCamera={stopCamera}
							setStopCamera={setStopCamera}
							isTakePhoto={takePhoto}
							setTakePhoto={setTakePhoto}
						/>
						<Button
							variant="outline"
							onClick={() => {
								setTakePhoto(true)
							}}
						>
							{t('elements.takePhoto', { count: 1 })}
						</Button>
						{photoSrc && (
							<ImageViewer imageUrl={photoSrc} alt="Image Viewer" />
						)}
					</div>
				</div>
			</div>
		</div>
	)
}
