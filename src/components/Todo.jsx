import React, { useEffect, useRef, useState } from 'react'
import task_icon from '../assets/task_icon.png'
import Todoitems from './Todoitems'

const Todo = () => {


const [taskList, settaskList] = useState(localStorage.getItem("tasks")? JSON.parse(localStorage.getItem("tasks")) : []);

const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();

        if(inputText === ""){
            return null;
        }
        const newTask = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        settaskList((prev)=> [...prev, newTask])
        inputRef.current.value = "";
    }

    const deleteTask = (id) => {
        settaskList((prevTask) => {
            return prevTask.filter((todo) => todo.id !== id)
        })
    }

    const toggle = (id) =>{
        settaskList((prevTasks)=>{
            return prevTasks.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("tasks" , JSON.stringify(taskList))
    },[taskList])

  return (
    <div className='bg-white border-2 border-black place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>
      
        {/* title */}

        <div className='flex items-center mt-7 gap-2'>
            <img className='w-8' src={task_icon} alt="" />
            <h1 className='text-3xl font-semibold'>Task Tracker</h1>
        </div>

        {/* input box */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full'>
            <input ref={inputRef} className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-700' type="text" placeholder='Enter Your Task' />
            <button onClick={add} className='rounded-full bg-purple-900 w-32 h-14 text-white text-lg font-medium cursor-pointer'>ADD TASK</button>
        </div>

        {/* task list */}
        <div>
        {taskList.map((item, index)=>{
            return <Todoitems key={index} text={item.text} id={item.id} isComplete={item.isComplete} deleteTask={deleteTask} toggle={toggle}/>
        })}
        
        </div>

    </div>
  )
}

export default Todo
