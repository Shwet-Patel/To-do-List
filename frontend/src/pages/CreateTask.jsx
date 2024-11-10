import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CreateTask() {
  const d = new Date();
  const [loading , setLoading] = useState(false);
  const [title , setTitle] = useState('');
  const [description , setDescription] = useState('');
  const [isCompleted,setIsCompleted] = useState(false);
  const [dueDate,setDueDate] = useState(null);
  const [createdAt,setCreatedAt] = useState(d);

  const navigate = useNavigate();

  const handleSubmit = ()=>{
    const data = { title, description, isCompleted, dueDate, createdAt };

    setLoading(true);
    axios
      .post( 'http://localhost:3000/', data)
      .then(() => {
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        alert("an error occured");
        console.log("an error occured.");
      });
  };

  return (
    <div className=' bg-gray-100 h-full pb-20'>
      <div className=' text-center text-5xl py-20 font-semibold' >Add a new task</div>
      {
        loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
          
            <div className=' mx-20 px-4 py-4 rounded-xl bg-white shadow-md'>
              <div className=' text-center text-xl font-medium'>
                Fill in the details.
              </div>
              <div className='mx-8 my-4'>
                <div className='text-xl' >Title : </div>
                <input type='text' className='w-full px-4 py-1 my-4 rounded-lg border-black border-2 outline-none' value={title} onChange={(e)=>{setTitle(e.target.value)}} />
              </div>

              <div className='mx-8 my-4'>
                <div className='text-xl' >Description : </div>
                <input type='text' className='w-full px-4 py-1 my-4 rounded-lg border-black border-2 outline-none' value={description} onChange={(e)=>{setDescription(e.target.value)}} />
              </div>

              <div className='mx-8 my-4'>
                <div className='text-xl' >Is Completed ? : </div>
                <input type='checkbox' className='my-4 h-6 w-6' value={isCompleted} onChange={(e)=>{setIsCompleted(e.target.value)}} />
                
              </div>

              <div className='mx-8 my-4'>
                <div className='text-xl' > Due Date : </div>
                <input type='date' className='px-4 py-1 my-4 rounded-lg border-black border-2 outline-none' value={dueDate} onChange={(e)=>{setDueDate(e.target.value)}} />
              </div>
              
              <div className='flex w-full justify-center gap-x-8' >
                <button
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-400 hover:text-black duration-300'
                  onClick={() => { navigate('/') }}
                >Go to List</button>
                <button
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-400 hover:text-black duration-300'
                  onClick={handleSubmit}
                >Add Task</button>
              </div>
            </div>
            </>
        )
      }
    </div>
  )
}

export default CreateTask


