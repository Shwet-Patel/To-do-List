import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { BaseURL } from '../BaseURL';

function DeleteTask() {
  const id = useParams().id;
  const [task,setTask] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    setLoading(true);
    axios.get( BaseURL + `/${id}`)
    .then((response)=>{
      console.log(response.data);
      setLoading(false);
      setTask(response.data);
    })
    .catch((err)=>{
      setLoading(false);
      console.log(err);
    });
  },[id]);

  const handleDelete = () => {
    setLoading(true);
    axios.delete(  BaseURL + `/${id}`)
      .then((response) => {
        console.log(response);
        setLoading(false);
        navigate('/');
      })
      .catch((error) => {
        alert("an error occured!");
        console.log(error);
        setLoading(false);
      });
  }


  return (
    <div className=' bg-gray-100 h-screen'>
      <div className=' text-center text-5xl py-20 font-semibold' >{ loading ? '...' : task.title }</div>
      {
        loading ? (
          <div>
            <Spinner />
          </div>
        ) : (
          <div className=' mx-20 rounded-xl bg-white shadow-md'>
            <div className='py-4 text-center text-xl font-medium'>
              Are you sure you want to delete the following task?
            </div>

            <div className=''>
              <div className='mx-8 my-4'>
                <div className=' text-xl' >Title : </div>
                <div className=' text.md text-gray-800'> {task.title} </div>
              </div>
              <div className='mx-8 my-4'>
                <div className=' text-xl' >Description : </div>
                <div className=' text.md text-gray-800'> {task.description} </div>
              </div>
              <div className='mx-8 my-4'>
                <div className=' text-xl' >Is completed : </div>
                <div className=' text.md text-gray-800'> {task.isCompleted ? 'Yes' : 'No'} </div>
              </div>
            </div>

            <div className='py-4 flex w-full justify-center gap-x-8' >
                <button 
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-400 hover:text-black duration-300'
                  onClick={() => {navigate('/')}}
                  >No, go back</button>
                <button 
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-400 hover:text-black duration-300'
                  onClick={handleDelete}
                  >Yes, delete</button>
              </div>
          </div>
        )
      }
    </div>
  )
}

export default DeleteTask;