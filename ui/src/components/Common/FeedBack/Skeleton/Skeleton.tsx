import { Skeleton, SkeletonProps } from '@mui/material'
import { forwardRef } from 'react'

const AppSkeleton = forwardRef<HTMLDivElement, SkeletonProps>(({ children, ...rest }, ref) => {
	return (
		<Skeleton ref={ref} {...rest}>
			{children}
		</Skeleton>
	)
})

AppSkeleton.displayName = 'AppSkeleton'
export default AppSkeleton
