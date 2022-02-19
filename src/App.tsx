import { AddNewItem } from "./AddNewItem";
import { ColumnList } from "./Column";
import { useAppState } from "./state/AppStateContext"
import { addList } from "./state/actions"
import { AppContainer } from "./AppComponentsStyles"
import { Droppable } from "react-beautiful-dnd"
import { DragDropContextWrapper } from "./DragDropContextWrapper"

function App() {
  const { lists, dispatch } = useAppState()

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
            <AddNewItem 
              toggleButtonText="+ Add another list"
              onAdd={text => dispatch(addList(text))} />
          </AppContainer>
        )}
      </Droppable>
    </DragDropContextWrapper>
  );
}
export default App;
