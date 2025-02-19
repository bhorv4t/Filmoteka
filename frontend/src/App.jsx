import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { Container } from 'react-bootstrap'
import NavBarEdunova from './components/NavBarEdunova'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import Pocetna from './pages/Pocetna'
import ZanroviPregled from './pages/zanrovi/ZanroviPregled'
import ZanroviDodaj from './pages/zanrovi/ZanroviDodaj'
import ZanroviPromjena from './pages/zanrovi/ZanroviPromjena'



function App() {

  return (
    <>
      <Container>
        <NavBarEdunova />
        
        <Routes>
          <Route path={RouteNames.HOME} element={<Pocetna />} />
          <Route path={RouteNames.ZANR_PREGLED} element={<ZanroviPregled />} />
          <Route path={RouteNames.ZANR_NOVI} element={<ZanroviDodaj />} />
          <Route path={RouteNames.ZANR_PROMJENA} element={<ZanroviPromjena />} />
        </Routes>

        <hr />
        &copy; Boris 2025
      </Container>
     
    </>
  )
}

export default App
