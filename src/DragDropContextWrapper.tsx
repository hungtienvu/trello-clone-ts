import { DragDropContext } from "react-beautiful-dnd"
import { useAppState } from "./state/AppStateContext"
import { DropResult } from "react-beautiful-dnd"
import {
  moveTask,
  moveList,
} from "./state/actions"

export const DragDropContextWrapper: React.FC = ({ children }) => {
  const { lists, dispatch } = useAppState()

  const onDragEnd = (result: DropResult): void => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    if (destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return;
    }
    if (type === "COLUMN") {
      const fromColumn = lists[source.index].id
      const toColumn = lists[destination.index].id
      dispatch(moveList(fromColumn, toColumn));
    }else{
      const fromColumn = source.droppableId
      const toColumn = destination.droppableId
      const task = draggableId
      dispatch(
        moveTask(task, null, fromColumn, toColumn)
      )
    }
  };

  return(
    <DragDropContext onDragEnd={onDragEnd}>
      { children }
    </DragDropContext>
  )
}
