import { Dispatch } from "react"
import { BudgetActions, BudgetState } from "../reducers/budget-reducer"

export type budgetContext={
    state:BudgetState,
    dispatch:Dispatch<BudgetActions>
    totalExpenses:number,
    available:number,
}

type ValuePiece=Date|null
export type Value=ValuePiece|[ValuePiece, ValuePiece]

export type Expense={
    id:string
    expenseName:string
    amount:number
    category:string
    date:ValuePiece
}

export type DraftExpense=Omit<Expense,'id'>

export type Category={
    id:string
    name:string
    icon:string
}