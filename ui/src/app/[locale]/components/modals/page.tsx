'use client'
import AppDivider from '@/components/Common/DataDisplay/Divider/Divider'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppDialog from '@/components/Common/FeedBack/Dialog/Dialog'
import AppButton from '@/components/Common/Inputs/Button/Button'
import AppBox from '@/components/Common/Layout/Box'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import AppPaper from '@/components/Common/Layout/Paper'
import { Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import React from 'react'

export default function Modals() {
    const [open, setOpen] = React.useState(false)
    const [open2, setOpen2] = React.useState(false)
    const [open3, setOpen3] = React.useState(false)
    const [open4, setOpen4] = React.useState(false)
    const [open5, setOpen5] = React.useState(false)

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    const Transition = React.forwardRef(function Transition(
        props: TransitionProps & {
            children: React.ReactElement
        },
        ref: React.Ref<unknown>
    ) {
        return <Slide direction="up" ref={ref} {...props} />
    })

    return (
        <AppGrid item width="100%">
            <AppDivider marginY="0.5rem" textAlign="left">
                <AppTypography variant="subtitle2">Modals</AppTypography>
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
                    <AppBox display="flex" gap={2} flexWrap="wrap">
                        <AppButton variant="contained" color="primary" onClick={handleOpen}>
                            Open Modal
                        </AppButton>
                        <AppDialog
                            title="Dialog Title"
                            open={open}
                            onClose={handleClose}
                            showCloseButton
                            actionButtons={
                                <>
                                    <AppButton variant="contained" color="primary" onClick={handleClose}>
                                        Save
                                    </AppButton>
                                    <AppButton variant="contained" color="error" onClick={handleClose}>
                                        Close
                                    </AppButton>
                                </>
                            }
                        >
                            <AppTypography variant="subtitle2">Dialog Content</AppTypography>
                        </AppDialog>
                        <AppButton variant="outlined" color="primary" onClick={() => setOpen2(true)}>
                            FullScreen Modal
                        </AppButton>
                        <AppDialog
                            title="Dialog Title FullScreen"
                            open={open2}
                            fullScreen
                            showCloseButton
                            onClose={() => setOpen2(false)}
                            headerTitleSeverity="info"
                        >
                            <AppTypography variant="subtitle2">Dialog Content</AppTypography>
                        </AppDialog>

                        <AppButton variant="text" color="primary" onClick={() => setOpen3(true)}>
                            Dialog with Custom Width
                        </AppButton>
                        <AppDialog
                            title="Dialog Title Custom Width"
                            open={open3}
                            onClose={() => setOpen3(false)}
                            headerTitleSeverity="warning"
                            actionButtons={
                                <>
                                    <AppButton variant="contained" color="primary" onClick={() => setOpen3(false)}>
                                        Save
                                    </AppButton>
                                    <AppButton variant="contained" color="error" onClick={() => setOpen3(false)}>
                                        Close
                                    </AppButton>
                                </>
                            }
                            minWidth="400px"
                        >
                            <AppTypography variant="subtitle2">Dialog Content</AppTypography>
                        </AppDialog>
                        <AppButton variant="contained" color="error" onClick={() => setOpen4(true)}>
                            Dialog with Severity title
                        </AppButton>
                        <AppDialog
                            title="Dialog Title"
                            open={open4}
                            onClose={() => setOpen4(false)}
                            headerTitleSeverity="error"
                            showCloseButton
                            actionButtons={
                                <>
                                    <AppButton variant="contained" color="primary" onClick={() => setOpen4(false)}>
                                        Save
                                    </AppButton>
                                    <AppButton variant="contained" color="error" onClick={() => setOpen4(false)}>
                                        Close
                                    </AppButton>
                                </>
                            }
                        >
                            <AppTypography variant="subtitle2">Dialog Content</AppTypography>
                        </AppDialog>
                        <AppButton variant="contained" color="success" onClick={() => setOpen5(true)}>
                            Dialog with custom Transition
                        </AppButton>
                        <AppDialog
                            title="Dialog Title"
                            open={open5}
                            onClose={() => setOpen5(false)}
                            headerTitleSeverity="success"
                            showCloseButton
                            fullScreen
                            TransitionComponent={Transition}
                        >
                            <AppTypography variant="subtitle2">Dialog Content</AppTypography>
                        </AppDialog>
                    </AppBox>
                </AppPaper>
            </AppGrid>
        </AppGrid>
    )
}
