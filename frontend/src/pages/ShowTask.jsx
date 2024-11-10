import React , {useState , useEffect} from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../BaseURL';

function ShowTask() {

  const [task , setTask] = useState({});
  const [loading , setLoading] = useState(false);
  const id = useParams().id;

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
  },[]);

  return (
    <div className=' bg-gray-100 min-h-screen pb-16'>
    <div className='mx-8 text-center text-3xl md:text-5xl py-20 font-semibold' >{ loading ? 'To-do List' : task.title }</div>
    {
        loading ? (
            <div>
                <Spinner/>
            </div>
        ) : (
            <div className='mx-8 md:mx-32 px-4 py-4 rounded-xl bg-white shadow-md'>
              <div className='md:mx-8 my-4'>
                <div className=' text-base md:text-xl' >Id : </div>
                <div className=' text-base text-gray-800'> {task._id} </div>
              </div>
              <div className='md:mx-8 my-4'>
                <div className=' text-base md:text-xl' >Description : </div>
                <div className=' text-base text-gray-800'> {task.description} </div>
              </div>
              <div className='md:mx-8 my-4'>
                <div className='  text-base md:text-xl' >Is completed : </div>
                <div className=' text-base text-gray-800'> {task.isCompleted ? 'Yes' : 'No'} </div>
              </div>
              <div className='md:mx-8 my-4'>
                <div className='  text-base md:text-xl' >Due Date : </div>
                <div className=' text-base text-gray-800'> {new Date(task.dueDate).toLocaleDateString('en-us',{
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} </div>
              </div>
              <div className='md:mx-8 my-4'>
                <div className='  text-base md:text-xl' >Created Date : </div>
                <div className=' text-base text-gray-800'> {new Date(task.createdAt).toLocaleDateString('en-us',{
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} </div>
              </div>

              <div className='flex flex-col mt-4 md:flex-row md:w-full justify-center gap-4' >
                <button 
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-200 hover:text-black duration-300'
                  onClick={() => {navigate('/')}}
                  >Go to List</button>
                <button 
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-200 hover:text-black duration-300'
                  onClick={ () => {navigate(`/tasks/edit/${task._id}`)}}
                  >Edit Task</button>
                <button 
                  className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-200 hover:text-black duration-300'
                  onClick={() => {navigate(`/tasks/delete/${task._id}`)}}
                  >Delete Task</button>
              </div>
            </div>
        )
    }
</div>
  )
}

export default ShowTask