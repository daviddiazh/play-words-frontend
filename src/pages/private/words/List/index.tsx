import { useEffect, useState } from "react"
import { useAuth } from "../../../../context/auth/AuthProvider";
import { useAxios } from "../../../../hooks/useAxios";
import { Loading } from "../../../../components/Loading";

export const ListWords = () => {

  const [ words, setWords ] = useState([]);
  const [ isLoading, setIsLoading ] = useState(false);

  const { logout } = useAuth();
  const { get } = useAxios({
    logout
  });

  const fetch = async () => {
    setIsLoading(true)
    const resp = await get('/api/words')
    setWords(resp)
    setIsLoading(false)
  }

  useEffect(() => {
    void fetch()
  }, [])

  if (isLoading) return <Loading />

  return (
    <div style={{ padding: '0 10px' }}>
      <h2 style={{ margin: '15px 0' }}>Listar las palabras</h2>
      {
        words?.length && words?.map((word: any) => (
          <div key={word?.englishWord}>
            <strong>{word?.englishWord}</strong>
            <p>{word?.sentence}</p>
            <ol>
              {word?.translations?.map((t: any) => <li key={t+word?.englishWord}>{t}</li>)}
            </ol>
          </div>
        ))
      }
    </div>
  )
}