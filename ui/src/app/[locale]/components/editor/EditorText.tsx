// components/custom-editor.js
'use client' // only in App Router

import AppIcons from '@/components/Common/Icons/Icons'
import AppIconButton from '@/components/Common/Inputs/IconButton/IconButton'
import Placeholder from '@tiptap/extension-placeholder'
import { Toolbar } from '@mui/material'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import { useState } from 'react'
import './styles.css'
import AppBox from '@/components/Common/Layout/Box'

function CustomEditor() {
	const [showValue, setShowValue] = useState(false)
	const [value, setValue] = useState('')
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Placeholder.configure({
				emptyEditorClass: 'is-editor-empty',
				// Use a placeholder:
				placeholder: 'Write something …'
				// Use different placeholders depending on the node type:
				// placeholder: ({ node }) => {
				//   if (node.type.name === 'heading') {
				//     return 'What’s the title?'
				//   }

				//   return 'Can you add some further context?'
				// },
			})
		],
		content: '',

		editorProps: {
			attributes: {
				class: 'editor'
			}
		},
		onUpdate({ editor }) {
			setValue(editor.getHTML())
		}
	})

	return (
		<>
			{editor && (
				<Toolbar
					sx={{
						width: '100%',
						display: 'flex',
						justifyContent: 'space-between',
						border: '1px solid gray',
						borderBottom: 'none',
						borderRadius: '8px 8px 0 0'
					}}
				>
					<>
						<AppBox>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().toggleBold().run()
								}}
							>
								<AppIcons.FormatBold color={editor?.isActive('bold') ? 'success' : 'secondary'} />
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().toggleItalic().run()
								}}
							>
								<AppIcons.FormatItalic color={editor?.isActive('italic') ? 'success' : 'secondary'} />
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().toggleUnderline().run()
								}}
							>
								<AppIcons.FormatUnderlined color={editor?.isActive('underline') ? 'success' : 'secondary'} />
							</AppIconButton>

							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().toggleStrike().run()
								}}
							>
								<AppIcons.StrikethroughS color={editor?.isActive('strike') ? 'secondary' : 'success'} />
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor
										?.chain()
										.focus()
										.toggleHeading({
											level: 2
										})
										.run()
								}}
							>
								<AppIcons.TextFormat color={editor?.isActive('heading') ? 'secondary' : 'success'} />
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().toggleBulletList().run()
								}}
							>
								<AppIcons.List color={editor?.isActive('bulletList') ? 'secondary' : 'success'} />
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().toggleOrderedList().run()
								}}
							>
								<AppIcons.ArrowUpward color={editor?.isActive('orderedList') ? 'secondary' : 'success'} />
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().toggleBlockquote().run()
								}}
							>
								<AppIcons.FormatQuoteRounded
									color={editor?.isActive('blockquote') ? 'secondary' : 'success'}
								/>
							</AppIconButton>

							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().setCode().run()
								}}
							>
								<AppIcons.Code color={editor?.isActive('code') ? 'secondary' : 'success'} />
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().undo().run()
								}}
							>
								<AppIcons.Undo color={editor?.isActive('undo') ? 'secondary' : 'success'} />
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().redo().run()
								}}
							>
								<AppIcons.Redo color={editor?.isActive('redo') ? 'secondary' : 'success'} />
							</AppIconButton>
						</AppBox>

						<AppIconButton
							disabled={value.length > 0}
							onClick={() => {
								setShowValue(!showValue)
							}}
						>
							<AppIcons.Send />
						</AppIconButton>
					</>
				</Toolbar>
			)}
			<EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
			{showValue && (
				<pre
					style={{
						marginTop: '1rem'
					}}
				>
					{value}
				</pre>
			)}
		</>
	)
}

export default CustomEditor
