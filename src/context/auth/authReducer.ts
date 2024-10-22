import { IUser } from "./AuthContext";
import { AuthInitialState } from "./AuthProvider";

type AuthActionTypes = 
|   { type: 'Auth - Login', payload: IUser }
|   { type: 'Auth - Logout' }
|   { type: 'Auth - Checking' }

export const authReducer = ( state: AuthInitialState, action: AuthActionTypes ): AuthInitialState => {

    switch( action.type ){
       case 'Auth - Login':
           return {
               ...state,
               status: 'authenticated',
               user: action.payload,
           }
        case 'Auth - Logout':
            return {
                ...state,
                user: undefined,
                status: 'not-authenticated',
            }

        case 'Auth - Checking':
            return {
                ...state,
                status: 'checking',
            }

        default:
           return state;
    }

}