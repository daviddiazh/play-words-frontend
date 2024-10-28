import { useRef, useState } from "react";
import { useAuth } from "../../../../context/auth/AuthProvider";
import { useAxios } from "../../../../hooks/useAxios";
import { currentDate } from "../../../../utils/current-date";
import { Input } from "../../../../components/Input";
import { useForm } from "../../../../hooks/useForm";
import { isValidWord } from "../../../../utils/validate-words";
import styles from './styles.module.css'
import { nextDate } from "../../../../utils/next-date";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../../components/Loading";
import { useSpeech } from "../../../../hooks/useSpeech";
import { Icon } from "../../../../components/Icon";

export const Play = () => {
  const [ words, setWords ] = useState<any[] | any>(null);
  const [ index, setIndex ] = useState(0);
  const [ isError, setIsError ] = useState(false);
  const [ isLoading, setIsLoading ] = useState(false);
  const [ showScore, setShowScore ] = useState(false);

  const [ score, setScore ] = useState({
    well: 0,
    unwell: 0
  })

  const { logout, user } = useAuth();
  const { post, put } = useAxios({
    logout
  });
  const { answer, attemptsState, onInputChange, onResetForm } = useForm({
    answer: '',
    attemptsState: 0,
  });
  const userAnswers = useRef<any[]>([])
  const navigate = useNavigate();
  const { speak } = useSpeech();

  const fetch = async () => {
    setIsLoading(true)
    const resp = await post('/api/exam/today', { today: currentDate })
    setWords(resp)
    setIsLoading(false)
  }

  const nextQuestion = async () => {
    if (words?.length - 1 === index) {
      setIsLoading(true)
      const resp = await put('/api/exam/today/apply', userAnswers?.current)
      const set = userAnswers?.current?.reduce((_, curr) => {
        if (curr?.newValues?.attempts === 0) {
          score.well += 1;
        } else {
          score.unwell += 1;
        }
        return score;
      }, score)
      setScore(set);
      setIsLoading(false)
      if (resp?.ok) {
        toast.success('Bien hecho! Completaste tu tarea del día')
        setIndex(index + 1)
        setShowScore(true)
      }
    } else {
      setIndex(index + 1)
      onResetForm()
    }
  }

  const validateAnswer = () => {
    setIsError(false)
    const isValid = isValidWord(words[index]?.englishWord, answer)

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
    userAnswers?.current?.push({
      userId: user?._id,
      wordId: words[index]?._id,
      newValues: {
        attempts: attempt,
        lastReview: currentDate,
        showAt: nextDate(attemptBackend, attemptsState),
      }
    })
    nextQuestion()
  }

  if (isLoading) return <Loading />

  return (
    <div className={styles.container}>
      {
        !words?.length && !index && <button className={styles.btn} onClick={fetch}>Comenzar juego</button>
      }
      
      {
        words?.length && index + 1 <= words?.length && attemptsState < 2 ? (
          <div className={styles['play-container']}>
            <p className={styles.word}>{ words?.[index]?.translations?.join(', ') }</p>
            <Input 
              name='answer'
              placeholder="Ingresa tu respuesta"
              onChange={onInputChange}
              value={answer}
              required
              key="text"
              isError={isError}
            />
            <div style={{ width: '100%', display: 'flex', gap: 8 }}>
              <button
                onClick={validateAnswer}
                className={isError ? styles.errorBtn : styles.btn}
                style={{ width: isError ? '85%' : '100%' }}
              >{isError ? 'Reintenar respuesta' : 'Envíar respuesta'}</button>
              {
                isError ? (
                  <button 
                    onClick={() => speak(words?.[index]?.englishWord)}
                    className={styles.speakBtn}
                    style={{ width: '15%' }}
                  >
                    <Icon name="headphones-02" color="#0fa7ff" />
                  </button>
                ) : null
              }
            </div>

            <p className={styles.index}>{ index + 1 }/{ words?.length }</p>
          </div>
        ) : null
      }

      {
        attemptsState === 2 && isError ? (
          <div>
            <p style={{ padding: '25px 0' }}>Ejemplo: <span className={styles.sentence}>{ words?.[index]?.sentence }</span></p>
            <button 
              onClick={validateAnswer}
              className={styles.errorBtn}
            >Continuar</button>
          </div>
        ) : null
      }

      {
        words?.length === 0 ? (
          <div>
            <p className={styles.sentence}>No tienes palabras para hoy</p>
          </div>
        ) : null
      }

      {
        showScore ? (
          <div className={styles.scoreDiv}>
            <p className={styles['score-text']}>Terminaste y este es tu Score:</p>
            <p className={styles.label}>Buenas: <span className={styles.well}>{score.well}</span></p>
            <p className={styles.label}>Por mejorar: <span className={styles.unwell}>{score.unwell}</span></p>

            <h3 style={{ padding: '20px 0' }}>Repaso de hoy</h3>
            {
              words?.map((word: any) => (
                <div className={styles.childrenScore} key={word?.englishWord}>
                  <p>{word?.englishWord}</p>
                  <button 
                    onClick={() => speak(word?.englishWord)}
                    className={styles.listen}
                  >
                    Escuchar
                  </button>
                </div>
              ))
            }

            <button 
              onClick={() => navigate('/')}
              className={styles.btn}
              style={{ marginTop: 10 }}
            >Finalizar</button>
          </div>
        ) : null
      }
    </div>
  )
}
