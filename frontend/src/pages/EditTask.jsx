import React, { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../BaseURL';

function EditTask() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);

  const id = useParams().id;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get(BaseURL + `/${id}`)
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setIsCompleted(response.data.isCompleted);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);



  const handleSubmit = () => {
    const data = { title, description, isCompleted };

    setLoading(true);
    axios
      .put(BaseURL + `/${id}`, data)
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
      {
        loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <>
            <div className='mx-8 text-center text-3xl md:text-5xl py-20 font-semibold' >{loading ? '...' : title}</div>
            <div className='  mx-8 md:mx-32 px-4 py-4 rounded-xl bg-white shadow-md'>
              <div className=' text-center text-bsae md:text-xl font-medium'>
                Edit the details.
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
                <input type='checkbox' className='my-2 h-6 w-6' checked={isCompleted} onChange={(e) => { setIsCompleted(e.target.checked) }} />
              </div>

              <div className='flex flex-col mt-4 md:flex-row md:w-full justify-center gap-4' >
                <button
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-400 hover:text-black duration-300'
                  onClick={() => { navigate('/') }}
                >Go to List</button>
                <button
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-400 hover:text-black duration-300'
                  onClick={handleSubmit}
                >Edit Task</button>
              </div>
            </div>
          </>
        )
      }
    </div>
  )
}

export default EditTask