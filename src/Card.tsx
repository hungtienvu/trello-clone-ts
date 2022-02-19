import { CardContainer } from "./AppComponentsStyles"
import { Draggable, DraggableProvided } from "react-beautiful-dnd"
import { Task } from "./state/appStateReducer"

type CardProps = { 
  text: string
  id: string
  columnId: string
  index: number,
}

export const Card = ({
  text,
  id,
  columnId,
  index
} : CardProps) => {

return(
      <Draggable 
        draggableId={id}
        index={index}
      >
      {(provided, snapshot) => (
        <CardContainer
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
          provided={provided}
        >
          <span>
            { text }
          </span>
        </CardContainer>
          )}
    </Draggable>
)}

type CardListProps = {
  tasks: Task[],
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

