import { AppState } from "./state/appStateReducer"

const API_URL="http://localhost:4400"

export const save = (payload: AppState) => {
  return fetch(`${API_URL}/save`, {
    method: "POST",
    headers :{
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
  .then((response) => {
    if(response.ok){
      return response.json()
    }else{
      throw new Error("Error while saving the state")
    }
  })
}

export const load = () => {
  return fetch(`${API_URL}/load`).then(
    (response) => {
      if(response.ok){
        return response.json() as Promise<AppState>
      }else{
        throw new Error("Error while loading the state")
      }
    }
  )
}