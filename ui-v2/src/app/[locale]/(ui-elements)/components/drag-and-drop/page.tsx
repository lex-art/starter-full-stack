'use client'
import { Typography } from '@/components/ui/typography'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

export default function DragAndDrop() {
	const t = useTranslations()

	const initialItems = [
		'Elemento 1',
		'Elemento 2',
		'Elemento 3',
		'Elemento 4'
	]

	const [items, setItems] = useState(initialItems)

	// Función para manejar el evento cuando se arrastra un elemento
	const handleOnDragEnd = (result: any) => {
		if (!result.destination) return

		const updatedItems = [...items]
		const [reorderedItem] = updatedItems.splice(result.source.index, 1)
		updatedItems.splice(result.destination.index, 0, reorderedItem)

		setItems(updatedItems)
	}

	return (
		<div className="w-full h-full p-4">
			<Typography variant="h2" muted>
				{t('elements.dragAndDrop')}
			</Typography>

			<div className="grid auto-rows-max gap-4 lg:grid-cols-2 mt-4">
				<div className="w-full h-full rounded-xl bg-muted/50 p-4">
					<Typography variant="h2">{t('elements.dragAndDrop')}</Typography>
					<div className="py-4 gap-4 flex flex-wrap">
						<DragDropContext onDragEnd={handleOnDragEnd}>
							<Droppable droppableId="items">
								{(provided) => (
									<ul
										{...provided.droppableProps}
										ref={provided.innerRef}
										style={{
											listStyle: 'none',
											padding: 0,
											margin: 0,
											width: '100%'
										}}
									>
										{items.map((item, index) => (
											<Draggable
												key={item}
												draggableId={item}
												index={index}
											>
												{(provided) => (
													<li
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
														style={{
															padding: '10px',
															margin: '1rem 0',
															backgroundColor: '#f0f0f0',
															border: '1px solid #ccc',
															borderRadius: '5px',
															width: '100%',
															cursor: 'pointer',
															...provided.draggableProps.style
														}}
													>
														<Typography variant="large">{item}</Typography>
														{JSON.stringify(item)}
													</li>
												)}
											</Draggable>
										))}
										{provided.placeholder}
									</ul>
								)}
							</Droppable>
						</DragDropContext>
					</div>
				</div>
			</div>
		</div>
	)
}
