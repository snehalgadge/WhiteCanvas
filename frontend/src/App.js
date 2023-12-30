import React from 'react'
import Forms from './components/Form/Forms';
import {  Routes, Route } from "react-router-dom"
import RoomPage from './pages/RoomPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={ <Forms /> } />
      <Route path='/:roomId' element={ <RoomPage />}/>
    </Routes>
     
  )
}

export default App
