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
    <div className=' bg-gray-100 h-screen'>
    <div className=' text-center text-5xl py-20 font-semibold' >{ loading ? 'To-do List' : task.title }</div>
    {
        loading ? (
            <div>
                <Spinner/>
            </div>
        ) : (
            <div className=' mx-40 px-4 py-4 rounded-xl bg-white shadow-md'>
              <div className='mx-8 my-4'>
                <div className=' text-xl' >Id : </div>
                <div className=' text.md text-gray-800'> {task._id} </div>
              </div>
              <div className='mx-8 my-4'>
                <div className=' text-xl' >Description : </div>
                <div className=' text.md text-gray-800'> {task.description} </div>
              </div>
              <div className='mx-8 my-4'>
                <div className=' text-xl' >Is completed : </div>
                <div className=' text.md text-gray-800'> {task.isCompleted ? 'Yes' : 'No'} </div>
              </div>
              <div className='mx-8 my-4'>
                <div className=' text-xl' >Due Date : </div>
                <div className=' text.md text-gray-800'> {new Date(task.dueDate).toLocaleDateString('en-us',{
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} </div>
              </div>
              <div className='mx-8 my-4'>
                <div className=' text-xl' >Created Date : </div>
                <div className=' text.md text-gray-800'> {new Date(task.createdAt).toLocaleDateString('en-us',{
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })} </div>
              </div>

              <div className='flex w-full justify-center gap-x-8' >
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