import common from './common.json'
import components from './components.json'
import dataTable from './dataTable.json'
import elements from './elements.json'
import zod from './zod.json'

const es = {
	zod,
	common,
	components,
	dataTable,
	elements
}
export type Locale = typeof es
export default es
