import { useRef, useState } from "react";
import { useAuth } from "../../../../context/auth/AuthProvider";
import { useAxios } from "../../../../hooks/useAxios";
import { currentDate } from "../../../../utils/current-date";
import { Input } from "../../../../components/Input";
import { useForm } from "../../../../hooks/useForm";
import styles from './styles.module.css'
import { isValidWord } from "../../../../utils/validate-words";

export const Play = () => {
  const [ words, setWords ] = useState<any[]>([]);
  const [ index, setIndex ] = useState(0);
  const [ isError, setIsError ] = useState(false);

  const { logout, user } = useAuth();
  const { post } = useAxios({
    logout
  });
  const { answer, attemptsState, onInputChange, onResetForm } = useForm({
    answer: '',
    attemptsState: 0,
  });
  const userAnswers = useRef<any[]>([])

  const fetch = async () => {
    const resp = await post('/api/exam/today', { today: currentDate })
    setWords(resp)
  }

  const validateAnswer = () => {
    setIsError(false)
    const isValid = isValidWord(words[index].englishWord, answer)
    console.log({ isValid })

    if ( !isValid && attemptsState === 0 ) {
      setIsError(true)
      onResetForm('answer')
      onInputChange({
        target: {
          name: 'attemptsState',
          value: 1,
        }
      })
      return;
    }

    const attemptBackend = words[index]?.attempts ?? 0
    const attempt: any = attemptBackend > 1 && attemptsState === 0 ? attemptBackend - 1 : attemptBackend + attemptsState
    userAnswers?.current?.push({
      userId: user?._id,
      wordId: words[index]?._id,
      newValues: {
        attempts: attempt,
        lastReview: currentDate,
        // showAt: //TODO
      }
    })
    //todo ----------- end
    onResetForm('answer')
    setIndex(index + 1)
  }

  console.log({ userAnswers })

  return (
    <div className={styles.container}>
      {
        !words.length && !index && <button className={styles.btn} onClick={fetch}>Comenzar juego</button>
      }
      
      {
        words.length && index + 1 <= words.length ? (
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
              isError={isError}
            />
            <button 
              onClick={validateAnswer}
              className={isError ? styles.errorBtn : styles.btn}
            >{isError ? 'Reintenar respuesta' : 'Envíar respuesta'}</button>

            <p className={styles.index}>{ index + 1 }/{ words?.length }</p>

            <div>
              <button>Volver a ver en 1 día</button>
              <button>Volver a ver en 2 días</button>
              <button>Volver a ver en 3 días</button>
            </div>
          </div>
        ) : null
      }
    </div>
  )
}
