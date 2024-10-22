import { Route, Routes } from 'react-router-dom'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PrivateHome } from './pages/private/PrivateHome'
import { Login } from './pages/public/Login'
import { Header } from './components/Header'
import { Play } from './pages/private/Play'
import { useAuth } from './context/auth/AuthProvider'
import './App.css'
import { Enrollment } from './pages/public/Enrollment'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const { status } = useAuth();

  return (
    <>
      <Header />
      <div className='general-container'>
      
        <Routes>
          <Route path='/' element={ status === 'authenticated' ? <PrivateHome /> : <Login /> } />

          <Route
            path='/enrollment'
            element={
              <Enrollment />
            } 
          />

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
      <ToastContainer />
    </>
  )
}

export default App
