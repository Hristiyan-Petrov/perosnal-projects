import { nanoid } from "nanoid";
import { Form } from "react-router-dom";
import styles from './FormView.module.scss';
import { useAuth0 } from "@auth0/auth0-react";

export default function FormView({
    title,
    onSubmitHandler,
    inputFields,
    buttonContent,
    extraContent
}) {
    const { user } = useAuth0();

    return (
        <section className={styles.container}>
            <div className={styles.form}>
                <h2 className={styles.form__title}>{title}</h2>
                <form
                    className={styles.form__view}
                    onSubmit={onSubmitHandler}
                >
                    {inputFields.map(({ type, name, id = '', placeholder, options = '' }, index) => {
                        const fieldId = id || `${name}-${nanoid(6)}`;

                        switch (type) {
                            case 'text':
                            case 'password':
                            case 'email':
                            case 'number':
                                return (
                                    <div key={fieldId} className={styles['form-group']}>
                                        <label htmlFor={fieldId}>{name.toUpperCase()}</label>
                                        <input
                                            type={type}
                                            name={name}
                                            id={fieldId}
                                            placeholder={placeholder}
                                        />
                                    </div>
                                );
                            case 'textarea':
                                return (
                                    <div key={fieldId} className={styles['form-group']}>
                                        <label htmlFor={fieldId}>{name.toUpperCase()}</label>
                                        <textarea
                                            name={name}
                                            id={fieldId}
                                            placeholder={placeholder}
                                        ></textarea>
                                    </div>
                                );
                            case 'select':
                                return (
                                    <div key={fieldId} className={styles['form-group']}>
                                        <label htmlFor={fieldId}>{name.toUpperCase()}</label>
                                        <select name={name} id={fieldId}>
                                            <option value="">Select {name}</option>
                                            {options.map((option, optionIndex) => (
                                                <option
                                                    key={`${fieldId}-option-${optionIndex}`}
                                                    value={option}
                                                >
                                                    {option}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                );
                            case 'salary-range':
                                return (
                                    <div
                                        key={fieldId}
                                        className={`${styles['form-group']} ${styles['form-group--salary-range']}`}
                                    >
                                        <label htmlFor={`${fieldId}-from`}>{placeholder}</label>
                                        <div className={styles['salary-inputs']}>
                                            <input
                                                type="number"
                                                name={`${name}[from]`}
                                                id={`${fieldId}-from`}
                                                placeholder="From"
                                            />
                                            <input
                                                type="number"
                                                name={`${name}[to]`}
                                                id={`${fieldId}-to`}
                                                placeholder="To"
                                            />
                                        </div>
                                    </div>
                                );
                            default:
                                return null;
                        }
                    })}

                    <input type="hidden" name="auth0Id" value={user.sub} />

                    <button type="submit" className={styles.form__submit}>
                        {buttonContent}
                    </button>

                    {extraContent && (
                        <div className={styles.form__extraContent}>{extraContent}</div>
                    )}
                </form>
            </div>
        </section>
    );
}