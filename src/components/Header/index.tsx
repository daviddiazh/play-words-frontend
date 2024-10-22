import { useAuth } from "../../context/auth/AuthProvider"

export const Header = () => {

  const { logout, status } = useAuth();

  return (
    <div>
      <p>Header</p>
      {
        status === 'authenticated' && <button onClick={logout}>Logout</button>
      }
    </div>
  )
}
