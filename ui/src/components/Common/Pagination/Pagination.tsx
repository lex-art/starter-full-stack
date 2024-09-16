import { FC } from 'react'

import AppIcons from '../Icons/Icons'
import AppIconButton from '../Inputs/IconButton/IconButton'
import AppGrid from '../Layout/Grid/Grid'
import styles from './AppPagination.module.css'

interface AppPaginationProps {
	page: number
	setPage: (page: string) => void
	next: string | null | undefined
	previous: string | null | undefined
}
const AppPagination: FC<AppPaginationProps> = ({ page, setPage, next, previous }) => {
	const handleNextPage = () => {
		if (next) {
			setPage((page + 1).toString())
		}
	}

	const handlePrevPage = () => {
		if (previous) {
			setPage((page - 1).toString())
		}
	}

	return (
		<AppGrid container className={styles.paginationButtons}>
			{/* <MdOutlineKeyboardArrowLeft className={styles.arrowLeft} size={50} onClick={handlePrevPage} /> */}
			{previous && (
				<AppIconButton onClick={handlePrevPage} className={styles.arrowLeft} size="large">
					<AppIcons.ArrowLeft />
				</AppIconButton>
			)}
			{/* <MdOutlineKeyboardArrowRight className={styles.arrowRight} size={50} onClick={handleNextPage} /> */}
			{next && (
				<AppIconButton onClick={handleNextPage} className={styles.arrowRight} size="large">
					<AppIcons.ArrowRight />
				</AppIconButton>
			)}
		</AppGrid>
	)
}

AppPagination.displayName = 'AppPagination'
export { AppPagination }
export default AppPagination
