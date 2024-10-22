import { InputProps } from './interface'
import styles from './styles.module.css'

export const Input = ({ 
    name, 
    placeholder, 
    value, 
    required, 
    type,
    onChange,
}: InputProps) => {
    return (
        <input 
            type={type}
            className={styles.input}
            placeholder={placeholder}
            required={required}
            name={name}
            value={value}
            onChange={onChange}
            autoComplete='off'
        />
    )
}
