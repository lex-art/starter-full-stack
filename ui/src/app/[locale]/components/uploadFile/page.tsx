'use client'
import { CameraComponent } from '@/components/CameraComponent/CameraComponent'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppIcons from '@/components/Common/Icons/Icons'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import AppFileUpload from '@/components/FileUpload/FileUpload'
import AppImageViewer from '@/components/FileUpload/ImageViewer'
import { SIZE } from '@/lib/utilities/constants'
import { useTranslations } from 'next-intl'
import React, { useState } from 'react'

export default function UploadFile() {
	const t = useTranslations('common')
	const [imageSrc, setImageSrc] = useState<FileList | null>(null)
	const [imageMultipleSrc, setImageMultipleSrc] = useState<FileList | null>(null)
	const [anyFile, setAnyFile] = useState<FileList | null>(null)
	const [imageFromCamera, setImageFromCamera] = useState<FileList | null>(null)
	const [stopCamera, setStopCamera] = useState<boolean>(false)
	const [takePhoto, setTakePhoto] = useState<boolean>(false)
	const [photoSrc, setPhotoSrc] = useState<string | null>(null)

	return (
		<AppGrid item width="100%">
			<AppDivider marginY="0.5rem" textAlign="left">
				<AppTypography variant="subtitle2">Menus</AppTypography>
			</AppDivider>
			<AppGrid
				container
				display="grid"
				gap="2rem"
				gridTemplateColumns={{
					xs: '1fr',
					sm: '1fr'
				}}
			>
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Upload component
					</AppTypography>
					<AppBox
						display="grid"
						gap="2rem"
						gridTemplateColumns={{
							xs: '1fr',
							sm: '49% 1fr',
							md: '49% 1fr',
							xl: '49% 1fr'
						}}
					>
						<AppFileUpload
							acceptFileTypes="*"
							index="1"
							viewFiles={anyFile}
							onChangeFiles={setAnyFile}
							limitSizeMB={SIZE.ONE_MB}
							minHeight="10rem"
							placeholder={t('uploadAnyFile')}
						/>
						<AppFileUpload
							key="image+1"
							index="2"
							acceptFileTypes="image/*"
							viewFiles={imageSrc}
							onChangeFiles={setImageSrc}
							limitSizeMB={SIZE.EIGHT_MB}
							minHeight="10rem"
						/>

						<AppFileUpload
							key="image+2"
							index="3"
							acceptFileTypes="*"
							acceptMultipleFiles
							viewFiles={imageMultipleSrc}
							onChangeFiles={setImageMultipleSrc}
							limitSizeMB={SIZE.EIGHT_MB}
							minHeight="10rem"
							placeholder={t('uploadMultipleFiles')}
						/>
						<AppFileUpload
							key="image+4"
							index="4"
							acceptFileTypes="image/*"
							showTakePhoto
							showUploadButton={false}
							viewFiles={imageFromCamera}
							onChangeFiles={setImageFromCamera}
							limitSizeMB={SIZE.EIGHT_MB}
							minHeight="10rem"
							placeholder={t('takePhotoWithCamera')}
						/>
					</AppBox>
				</AppPaper>
				<AppPaper
					elevation={5}
					sx={{
						padding: 2
					}}
				>
					<AppTypography variant="body1" fontWeight="bold">
						Take photo with camera
					</AppTypography>
					<AppBox display="flex" alignItems="center" justifyContent="space-around" gap={3}>
						<AppGrid
							width="50rem"
							border="solid 1px"
							borderColor="gray"
							padding={2}
							borderRadius={2}
							textAlign="center"
						>
							<CameraComponent
								setImageSrc={setPhotoSrc}
								isStopCamera={stopCamera}
								setStopCamera={setStopCamera}
								isTakePhoto={takePhoto}
								setTakePhoto={setTakePhoto}
							/>
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
						</AppGrid>
						{photoSrc && <AppImageViewer imageUrl={photoSrc} alt="Image Viewer" />}
					</AppBox>
				</AppPaper>
			</AppGrid>
		</AppGrid>
	)
}
