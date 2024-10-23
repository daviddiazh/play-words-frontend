import { useAuth } from "../../context/auth/AuthProvider"
import PW from '../../assets/PlayWords.png'
import styles from './styles.module.css';
import { Icon } from "../Icon";

export const Header = () => {

  const { logout, status } = useAuth();

  return (
    <div className={styles.container}>
      <header>
        <div className={styles['logo-container']}>
          <img src={PW} alt="Logo de Play" className={styles.logo} />
        </div>
        {
          // status === 'authenticated' && <button onClick={logout}>Logout</button>
          status === 'authenticated'
            ? (<div onClick={logout} style={{ cursor: 'pointer' }}>
              <Icon name="log-out-01" size={20} />
            </div>)
            : <p className={styles.name}>by. David Diaz H</p>
        }
      </header>
    </div>
  )
}
