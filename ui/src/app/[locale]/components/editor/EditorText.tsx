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
import { createSvgIcon } from '@mui/material/utils'

const BoldIcon = createSvgIcon(
	<svg fill="#000000" width="400px" height="400px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M480.286 822.857h548.571c151.269 0 274.286-123.017 274.286-274.286 0-151.268-123.017-274.285-274.286-274.285H480.286v548.571Zm0 822.857H1166c151.269 0 274.286-123.017 274.286-274.285 0-151.269-123.017-274.286-274.286-274.286H480.286v548.571ZM1166 1920H206V0h822.857c302.537 0 548.572 246.034 548.572 548.571 0 134.263-48.549 257.418-128.778 352.732 159.223 96.137 265.92 270.994 265.92 470.126 0 302.537-246.034 548.571-548.571 548.571Z"
			fill-rule="evenodd"
		/>
	</svg>,
	'BoldIcon'
)

const BoldIconActive = createSvgIcon(
	<svg fill="#2E7D32" width="400px" height="400px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M480.286 822.857h548.571c151.269 0 274.286-123.017 274.286-274.286 0-151.268-123.017-274.285-274.286-274.285H480.286v548.571Zm0 822.857H1166c151.269 0 274.286-123.017 274.286-274.285 0-151.269-123.017-274.286-274.286-274.286H480.286v548.571ZM1166 1920H206V0h822.857c302.537 0 548.572 246.034 548.572 548.571 0 134.263-48.549 257.418-128.778 352.732 159.223 96.137 265.92 270.994 265.92 470.126 0 302.537-246.034 548.571-548.571 548.571Z"
			fill-rule="evenodd"
		/>
	</svg>,
	'BoldIconActive'
)

const ItalicIcon = createSvgIcon(
	<svg fill="#000000" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M754.429 0v274.423h235.885L647.457 1645.85H343V1920h822.994v-274.149H930.11l342.857-1371.428h304.32V0z"
			fill-rule="evenodd"
		/>
	</svg>,
	'ItalicIcon'
)

const ItalicIconActive = createSvgIcon(
	<svg fill="#2E7D32" width="800px" height="800px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
		<path
			d="M754.429 0v274.423h235.885L647.457 1645.85H343V1920h822.994v-274.149H930.11l342.857-1371.428h304.32V0z"
			fill-rule="evenodd"
		/>
	</svg>,
	'ItalicIconActive'
)

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
								{editor?.isActive('bold') ? (
									<BoldIconActive fontSize="small" />
								) : (
									<BoldIcon fontSize="small" />
								)}
							</AppIconButton>
							<AppIconButton
								onClick={(e) => {
									e.preventDefault()
									editor?.chain().focus().toggleItalic().run()
								}}
							>
								{editor?.isActive('italic') ? (
									<ItalicIconActive fontSize="small" />
								) : (
									<ItalicIcon fontSize="small" />
								)}
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
								<AppIcons.Block color={editor?.isActive('blockquote') ? 'secondary' : 'success'} />
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
