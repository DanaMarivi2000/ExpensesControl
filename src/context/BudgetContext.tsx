import { useReducer, createContext, ReactNode } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"
import { budgetContext } from "../types"

type BudgetProviderProps={
    children: ReactNode
}

export const BudgetContext=createContext<budgetContext>({} as budgetContext)
   

export const BudgetProvider=({children}:BudgetProviderProps)=>{

    const[state, dispatch]=useReducer(budgetReducer, initialState)
    console.log(state)
    return (
        <BudgetContext.Provider value={{state,dispatch}}>
            {children}
        </BudgetContext.Provider>
    )
}


