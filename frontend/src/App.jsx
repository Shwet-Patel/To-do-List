import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import ShowTask from './pages/ShowTask';
import DeleteTask from './pages/DeleteTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Home/>}/>
        <Route path='/tasks/create' element = {<CreateTask/>}/>
        <Route path='/tasks/details/:id' element = {<ShowTask/>}/>
        <Route path='/tasks/edit/:id' element = {<EditTask/>}/>
        <Route path='/tasks/delete/:id' element = {<DeleteTask/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
