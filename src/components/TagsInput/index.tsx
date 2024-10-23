import { useState, useEffect } from 'react';
import { useForm } from '../../hooks/useForm';
import styles from './styles.module.css';
import { Icon } from '../Icon';

export const TagsInput = (props: any) => {

    const { userInput, onInputChange, onResetForm } = useForm({
        userInput: '',
    });

    const [ tags, setTags ] = useState(props.tags);

    const removeTags = (indexToRemove: any) => {
        setTags([...tags.filter((_: any, index: any) => index !== indexToRemove)]);
        props?.selectedTags([tags]);
    }

    const addTags = ({target}: any) => {
        target.value.trim();
        if( target.value.length <= 1 ) return;

        setTags([ ...tags, target.value ]);
        props?.selectedTags([ ...tags, target.value ]);

        target.value = '';
        onResetForm('userInput')
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement> | any) => {
        if ((e.key === 'Enter' || e.key === ',') && !e.shiftKey) {
            e.preventDefault();

            const validation = tags?.some((tag: any) => tag === e.target.value.trim())

            if (validation) return

            addTags(e);
        }
    };

    useEffect(() => {
        props?.selectedTags([...tags]);
    }, [ tags ]);

    return (
        <div>
            <div className={styles['tags-input']}>
                <ul className={styles['tags']}>
                    {
                        tags?.map((tag: any, index: any) => (
                            <li key={index} className={styles.tag}>
                                <p className={styles['tag-title']}>{tag}</p>
                                <span
                                    onClick={ () => removeTags(index) }
                                >
                                    <Icon name='x' color='#fff' />
                                </span>
                            </li>
                        ))
                    }
                </ul>

                <input 
                    placeholder='Agrega las traducciones en español'
                    type="text"
                    className={styles['form-input-tags']}
                    name='userInput'
                    onChange={ onInputChange }
                    autoComplete="off"
                    onKeyDown={handleKeyDown}
                    value={userInput}
                />
            </div>
        </div>
    );
}