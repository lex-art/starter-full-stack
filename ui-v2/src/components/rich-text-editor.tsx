'use client'

import { cn } from '@/lib/utils'
import Placeholder from '@tiptap/extension-placeholder'
import Underline from '@tiptap/extension-underline'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import {
	Bold,
	Code2,
	Heading,
	Italic,
	List,
	Redo2,
	Send,
	SortAsc,
	Strikethrough,
	UnderlineIcon,
	Undo2
} from 'lucide-react'
import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group'

export default function RichTextEditor() {
	const [showValue, setShowValue] = useState(false)
	const [value, setValue] = useState('')
	const editor = useEditor({
		extensions: [
			StarterKit,
			Underline,
			Placeholder.configure({
				emptyEditorClass: 'is-editor-empty',
				// Use a placeholder:
				//placeholder: 'Write something …',
				// Use different placeholders depending on the node type:
				placeholder: ({ node }) => {
					if (node.type.name === 'heading') {
						return 'What’s the title?'
					}

					return 'Can you add some further context?'
				}
			})
		],
		content: '',
		immediatelyRender: false,
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
		<div className="w-full h-full gap-2">
			{editor && (
				<div className="w-full h-full flex justify-between">
					<ToggleGroup variant="outline" type="multiple">
						<ToggleGroupItem
							value="bold"
							aria-label="Toggle bold"
							onClick={() => editor.chain().focus().toggleBold().run()}
						>
							<Bold
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('bold')
								})}
							/>
						</ToggleGroupItem>
						<ToggleGroupItem
							value="italic"
							aria-label="Toggle italic"
							onClick={() => editor.chain().focus().toggleItalic().run()}
						>
							<Italic
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('italic')
								})}
							/>
						</ToggleGroupItem>
						<ToggleGroupItem
							value="underline"
							aria-label="Toggle underline"
							onClick={() =>
								editor.chain().focus().toggleUnderline().run()
							}
						>
							<UnderlineIcon
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('underline')
								})}
							/>
						</ToggleGroupItem>

						<ToggleGroupItem
							value="strikethrough"
							onClick={() =>
								editor.chain().focus().toggleUnderline().run()
							}
							aria-label="Toggle strikethrough"
						>
							<Strikethrough
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('strike')
								})}
							/>
						</ToggleGroupItem>

						<ToggleGroupItem
							value="heading"
							onClick={() =>
								editor.chain().focus().toggleHeading({ level: 2 }).run()
							}
							aria-label="Toggle heading"
						>
							<Heading
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('heading')
								})}
							/>
						</ToggleGroupItem>
						<ToggleGroupItem
							value="bulletList"
							onClick={() =>
								editor.chain().focus().toggleBulletList().run()
							}
							aria-label="Toggle bullet list"
						>
							<List
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('bulletList')
								})}
							/>
						</ToggleGroupItem>

						<ToggleGroupItem
							value="orderedList"
							onClick={() =>
								editor.chain().focus().toggleOrderedList().run()
							}
							aria-label="Toggle ordered list"
						>
							<SortAsc
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('orderedList')
								})}
							/>
						</ToggleGroupItem>

						<ToggleGroupItem
							value="blockquote"
							onClick={() =>
								editor.chain().focus().toggleBlockquote().run()
							}
							aria-label="Toggle blockquote"
						>
							<Code2
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('blockquote')
								})}
							/>
						</ToggleGroupItem>

						<ToggleGroupItem
							value="undo"
							onClick={() => editor?.chain().focus().undo().run()}
							aria-label="Toggle code"
						>
							<Undo2
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('code')
								})}
							/>
						</ToggleGroupItem>

						<ToggleGroupItem
							value="redo"
							onClick={() => editor?.chain().focus().redo().run()}
							aria-label="Toggle code"
						>
							<Redo2
								className={cn('h-4 w-4', {
									'text-primary': editor.isActive('code')
								})}
							/>
						</ToggleGroupItem>

						<ToggleGroupItem
							value="showValue"
							aria-label="Toggle show value"
							onClick={() => setShowValue(!showValue)}
						>
							<Send
								className={cn('h-4 w-4', {
									'text-primary': showValue
								})}
							/>
						</ToggleGroupItem>
					</ToggleGroup>
				</div>
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
		</div>
	)
}
