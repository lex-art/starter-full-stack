import { FlatCompat } from '@eslint/eslintrc'
import typeScriptEsLintPlugin from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import unusedImports from 'eslint-plugin-unused-imports'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const eslintConfig = [
	...compat.extends(
		'next/core-web-vitals',
		'next/typescript',
		'plugin:storybook/recommended',
		'plugin:@typescript-eslint/recommended',
		'prettier'
	),
	typeScriptEsLintPlugin,
	{
		plugins: {
			prettier: eslintPluginPrettier,
			'unused-imports': unusedImports
		},
		rules: {
			...eslintPluginPrettier.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'unused-imports/no-unused-imports': 'warn',
			'prettier/prettier': [
				'error',
				{
					useTabs: true,
					tabWidth: 2,
					singleQuote: true,
					trailingComma: 'none',
					printWidth: 75,
					jsxBracketSameLine: false,
					endOfLine: 'auto',
					semi: false
				}
			]
		}
	}
]

export default eslintConfig
