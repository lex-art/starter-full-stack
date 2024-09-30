import common from './common.json'
import components from './components.json'
import zod from './zod.json'

const locale = {
	common,
	components,
	zod
}
export type Locale = typeof locale
export default locale
