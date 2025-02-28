import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../BaseURL';


function CreateTask() {
  const d = new Date();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [dueDate, setDueDate] = useState(null);
  const [createdAt, setCreatedAt] = useState(d);

  const navigate = useNavigate();

  const handleSubmit = () => {
    const data = { title, description, isCompleted, dueDate, createdAt };

    setLoading(true);
    axios
      .post(BaseURL + '/', data)
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
    <div className=' bg-gray-100 min-h-screen pb-16'>
      <div className='mx-8 text-center text-3xl md:text-5xl py-20 font-semibold' >Add a new task</div>
      {
        loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>

            <div className='px-4 mx-8 md:mx-32 py-4 rounded-xl bg-white shadow-md'>
              <div className=' text-center text-base md:text-xl font-medium'>
                Fill in the details.
              </div>
              <div className='md:mx-8 my-4'>
                <div className='text-base md:text-xl' >Title : </div>
                <input type='text' className='w-full px-4 py-1 my-2 rounded-lg border-black border-2 outline-none' value={title} onChange={(e) => { setTitle(e.target.value) }} />
              </div>

              <div className='md:mx-8 my-4'>
                <div className='text-base md:text-xl' >Description : </div>
                <input type='text' className='w-full px-4 py-1 my-2 rounded-lg border-black border-2 outline-none' value={description} onChange={(e) => { setDescription(e.target.value) }} />
              </div>

              <div className='md:mx-8 my-4'>
                <div className='text-base md:text-xl' >Is Completed ? : </div>
                <input type='checkbox' className='my-4 h-6 w-6' value={isCompleted} onChange={(e) => { setIsCompleted(e.target.value) }} />

              </div>

              <div className='flex flex-col mt-4 md:flex-row md:w-full justify-center gap-4' >
                <button
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-400 hover:text-black duration-300'
                  onClick={handleSubmit}
                >Add Task</button>
                <button
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-400 hover:text-black duration-300'
                  onClick={() => { navigate('/') }}
                >Go to List</button>

              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default CreateTask


