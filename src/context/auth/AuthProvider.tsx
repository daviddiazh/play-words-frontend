import { FC, ReactNode, useContext, useEffect, useReducer } from "react"
import { AuthContext, AuthStatus, IUser } from './AuthContext';
import { authReducer } from "./authReducer";
import { useAxios } from "../../hooks/useAxios";
import { Loading } from "../../components/Loading";
import { useIndexedDBStore } from "use-indexeddb";
import { Bounce, toast } from "react-toastify";

export interface AuthInitialState {
    user: IUser | undefined;
    token: string | undefined;
    status: AuthStatus;
}

const INITIAL_STATE: AuthInitialState = {
    user: undefined,
    token: undefined,
    status: 'checking',
}

export const AuthProvider: FC<{children: ReactNode}> = ({ children }) => {

    const [ state, dispatch ] = useReducer(authReducer, INITIAL_STATE);
    const { add, getByID, deleteAll } = useIndexedDBStore("user");

    const logout = async () => {
        dispatch({type: 'Auth - Logout'});
        deleteAll()
        localStorage.getItem('id')
        localStorage.getItem('token')
    }

    const { post } = useAxios({
        logout,
    });

    const checking = () => dispatch({type: 'Auth - Checking'});

    const login = async (user: { email: string, password: string }) => {
        // checking();
        const resp = await post('/api/auth/login', user);
        if (resp?.token) {
            dispatch({type: 'Auth - Login', payload: resp});
            await add({
                id: resp?.user?._id,
                user: {
                    name: resp?.user?.name,
                    email: resp?.user?.email,
                    _id: resp?.user?._id,
                    role: resp?.user?.role,
                },
            }).then(console.log).catch(console.error);
            localStorage.setItem('id', resp?.user?._id)
            localStorage.setItem('token', resp?.token)
        } else {
            logout()
        }
    }

    const enrollment = async (user: IUser) => {
        const resp = await post('/api/auth/enrollment', user);
        if (resp?.enrolled) {
            return toast.success('Ahora puedes iniciar sesión con tu cuenta', {
                position: "top-right",
                autoClose: 6000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'colored',
                transition: Bounce,
            });
        }
    }

    useEffect(() => {
        const id = localStorage.getItem('id') ?? ''
        getByID(id)
            .then((data: any) => {
                if (data?.id) {
                    return dispatch({
                        type: 'Auth - Login', 
                        payload: { 
                            _id: data?.user?._id, 
                            email: data?.user?.email, 
                            name: data?.user?.name, 
                            role: data?.user?.role 
                        }
                    })
                }
                return logout()
            })
            .catch(() => logout());
    }, [])

    if (state.status === 'checking') return <Loading />

    return (
        <AuthContext.Provider value={{
            ...state,

            login,
            logout,
            enrollment,
        }}>
            { children }
        </AuthContext.Provider>
    )
}
export const useAuth = () => useContext(AuthContext);