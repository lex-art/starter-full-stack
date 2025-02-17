import { FlatCompat } from '@eslint/eslintrc'
import eslintPluginNext from '@next/eslint-plugin-next'
import typeScriptEsLintPlugin from 'eslint-config-prettier'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintPluginReactHooks from 'eslint-plugin-react-hooks'
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
		'prettier',
		'plugin:react-hooks/recommended',
		'plugin:@next/next/recommended'
	),
	typeScriptEsLintPlugin,
	{
		plugins: {
			prettier: eslintPluginPrettier,
			'unused-imports': unusedImports,
			'react-hooks': eslintPluginReactHooks,
			'@next/next': eslintPluginNext
		},
		rules: {
			...eslintPluginPrettier.configs.recommended.rules,
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-declaration-merging': 'off',
			'react-hooks/exhaustive-deps': 'off',
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
