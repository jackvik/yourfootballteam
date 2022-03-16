import React from 'react'
import {Route,Routes} from 'react-router-dom'
import  {pages} from '../common/constants';
import NotFound from '../pages/NotFound';
const Home = React.lazy(()=>import('../pages/Home'));
const MyTeam = React.lazy(()=>import('../pages/MyTeam'));
const Header = React.lazy(()=>import('../components/organisms/Header'));
function RoutePage() {
  return (
  <>
  {<Header/>}
    <Routes>
        <Route exact path={'/'} element={<React.Suspense fallback={<>...</>}>
        <Home />
      </React.Suspense>}/>
        <Route exact path={pages.HOME} element={<React.Suspense fallback={<>...</>}>
        <Home />
      </React.Suspense>}/>
        <Route exact path={pages.MYTEAM} element={<React.Suspense fallback={<>...</>}>
        <MyTeam />
      </React.Suspense>}/>
      <Route path="*" element={<NotFound/>} />
    </Routes>
 </>)
  
}

export default RoutePage