import { InputProps } from './interface'
import styles from './styles.module.css'

export const Input = ({ 
    name, 
    placeholder, 
    value, 
    required, 
    type,
    isError,
    onChange,
}: InputProps) => {
    return (
        <div style={{ width: '100%' }}>
            <input 
                type={type}
                className={isError ? styles.inputError : styles.input}
                placeholder={placeholder}
                required={required}
                name={name}
                value={value}
                onChange={onChange}
                autoComplete='off'
            />
            {
                isError && <p className={styles.textError}>La respuesta ingresada es incorrecta, pero puedes intentarlo de nuevo</p>
            }
        </div>
    )
}
