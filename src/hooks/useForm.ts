import { useState } from 'react';

export const useForm = <T extends object>( initState: T ) => {

    const [ formState, setFormState ] = useState( initState );

    const onInputChange = ({ target }: {target: { name: string, value: string}}) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [ name ] : value,
        });
    }

    const onResetForm = ( field: keyof T ) => {
        setFormState({
            ...formState,
            [field]: ''
        });
    }

    return {
        ...formState,
        form: formState,
        onInputChange,
        onResetForm
    }

}