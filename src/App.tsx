import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { ProtectedRoute } from './components/ProtectedRoute'
import { PrivateHome } from './pages/private/PrivateHome'
import { Login } from './pages/public/Login'
import { Header } from './components/Header'
import { Play } from './pages/private/words/Play'
import { useAuth } from './context/auth/AuthProvider'
import { Enrollment } from './pages/public/Enrollment'
import { Role } from './context/auth/AuthContext'
import { ListWords } from './pages/private/words/List'
import { AddWord } from './pages/private/words/Add'
import './App.css'
import { Review } from './pages/private/words/Review';

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
            path='/words/play'
            element={
              <ProtectedRoute roles={[Role.ADMIN, Role.READER]}>
                <Play />
              </ProtectedRoute>
            } 
          />

          <Route
            path='/words/review'
            element={
              <ProtectedRoute roles={[Role.ADMIN, Role.READER]}>
                <Review />
              </ProtectedRoute>
            } 
          />

          <Route
            path='/words/add'
            element={
              <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
                <AddWord />
              </ProtectedRoute>
            } 
          />

          <Route
            path='/words/'
            element={
              <ProtectedRoute roles={[Role.ADMIN, Role.WRITER]}>
                <ListWords />
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
