
import { Expense } from '../types'
import { formatDate } from '../helpers'
import AmountDisplay from './AmountDisplay'
import { categories } from '../data/categories'
import {LeadingActions, SwipeableList, SwipeableListItem,SwipeAction, TrailingActions} from 'react-swipeable-list'
import 'react-swipeable-list/dist/styles.css'
import { useMemo } from 'react'
import { useBudget } from '../hooks/useBudget'

type ExpenseDetailProps={
    expense:Expense
}
const ExpenseDetail = ({expense}:ExpenseDetailProps) => {
const {dispatch}=useBudget()
  const categoryInfo=useMemo(()=>categories.filter(category=>category.id===expense.id)[0],[expense])

  const leadingActions=()=>(
    <LeadingActions>
      <SwipeAction onClick={()=>{dispatch({type:'get-expense-by-id', payload:{id:expense.id}})}} >
        Actualizar
      </SwipeAction>
    </LeadingActions>
  )

  const trailingActions=()=>(
    <TrailingActions>
        <SwipeAction onClick={()=>{dispatch({type:'remove-expense',payload:{id:expense.id}})}} destructive={true}>
          Eliminar
        </SwipeAction>
    </TrailingActions>
  )
  

  return (
    <SwipeableList>
      <SwipeableListItem
      maxSwipe={1}
      leadingActions={leadingActions()}
      trailingActions={trailingActions()}
      
      >
    <>
      <div className="bg-white shadow-lg p10 w-full border-b border-gray-200">
        <div>
         <img src={`/icono_${categoryInfo.icon}.svg`} alt={`${categoryInfo.name}`} />
        </div>
        <div className='flex-1 space-y-2'>
            <p className='text-sm font-bold uppercase text-slate-500'>{categoryInfo.name}</p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">{formatDate(expense.date!.toString())}</p>
        </div>
        <AmountDisplay amount={expense.amount}/>
      </div>
    </>
    </SwipeableListItem>
    </SwipeableList>
  )
}
export default ExpenseDetail
