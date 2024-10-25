import { useState } from "react";
import { useAuth } from "../../../../context/auth/AuthProvider";
import { useAxios } from "../../../../hooks/useAxios";
import { currentDate } from "../../../../utils/current-date";
import { Input } from "../../../../components/Input";
import { useForm } from "../../../../hooks/useForm";
import styles from './styles.module.css'

export const Play = () => {
  const [ words, setWords ] = useState<any[]>([]);
  const [ index, setIndex ] = useState(0);

  const { logout } = useAuth();
  const { post } = useAxios({
    logout
  });
  const { answer, onInputChange, onResetForm } = useForm({
    answer: '',
  });

  const fetch = async () => {
    const resp = await post('/api/exam/today', { today: currentDate })
    setWords(resp)
  }

  const validateAnswer = () => {
    onResetForm('answer')
    setIndex(index + 1) //todo
  }

  return (
    <div className={styles.container}>
      {
        !words.length && !index && <button className={styles.btn} onClick={fetch}>Comenzar juego</button>
      }
      
      {
        words.length ? (
          <div className={styles['play-container']}>
            <p className={styles.word}>{ words[index]?.translations?.[0] }</p>
            {/* <p>{ words[index]?.sentence }</p> */}
            <Input 
              name='answer'
              placeholder="Ingresa tu respuesta"
              onChange={onInputChange}
              value={answer}
              required
              key="text"
            />
            <button 
              onClick={validateAnswer}
              className={styles.btn}
            >Envíar respuesta</button>

            <p>{ index + 1 }/{ words?.length }</p>
          </div>
        ) : null
      }
    </div>
  )
}
