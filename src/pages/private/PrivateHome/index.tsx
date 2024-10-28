import { Link } from 'react-router-dom';
import { Role } from '../../../context/auth/AuthContext';
import { useAuth } from '../../../context/auth/AuthProvider'
import styles from './style.module.css'

export const PrivateHome = () => {

  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <p className={styles['user-name']}>Bienvenido(a) {user?.name}</p>
      <div style={{ marginTop: 25 }}>
        {
          user?.role === Role.ADMIN || user?.role === Role.WRITER ? (
            <div className={styles.grid}>
              <Link to='/words/add' className={styles.card}>
                <p>Agregar palabra</p>
              </Link>
              <Link to='/words' className={styles.card}>
                <p>Lista de palabras</p>
              </Link>
            </div>
          ) : null
        }

        {
          user?.role === Role.ADMIN || user?.role === Role.READER ? (
            <div className={styles.grid}>
              <Link to='/words/play' className={styles.card}>
                <p>Palabras de hoy</p>
              </Link>
              <Link to='/words/review' className={styles.card}>
                <p>Solo repaso</p>
              </Link>
            </div>
          ) : null
        }
      </div>
    </div>
  )
}
