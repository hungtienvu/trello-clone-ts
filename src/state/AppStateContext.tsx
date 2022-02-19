import { createContext, useEffect,  useContext, FC, Dispatch } from "react"
import { Action } from "./actions"
import {
  appStateReducer,
  AppState,
  List,
  Task
} from "./appStateReducer"
import { useImmerReducer } from "use-immer"
import { DragItem } from "../DragItem"
// import { save } from "../api"
import { withInitialState } from "../withInitialState"
import { doc, setDoc } from "firebase/firestore"
import { db } from "../utils/firebaseInit"

/**
 * The index attribute is for serialize order: React <=> Firebase
 *  */


const saveStateToFirebase = async (state: AppState) =>{
  const { lists } = state
  for(const [k, list] of lists.entries()){
    //TODO: how to fix this issue? any helps?
    const tasksInObjects: any = {}
    for(const [k, task] of list.tasks.entries()){
      tasksInObjects[task.id] = {
        id: task.id,
        text: task.text,
        index: k
      }
    }
    await setDoc(doc(db, "lists", list.id), {
      id: list.id,
      text: list.text,
      tasks: tasksInObjects,
      index: k
    });

  }
}

type AppSateContextProps = {
  lists: List[]
  getTasksByListId(id: string): Task[]
  dispatch: Dispatch<Action>
}

const AppSateContext = createContext<AppSateContextProps>(
  {} as AppSateContextProps
)


type AppStateProviderProps = {
  children: React.ReactNode
  initialState: AppState
}

/**
 * provide the App State using value under context provider
 */
export const AppStateProvider = withInitialState<AppStateProviderProps>(
  
  ({children, initialState}) => {

  // use Immer Reducer taking the reducers and initital state
  const [state, dispatch] = useImmerReducer(appStateReducer, initialState)

  //destruct the state object
  const {lists} = state

  //save sate when somethinge change?
  useEffect(() => {
    saveStateToFirebase(state)
    // save(state)
  }, [state])

  const getTasksByListId = (id: string) => {
    return lists.find( (list) => list.id === id )?.tasks || []
  }

  return (
    <AppSateContext.Provider value={{
        lists, 
        getTasksByListId, 
        dispatch 
      }}>
      {children}
    </AppSateContext.Provider>
  )

})

export const useAppState = () => {
  return useContext(AppSateContext)
}
