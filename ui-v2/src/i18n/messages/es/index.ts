import common from './common.json'
import components from './components.json'
import zod from './zod.json'
import dataTable from './dataTable.json'
import elements from './elements.json'

const locale = {
	zod,
	common,
	components,
	dataTable,
	elements
}
export type Locale = typeof locale
export default locale
