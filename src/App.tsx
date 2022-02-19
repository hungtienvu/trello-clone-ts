import { AddNewItem } from "./AddNewItem";
import { ColumnList } from "./Column";
import { useAppState } from "./state/AppStateContext"
import { addList } from "./state/actions"
import { AppContainer } from "./AppComponentsStyles"
import { Droppable } from "react-beautiful-dnd"
import { DragDropContextWrapper } from "./DragDropContextWrapper"
import { useState } from "react";

function App() {
  const { lists, dispatch } = useAppState()
  const [ error, setError ] = useState("")

  const onAddList = (text: string) =>{
    if(text.length < 10 || text.length > 40){
      setError("Length is in 10 - 40")
    }else{
      dispatch(addList(text))
    }
  }

  return (
    <DragDropContextWrapper>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
      >
        {provided =>  (
          //not sure how to fix this
            <AppContainer
              innerRef={provided.innerRef}
              provided={provided}
            >
              <ColumnList lists={lists}/>
              { provided.placeholder }
            
            <div className="flex flex-col">
            <AddNewItem 
              toggleButtonText="+ Add another list"
              onAdd={text => onAddList(text)} />
              <div className="text-red-500 block bg-white">
              { error }
              </div>
              </div>
          </AppContainer>
        )}
      </Droppable>
    </DragDropContextWrapper>
  );
}
export default App;
