import { useState } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Purchases from './pages/Purchases'
import Login from './pages/Login'
import ProductsId from './pages/ProductsId'
import AppNavbar from './components/AppNavbar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'

function App() {

  const isLoading = useSelector(state => state.isLoading)

  return (
    <HashRouter>
      <AppNavbar />
      {isLoading && <LoadingScreen />}
      <Container className='my-5' fluid>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products/:id' element={<ProductsId />} />
          <Route path='/login' element={<Login />} />
          <Route path='/purchases' element={<Purchases />} />
        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
