import React from 'react'
import {Route,Routes} from 'react-router-dom'
import Home from '../pages/Home';
import MyTeam from '../pages/MyTeam';
import  {pages} from '../common/constants';
import Header from '../components/organisms/Header';
function RoutePage() {
  return (
  <>
  <Header/>
    <Routes>
        <Route exact path={'/'} element={<Home/>}/>
        <Route exact path={pages.HOME} element={<Home/>}/>
        <Route exact path={pages.MYTEAM} element={<MyTeam/>}/>
    </Routes>
 </>)
  
}

export default RoutePage