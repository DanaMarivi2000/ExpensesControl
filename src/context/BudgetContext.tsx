import { useReducer, createContext, ReactNode } from "react"
import { budgetReducer, initialState } from "../reducers/budget-reducer"
import { budgetContext } from "../types"
import { useMemo } from "react"
type BudgetProviderProps={
    children: ReactNode
}

export const BudgetContext=createContext<budgetContext>({} as budgetContext)
   

export const BudgetProvider=({children}:BudgetProviderProps)=>{

    const[state, dispatch]=useReducer(budgetReducer, initialState)
    console.log(state)
    
    const totalExpenses=useMemo(()=>state.expenses.reduce((total,expense)=>expense.amount+total,0),[state.expenses])
    const available=state.budget-totalExpenses   
    return (
        <BudgetContext.Provider value={{state,dispatch, totalExpenses, available}}>
            {children}
        </BudgetContext.Provider>
    )
}


