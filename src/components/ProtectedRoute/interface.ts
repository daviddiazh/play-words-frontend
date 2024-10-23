import { Role } from "../../context/auth/AuthContext";

export interface ProtectedRouteProps {
    children: React.ReactNode;
    roles: Role[];
}