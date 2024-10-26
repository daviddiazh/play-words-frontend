import { useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import { TagsInput } from '../../../../components/TagsInput'
import { useForm } from '../../../../hooks/useForm';
import { Input } from '../../../../components/Input';
import { useAxios } from '../../../../hooks/useAxios';
import { useAuth } from '../../../../context/auth/AuthProvider';
import styles from './styles.module.css'

export const AddWord = () => {

  const [ translations, setTranslations ] = useState([]);
  const { englishWord, sentence, onInputChange, onResetForm } = useForm({
    englishWord: '',
    sentence: '',
  });

  const { logout } = useAuth();

  const { post } = useAxios({
    logout
  });

  const selectedTags = (tags: any = []) => {
    const tag = tags.map((tag: any) => tag)
    setTranslations( tag );
  }

  const onSubmit = async () => {
    const resp = await post('/api/words/', {translations, englishWord, sentence})
    if ( resp?.englishWord ) {
      onResetForm('englishWord')
      onResetForm('sentence')
      setTranslations( [] );
      toast.success(`La palabra ${englishWord} fue guardada con éxito`, {
        position: "top-right",
        autoClose: 6000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        // theme: 'colored',
        transition: Bounce,
      })
    }
  }

  return (
    <div className={styles.container}>
      <h2 style={{ margin: '15px 0' }}>Agregar una palabra</h2>

      <Input
        name='englishWord'
        onChange={onInputChange}
        placeholder='Palabra en Inglés'
        value={englishWord}
        required
        type='text'
      />
      <Input
        name='sentence'
        onChange={onInputChange}
        placeholder='Frase en Inglés'
        value={sentence}
        required
        type='text'
      />

      <TagsInput selectedTags={selectedTags} tags={[]} />
      <button 
        className={styles.btn}
        onClick={onSubmit}
      >
        Ingresar
      </button>
    </div>
  )
}
