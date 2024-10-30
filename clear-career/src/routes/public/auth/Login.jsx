import { Link } from "react-router-dom";
import FormView from "../../../components/FormView";

export default function Login() {
    const inputFields = [
        {
            type: 'text',
            name: "email",
            id: "email",
            placeholder: "Email",
        },
        {
            type: "password",
            name: "password",
            id: "password",
            placeholder: "Password",
        }
    ];

    return (
        <FormView
            title={'Login'}
            inputFields={inputFields}
            buttonText={'Login'}
            extraContent={<Message />}
        />
    );
}

function Message() {
    return (
        <p className="message">
            Not registered? <Link to="/register">Create an account</Link>
        </p>
    )
}