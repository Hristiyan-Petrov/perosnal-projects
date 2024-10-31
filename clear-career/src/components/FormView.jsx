import React from "react";
import { Form } from "react-router-dom";

export default function FormView({
    title,
    inputFields,
    buttonContent,
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

                    {typeof buttonContent === 'string'
                        ? <button type="submit">{buttonContent}</button>
                        : buttonContent
                    }
                    

                    {extraContent && <div className="extra-content">{extraContent}</div>}
                </Form>
            </div>
        </section>
    );
}