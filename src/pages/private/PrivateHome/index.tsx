import { Link } from 'react-router-dom';
import { Role } from '../../../context/auth/AuthContext';
import { useAuth } from '../../../context/auth/AuthProvider'
import styles from './style.module.css'

export const PrivateHome = () => {

  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <p className={styles['user-name']}>Bienvenido(a) {user?.name}</p>
      <div>
        {
          user?.role === Role.ADMIN || user?.role === Role.WRITER ? (
            <div>
              <Link to='/words/add'>
                <p>Agregar palabra</p>
              </Link>
              <Link to='/words'>
                <p>Ver las palabras</p>
              </Link>
            </div>
          ) : null
        }

        {
          user?.role === Role.ADMIN || user?.role === Role.READER ? (
            <div>
              <Link to='/words/play'>
                <p>Palabras de hoy</p>
              </Link>
              <Link to='/words/review'>
                <p>Solo repaso</p>
              </Link>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}
