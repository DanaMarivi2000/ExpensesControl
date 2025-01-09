import React, { useEffect, useState } from 'react'
import { categories } from '../data/categories'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import 'react-calendar/dist/Calendar.css'
import { DraftExpense } from '../types'
import ErrorMesage from './ErrorMesage'
import { useBudget } from '../hooks/useBudget'
const ExpenseForm = () => {
const{state,dispatch, available}=useBudget()
    const[expense, setExpense]=useState<DraftExpense>({
        amount:0,
        expenseName:"",
        category:"",
        date:new Date()
    })
    const [error, setError]=useState("")
    const [previousAmount, setPreviousAmount]=useState(0)
    useEffect(()=>{
      if(state.editingId){
        const editingExpense=state.expenses.filter(currentExpense=>currentExpense.id===state.editingId)[0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)
        }
    },[state.editingId])
   
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>|React.ChangeEvent<HTMLSelectElement>)=>{
        const {name, value}=e.target
        const isAmountField=['amount'].includes(name)
        setExpense({...expense,[name]:isAmountField ? value===""?0:+value:value})
    }

const handleChangeDate=(date:Date|null)=>{
  setExpense(({
      ...expense, date:date
  }))
}
const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
  e.preventDefault()

  if(Object.values(expense).includes('')){
    setError("Todos los campos son obligatorios")
      return 
  }
  if((expense.amount-previousAmount)>available){
    setError('No alcanza el presupuesto')
    return
  }
  if(state.editingId){
    dispatch({type:'update-expense', payload:{expense:{id:state.editingId, ...expense}}})
  }else{
    dispatch({type:'add-expense', payload:{expense:expense}})
 }
   setExpense({
    amount:0,
    expenseName:"",
   category:"",
   date:new Date() 
  })
  setPreviousAmount(0)
}
  return (
    <>
      <form className='space-y-5' onSubmit={handleSubmit}>
        <legend className='uppercase text-center text-2xl font-black border-b-4 border-blue-500 py-2'>{state.editingId?'Guardar cambios':'Nuevo Gasto'}</legend>
       
       {error&&<ErrorMesage>{error}</ErrorMesage>}

        <div className="flex flex-col gap-2">
            <label htmlFor="expenseName" className="text-xl">Nombre Gasto: </label>
           <input type="text" 
            placeholder='Añade el nombre del gasto'
            className='bg-slate-100 p-2'
            id='expenseName'
            name='expenseName'
            value={expense.expenseName}
            onChange={handleChange}
            />       
        </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className='text-xl'>Cantidad:</label>
        <input type="number" id='amount' placeholder='Añade la cantidad del gasto: ej.300' className='bg-slate-100 p-2' name="amount" value={expense.amount===0?"":expense.amount} onChange={handleChange}/>
      </div> 
      
      <div>

      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className='text-xl'>Categoria:</label>
        <select name="category" id="category" className='bg-slate-100 p-2' value={expense.category} onChange={handleChange}>
            <option value="">--Seleccione--</option>
            {categories.map(category=>(
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
      </div>
      <div className='flex flex-col gap-2'>
        <label htmlFor="amount" className='text-xl'>Fecha Gasto:</label>
            <DatePicker className="bg-slate-100 p-2 border-0" selected={expense.date} onChange={handleChangeDate}/>
      </div>
      <input type="submit"
      className='bg-blue-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg'
      value={state.editingId?'Guardar Cambios':'Registrar Gasto'}
      />
      </form>
    </>
  )
}

export default ExpenseForm
