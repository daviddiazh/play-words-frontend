import { Link } from 'react-router-dom';
import { Input } from '../../../components/Input'
import { useAuth } from '../../../context/auth/AuthProvider';
import { useForm } from '../../../hooks/useForm'
import styles from './styles.module.css'
import { FormEvent } from 'react';

export const Enrollment = () => {

    const { name, email, password, onInputChange } = useForm({
      name: '',
      email: '',
      password: '',
    });

    const { enrollment } = useAuth();

    const onSubmit = async (e: FormEvent<HTMLFormElement | HTMLFormElement>) => {
      e.preventDefault();
      enrollment({ email, password, name })
    }

    return (
      <div style={{ width: '100%', height: '98vh' }}>
        <div className={styles.loginContainer}>
          <div className={styles.loginBox}>
            <h2 className={styles.title}>Crea una cuenta</h2>
            <form 
              className={styles.loginForm} 
              onSubmit={(e) => onSubmit(e)}
            >
              <Input
                name='name'
                onChange={onInputChange}
                placeholder='Nombre Completo'
                value={name}
                required
                type='text'
              />
              <Input
                name='email'
                onChange={onInputChange}
                placeholder='Correo Eléctronico'
                value={email}
                required
                type='email'
              />
              <Input
                name='password'
                onChange={onInputChange}
                placeholder='Contraseña'
                value={password}
                required
                type='password'
              />
              <button 
                type="submit" 
                className={styles.loginButton}
              >
                Ingresar
              </button>
            </form>

            <p className={styles.o}>ó</p>

            <div style={{ marginTop: 15 }}>
              <Link to='/' className={styles.link}>
                <p>¿Ya tienes una? Inicia sesión</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
}
