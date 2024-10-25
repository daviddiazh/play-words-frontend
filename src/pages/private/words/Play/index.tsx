import { useRef, useState } from "react";
import { useAuth } from "../../../../context/auth/AuthProvider";
import { useAxios } from "../../../../hooks/useAxios";
import { currentDate } from "../../../../utils/current-date";
import { Input } from "../../../../components/Input";
import { useForm } from "../../../../hooks/useForm";
import { isValidWord } from "../../../../utils/validate-words";
import styles from './styles.module.css'

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

  const nextQuestion = () => {
    if (index <= words?.length) {
      setIndex(index + 1)
      onResetForm()
    }
  }

  const validateAnswer = () => {
    setIsError(false)
    const isValid = isValidWord(words[index].englishWord, answer)
    console.log({ isValid })

    if ( !isValid && attemptsState <= 1 ) {
      setIsError(true)
      onInputChange({
        target: {
          name: 'attemptsState',
          value: attemptsState + 1,
        }
      })
      return;
    }

    const attemptBackend = words[index]?.attempts ?? 0
    const attempt: any = attemptBackend > 1 && attemptsState === 0 ? attemptBackend - 1 : attemptsState === 2 ? attemptBackend + 1 : attemptBackend + 0
    console.log({ attempt })
    userAnswers?.current?.push({
      userId: user?._id,
      wordId: words[index]?._id,
      newValues: {
        attempts: attempt,
        lastReview: currentDate,
        // showAt: //TODO
      }
    })
    nextQuestion()
  }

  console.log({ userAnswers })

  return (
    <div className={styles.container}>
      {
        !words.length && !index && <button className={styles.btn} onClick={fetch}>Comenzar juego</button>
      }
      
      {
        words.length && index + 1 <= words.length && attemptsState < 2 ? (
          <div className={styles['play-container']}>
            <p className={styles.word}>{ words[index]?.translations?.join(', ') }</p>
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
          </div>
        ) : null
      }

      {
        attemptsState === 2 ? (
          <div>
            <p className={styles.sentence}>{ words[index]?.sentence }</p>
            <button 
              onClick={validateAnswer}
              className={styles.errorBtn}
            >Continuar</button>
          </div>
        ) : null
      }
    </div>
  )
}
