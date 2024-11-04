import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthProvider"
import PW from '../../assets/PlayWords.png'
import styles from './styles.module.css';
import { Icon } from "../Icon";

export const Header = () => {

  const { logout, user } = useAuth();

  return (
    <div className={styles.container}>
      <header>
        <div className={styles['logo-container']}>
          <Link to='/'>
            <img src={PW} alt="Logo de Play" className={styles.logo} />
          </Link>
        </div>
        
        <div>
          {
            user?.name
              ? (<div onClick={logout} style={{ cursor: 'pointer' }}>
                <Icon name="cerrar-sesion-02" size={15} color="#000" />
              </div>)
              : <p className={styles.name}>by. David Diaz H</p>
          }
        </div>
      </header>
    </div>
  )
}
