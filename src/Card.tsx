import { CardContainer } from "./AppComponentsStyles"
import { memo } from "react"
import { Draggable } from "react-beautiful-dnd"

type CardProps = { 
  text: string
  id: string
  columnId: string
  parentRef?: React.RefObject<HTMLDivElement>,
  index: number
}

export const Card = ({
  text,
  id,
  columnId,
  parentRef,
  index,
  ...rest
} : CardProps) => {

return(
      <Draggable 
        draggableId={id}
        index={index}
      >
      {(provided, snapshot) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          parentRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          <span>
            { text }
          </span>
        </CardContainer>
          )}
    </Draggable>
)}

type CardListProps = {
  tasks: CardProps[],
  columnId: string
}

export const CardList = ({ tasks, columnId }: CardListProps) => {
  return (
    <>
    {tasks.map((task, index) =>(
      <Card 
        columnId={columnId}
        text={task.text} 
        id={task.id}
        key={task.id}
        index={index}
        />
    ))}
    </>
  )
}

