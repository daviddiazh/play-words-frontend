import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PrivateHome } from './pages/private/PrivateHome'
import { Login } from './pages/public/Login'
import { Header } from './components/Header'
import { Play } from './pages/private/Play'
import { useAuth } from './context/auth/AuthProvider'
import './App.css'

function App() {

  const { status } = useAuth();

  console.log({ status })

  return (
    <div className='general-container'>
      <Header />
    
      <Routes>
        <Route path='/' element={ status === 'authenticated' ? <PrivateHome /> : <Login /> } />

        <Route
          path='/play'
          element={
            <ProtectedRoute>
              <Play />
            </ProtectedRoute>
          } 
        />

        <Route path='/*' element={ status === 'authenticated' ? <PrivateHome /> : <Login /> } />
      </Routes>
    </div>
  )
}

export default App
