import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './Pages/Home/Home'
import Paper from './Pages/Paper/Paper'
import SubjectTest from './Pages/SubjectTest/SubjectTest'
import FullTest from './Pages/FullTest/FullTest'
import ChapterTest from './Pages/ChapterTest/ChapterTest'
import PreviousTest from './Pages/PreviousTest/PreviousTest'
import Instructions from './Pages/Instructions/Instructions';
import General_intructions_page from './Pages/General_intructions_page/General_intructions_page'

function App() {
  return (
    <BrowserRouter>
    {/* <Instructions/> */}
       <Routes>
          <Route path='/' element={<Home/>}/>
        <Route path='/Paper' element={<Paper />} />
        <Route path='/SubjectTest' element={<SubjectTest/>} />
        <Route path='/FullTest' element={<FullTest />} />
        <Route path='/ChapterTest' element={<ChapterTest />} />
        <Route path='/PreviousTest' element={<PreviousTest />} />
        <Route path='/Instructions' element={<Instructions />} />
        <Route path='/General_intructions_page' element={<General_intructions_page/>}/>
       </Routes>
    </BrowserRouter>

  );
}

export default App;
