import {useMemo} from 'react'
import ExpenseDetail from './ExpenseDetail'
import { useBudget } from '../hooks/useBudget'
const ExpenseList = () => {
  
  const {state}=useBudget()
  const isEmpty=useMemo(()=>state.expenses.length===0,[state.expenses]) 
  return (
    <>
    <div className="mt-10">
      {isEmpty? <p className='text-gray-600 text-2xl font-bold'>No hay gastos aún</p>:(

        <>
      <p>
        Listado de Gastos.
      </p>
        {state.expenses.map(expense=>(
          <ExpenseDetail key={expense.id} expense={expense}/>
    ))}
        </>
  )}
      </div>
    </>
  )
}

export default ExpenseList
