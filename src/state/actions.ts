import { DragItem } from "../DragItem"

export type Action = 
  | { type: "ADD_LIST", payload: string } 
  | { type: "ADD_TASK", payload: { text: string, listId: string } }
  | { type: "TOGGLE_COMPLETE", payload: { taskId: string, listId: string } } 
  | { type: "MOVE_LIST", payload: {draggedId: string, hoverId: string} }
  | { type: "SET_DRAGGED_ITEM", payload: DragItem | null }
  | { type: "MOVE_TASK", payload: { 
        draggedItemId: string
        hoveredItemId: string | null
        sourceColumnId: string
        targetColumnId: string
      } 
    }

//ACTION CREATORS
export function addTask(text: string,listId: string): Action {
  return {
    type: "ADD_TASK",
    payload: {
      text,
      listId,
    },
  }
}
export const addList = (
  text: string,
): Action => {
  return(
    {
      type: "ADD_LIST",
      payload: text
    }
  )
}

export function moveList(draggedId: string, hoverId: string ): Action{
  return {
    type: "MOVE_LIST",
    payload: {
      draggedId,
      hoverId,
    },
  };
}

export function setDraggedItem(draggedItem: DragItem | null): Action {
  return {
    type: "SET_DRAGGED_ITEM",
    payload: draggedItem
  }
}

export function toggleComplete(taskId: string, listId: string): Action {
  return {
    type: "TOGGLE_COMPLETE",
    payload: {
      taskId,
      listId
    }
  }
}

export function moveTask(
  draggedItemId: string,
  hoveredItemId: string | null,
  sourceColumnId: string,
  targetColumnId: string
): Action {
  return({
    type: "MOVE_TASK",
    payload: {
      draggedItemId,
      hoveredItemId,
      sourceColumnId,
      targetColumnId
    }
  })
}
