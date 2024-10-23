import { useAuth } from "../../context/auth/AuthProvider"
import PW from '../../assets/PlayWords.png'
import styles from './styles.module.css';
import { Icon } from "../Icon";
import { Link } from "react-router-dom";

export const Header = () => {

  const { logout, status } = useAuth();

  return (
    <div className={styles.container}>
      <header>
        <div className={styles['logo-container']}>
          <Link to='/'>
            <img src={PW} alt="Logo de Play" className={styles.logo} />
          </Link>
        </div>
        {
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
