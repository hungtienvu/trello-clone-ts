import { useState, useEffect} from "react"
import { AppState } from "./state/appStateReducer"
import { load } from "./api"
import { collection, query, orderBy, getDocs} from "firebase/firestore"; 
import { db } from "./utils/firebaseInit"
import { Task, List } from "./state/appStateReducer"


type InjectedProps = {
  initialState: AppState
}

/**
 * generic type accepts the TBaseProps type variable
 * use Omit to remove the fileds of InjectedProps type from it
 */
type PropsWithoutInjected<TBaseProps> = Omit<
  TBaseProps, 
  keyof InjectedProps>

//LOADING State from FIREBASE

const loadStateFirebase = async () => {
  const listsRef = collection(db, "lists")
  const q = query(listsRef, orderBy("index"))
  const querySnapshot = await getDocs(q)

  const loadedLists:List[] = []

  querySnapshot.forEach((doc) => {
    const list = doc.data()
    const tasks:Task[] = []

    for (const [k, task] of Object.entries(list.tasks)){
      tasks.push(task)
    }

    loadedLists.push(
      {
        id: list.id,
        text: list.text,
        tasks: tasks
      }
    )
  })
  return loadedLists
}

/**
 * 
 * @param WrappedComponent intersection type contains both TProps and 
 * InjectedProps
 * @returns nameless function component
 */
export function withInitialState<TProps>(
  WrappedComponent: React.ComponentType<PropsWithoutInjected<TProps>
  & InjectedProps>
){
  return(props: PropsWithoutInjected<TProps>) => {
    const [inititalState, setInitialState] = useState<AppState>({
      lists: []
    })
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<Error | undefined>()

    useEffect(() => {

      const fetchInitialState = async () => {
        try {
          // const data_local = await load()
          const data = await loadStateFirebase()
          setInitialState({lists: data})
        } catch(e){
          setError(e)
        }
        setIsLoading(false)
      }

      fetchInitialState()

    }, [])
    
    if (isLoading) {
      return <div>Loading</div>
    }

    if (error) {
      return <div>{error.message}</div>
    }

    return <WrappedComponent {...props} initialState={inititalState}/>
  }
}
