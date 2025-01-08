import {useMemo} from 'react'
import ExpenseDetail from './ExpenseDetail'
import { useBudget } from '../hooks/useBudget'
const ExpenseList = () => {
  
  const {state}=useBudget()
  const filteredExpenses=state.id?state.expenses.filter(expense=>expense.category===state.id):state.expenses
  const isEmpty=useMemo(()=>filteredExpenses.length===0,[state.expenses]) 
  
  return (
    <>
    <div className="mt-10 bg-white shadow-lg rounded-lg p-10">
      {isEmpty? <p className='text-gray-600 text-2xl font-bold'>No hay gastos aún</p>:(
        <>
      <p>
        Listado de Gastos.
      </p>
        {filteredExpenses.map(expense=>(
          <ExpenseDetail key={expense.id} expense={expense}/>
    ))}
        </>
  )}
      </div>
    </>
  )
}

export default ExpenseList
