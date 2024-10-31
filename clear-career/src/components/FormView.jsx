import { Form } from "react-router-dom";

export default function FormView({
    title,
    inputFields,
    buttonText,
    extraContent
}) {
    return (
        <section>
            <div className="form">
                <h2>{title}</h2>
                <Form method="post" className="form-view">
                    {inputFields.map(({ type, name, id, placeholder }, index) => {
                        return <input
                            key={index}
                            type={type}
                            name={name}
                            id={id}
                            placeholder={placeholder}
                        >
                        </input>
                    })}
                    <button type="submit">{buttonText}</button>

                    {extraContent && <div className="extra-content">{extraContent}</div>}
                </Form>
            </div>
        </section>
    );
}