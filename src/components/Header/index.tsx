import { useAuth } from "../../context/auth/AuthProvider"
import PW from '../../assets/PlayWords.png'
import styles from './styles.module.css';

export const Header = () => {

  const { logout, status } = useAuth();

  return (
    <div>
      <div className={styles['logo-container']}>
        <img src={PW} alt="Logo de Play" className={styles.logo} />
      </div>
      {
        status === 'authenticated' && <button onClick={logout}>Logout</button>
      }
    </div>
  )
}
