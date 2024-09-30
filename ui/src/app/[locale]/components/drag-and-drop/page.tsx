'use client'
import AppTypography from '@/components/Common/DataDisplay/Typography/Typography'
import AppGrid from '@/components/Common/Layout/Grid/Grid'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import { useState } from 'react'

export default function DragAndDrop() {
	const initialItems = ['Elemento 1', 'Elemento 2', 'Elemento 3', 'Elemento 4']

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
		<AppGrid display="flex" justifyContent="center" alignItems="center" padding="2rem" flexDirection="column">
			<AppTypography variant="h1">Drag and Drop</AppTypography>
			<div
				style={{
					width: '100%',
					padding: '1rem',
					border: '1px solid #ccc',
					borderRadius: '5px'
				}}
			>
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
									<Draggable key={item} draggableId={item} index={index}>
										{(provided) => (
											<li
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												style={{
													padding: '10px',
													margin: '3rem 0',
													backgroundColor: '#f0f0f0',
													border: '1px solid #ccc',
													width: '100%',
													cursor: 'pointer',
													...provided.draggableProps.style
												}}
											>
												<AppTypography variant="subtitle2">{item}</AppTypography>
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
		</AppGrid>
	)
}
