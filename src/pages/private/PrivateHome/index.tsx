import { useAuth } from '../../../context/auth/AuthProvider'
import styles from './style.module.css'

export const PrivateHome = () => {

  const { user } = useAuth();

  return (
    <div className={styles.container}>
      <p className={styles['user-name']}>Bienvenido(a) {user?.name}</p>
    </div>
  )
}
