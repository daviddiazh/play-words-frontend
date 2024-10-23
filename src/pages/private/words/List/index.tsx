import { useEffect, useState } from "react"
import { useAuth } from "../../../../context/auth/AuthProvider";
import { useAxios } from "../../../../hooks/useAxios";

export const ListWords = () => {

  const [ words, setWords ] = useState([]);

  const { logout } = useAuth();
  const { get } = useAxios({
    logout
  });

  const fetch = async () => {
    const resp = await get('/api/words')
    setWords(resp)
  }

  useEffect(() => {
    void fetch()
  }, [])

  return (
    <div>
      <h2 style={{ margin: '15px 0' }}>Listar las palabras</h2>
      {
        words?.length && words?.map((word: any) => (
          <div key={word?.englishWord}>
            <p>{word?.englishWord}</p>
            <ol>
              {word?.translations?.map(t => <li key={t+word?.englishWord}>{t}</li>)}
            </ol>
          </div>
        ))
      }
    </div>
  )
}