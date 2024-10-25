import { useState } from 'react';

export const useForm = <T extends object>( initState: T ) => {

    const [ formState, setFormState ] = useState( initState );

    const onInputChange = ({ target }: {target: { name: string, value: string | number}}) => {
        const { name, value } = target;

        setFormState({
            ...formState,
            [ name ] : value,
        });
    }

    // const onResetForm = ( field: keyof T ) => {
    //     setFormState({
    //         ...formState,
    //         [field]: ''
    //     });
    // }

    const onResetForm = (field?: keyof T) => {
        if (field) {
            setFormState({
                ...formState,
                [field]: ''
            });
        } else {
            setFormState(initState); // Restablece el estado a su valor inicial
        }
    };

    return {
        ...formState,
        form: formState,
        onInputChange,
        onResetForm
    }

}