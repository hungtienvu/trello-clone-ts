import { memo } from "react"
import { ColumnTitle } from "./styles"
import { ColumnContainer, ColumnContent}  from "./AppComponentsStyles"
import { AddNewItem } from "./AddNewItem"
import { CardList } from "./Card"
import { useAppState } from "./state/AppStateContext"
import { addTask } from "./state/actions"
import { Droppable, Draggable, DraggableProvided } from "react-beautiful-dnd"
import { List } from "./state/appStateReducer"
import { useState } from "react";

type ColumnProps = {
  text?: string
  id: string
  innerRef: (element: HTMLElement | null) => any;
  index: number
  provided: DraggableProvided
}

export const Column = ({ 
  text, 
  id, 
  innerRef,
  provided
}: ColumnProps) => {

  const { getTasksByListId, dispatch } = useAppState()
  const tasks = getTasksByListId(id)
  const [ error, setError ] = useState("")

  const onAddTask = (text: string) =>{
    if(text.length < 10 || text.length > 40){
      setError("Length is in 10 - 40")
    }else{
      dispatch(addTask(text, id))
    }
  }
  return (
    <ColumnContainer
      innerRef={innerRef}
      provided={provided}
    >
      <ColumnContent>
        <ColumnTitle className="truncate">{text}</ColumnTitle>
        <Droppable
          droppableId={id}
          type="CARD"
        >
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              //TODO: adding a space when no tasks
              className="min-h-[40px]"
            >
              <CardList 
                tasks={tasks}
                columnId={id}/>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <div className="flex flex-col">
          <AddNewItem
            toggleButtonText="+ Add another task"
            onAdd={text => onAddTask(text)}
            dark/>
            <div className="text-red-500 block bg-white">
            { error }
            </div>
          </div>
      </ColumnContent> 
    </ColumnContainer>
  )
}

type ColumnListProp = {
  lists: List[]
}

export const ColumnList = ({lists}: ColumnListProp) => {
  return (
    <>
      {lists.map((list, index) => (
        <Draggable
          index={index}
          draggableId={list.id}
          key={list.id}
        >
          {(provided) => (
            <Column 
              text={list.text} 
              id={list.id} 
              index={index}
              key={list.id}
              innerRef={provided.innerRef}
              provided={provided}
              // {...provided.draggableProps}
              // {...provided.dragHandleProps}
            />
          )}
        </Draggable>
      ))}
    </>
  )
}
