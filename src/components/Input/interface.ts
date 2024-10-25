export interface InputProps {
    name: string;
    value: string | number;
    placeholder: string;
    type?: string;
    required?: boolean;
    isError?: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}