import React , {useState , useEffect} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';


import { MdOutlineAddBox , MdOutlineDelete} from 'react-icons/md';
import {BiInfoCircle} from 'react-icons/bi';
import {AiOutlineEdit} from 'react-icons/ai';

function Home() {
    const [tasks , setTasks] = useState([]);
    const [loading , setLoading] = useState(false);

    useEffect(()=>{
        setLoading(true);
        axios
            .get('http://localhost:3000/')
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

    return (
        <div className=' bg-gray-100 h-screen'>
            <div className=' text-center text-5xl py-20 font-semibold' >To-do List</div>
            {
                loading ? (
                    <div>
                        <Spinner/>
                    </div>
                ) : (
                    <div className=' mx-40 p-1 rounded-lg bg-white shadow-md'>
                        {
                            tasks.map((t)=>{
                                return(
                                    <div className=' flex justify-between mx-4 my-2'>
                                        {
                                            tasks.map((t)=>{
                                                return(
                                                    <div className='flex w-full justify-between'>
                                                        <input 
                                                            type="checkbox"
                                                            checked={t.isCompleted}
                                                            className="form-checkbox h-4 w-4 rounded-full text-black border-black focus:ring-0"
                                                        />
                                                        <div className=''> {t.title} </div>
                                                        <div>
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
                                );
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Home;