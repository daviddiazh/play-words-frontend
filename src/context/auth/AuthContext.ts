import { createContext } from 'react';

export type AuthStatus = 'authenticated' | 'not-authenticated' | 'checking';

export enum Role {
    ADMIN = 'ADMIN',
    READER = 'READER',
    WRITER = 'WRITER'
}

export interface IUser {
    _id?: string;
    email: string;
    name: string;
    role: Role;
}

interface AuthStateProps {
    user: IUser | undefined;
    status: AuthStatus;

    login: (user: { email: string, password: string }) => void;
    enrollment: (user: any) => void;
    logout: () => Promise<void>;
}

export const AuthContext = createContext({} as AuthStateProps);