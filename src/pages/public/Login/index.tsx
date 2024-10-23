import { Link } from 'react-router-dom';
import { Input } from '../../../components/Input'
import { useAuth } from '../../../context/auth/AuthProvider';
import { useForm } from '../../../hooks/useForm'
import styles from './styles.module.css'
import { FormEvent } from 'react';

export const Login = () => {

    const { email, password, onInputChange } = useForm({
        email: '',
        password: ''
    });

    const { login } = useAuth();

    const onSubmit = async (e: FormEvent<HTMLFormElement | HTMLFormElement>) => {
        e.preventDefault();
        login({ email, password })
    }

    return (
        <div style={{ width: '100%', height: '98vh' }}>
            <div className={styles.loginContainer}>
                <div className={styles.loginBox}>
                    <h2 className={styles.title}>Iniciar sesión</h2>
                    {/* <form 
                        className={styles.loginForm} 
                        onSubmit={(e) => onSubmit(e)}
                    > */}
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
                            // type="submit" 
                            className={styles.loginButton}
                            onClick={onSubmit}
                        >
                            Ingresar
                        </button>
                    {/* </form> */}

                    <p className={styles.o}>ó</p>

                    <div style={{ marginTop: 15 }}>
                        <Link to='/enrollment' className={styles.link}>
                            <p>¿No tienes una? Crea una cuenta gratis</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
