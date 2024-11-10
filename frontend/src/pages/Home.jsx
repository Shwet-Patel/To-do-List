import React , {useState , useEffect} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link , useNavigate } from 'react-router-dom';
import {BaseURL} from '../BaseURL';


import { MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';
import {BiInfoCircle} from 'react-icons/bi';
import {AiOutlineEdit} from 'react-icons/ai';

function Home() {
    const [mode,setMode] = useState(0);
    const [tasks , setTasks] = useState([]);
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        setLoading(true);
        axios
            .get(BaseURL + '/')
            .then((response)=>{
                console.log(response);
                setLoading(false);
                setTasks(response.data);
            })
            .catch((error)=>{
                console.log(error);
                setLoading(false);
            });
        
    } ,[]);

    const handleCheckBox = (t) =>{
        t.isCompleted = !t.isCompleted;
        setLoading(true);
        axios
        .put(BaseURL + `/${t._id}`, t)
        .then(() => {
            setLoading(false);
        })
        .catch((error) => {
            t.isCompleted = !t.isCompleted;
            setLoading(false);
            alert("an error occured");
            console.log(error);
            
        });
    };

    return (
        <div className=' bg-gray-100 min-h-screen pb-16'>
            <div className='mx-8 text-center text-3xl md:text-5xl py-20 font-semibold' >To-do List</div>
            <div className='flex my-4 flex-row w-full justify-center gap-4' >
                <button 
                  className= {`px-4 py-2 ${mode === 0 ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200 hover:text-black'} rounded-lg duration-300`}
                  onClick={() => {setMode(0)}}
                  >All</button>
                <button 
                  className={`px-4 py-2 ${mode === 1 ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200 hover:text-black'} rounded-lg  duration-300`}
                  onClick={ () => {setMode(1)}}
                  >Completed</button>
                <button 
                  className={`px-4 py-2 ${mode === 2 ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-200 hover:text-black'} rounded-lg  duration-300`}
                  onClick={() => {setMode(2)}}
                  >Incomplete</button>
            </div>
            {
                loading ? (
                    <div>
                        <Spinner/>
                    </div>
                ) : (
                    <div>
                        <div className=' mx-8 md:mx-32 p-1 rounded-xl bg-white shadow-md'>
                            {
                                <div className='mx-4'>
                                    {
                                        tasks.map((t)=>{
                                            if((mode === 1 && t.isCompleted === false) || (mode === 2 && t.isCompleted === true) )
                                            {
                                                return(
                                                    <div></div>
                                                );
                                            }
                                            return(
                                                <div key={t._id} className='flex flex-col md:flex-row w-full justify-between my-4'>
                                                    <div className='flex gap-x-4'>
                                                        <input 
                                                            type="checkbox"
                                                            checked={t.isCompleted}
                                                            onChange={()=>{ handleCheckBox(t); }}
                                                            className="form-checkbox my-2 h-4 w-4 rounded-full text-black border-black focus:ring-0"
                                                        />
                                                        <div className={`text-lg font-semibold ${t.isCompleted ? ' line-through text-gray-600 italic' : ''} `}> {t.title} </div>
                                                    </div>
                                                    <div className='flex gap-x-2 my-2' >
                                                        <Link to={`/tasks/details/${t._id}`}>
                                                            <BiInfoCircle className='text-xl' />
                                                        </Link>
                                                        <Link to={`/tasks/edit/${t._id}`}>
                                                            <AiOutlineEdit className='text-xl' />
                                                        </Link>
                                                        <Link to={`/tasks/delete/${t._id}`}>
                                                            <MdOutlineDelete className='text-xl' />
                                                        </Link>
                                                    </div>
                                                    
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            }
                        </div>
                        <div className='flex flex-col mt-4 md:flex-row md:w-full justify-center' >
                            <button 
                            className=' mx-8 md:px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-200 hover:text-black duration-300'
                            onClick={() => {navigate('/tasks/create')}}>Add Task</button>
                            
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default Home;