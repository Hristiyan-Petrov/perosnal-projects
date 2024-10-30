import { Link } from "react-router-dom";
import FormView from "../../../components/FormView";

export default function Register() {
    const inputFields = [
        {
            type: 'text',
            name: "email",
            id: "register-email",
            placeholder: "Email",
        },
        {
            type: "password",
            name: "Password",
            id: "register-password",
            placeholder: "Password",
        },
        {
            type: "assword",
            name: "re-password",
            id: "repeat-password",
            placeholder: "Repeat password",
        }
    ]
    return (
        <FormView
            title={'Register'}
            inputFields={inputFields}
            buttonText={'Register'}
            extraContent={<Message />}
        />
    );
}

function Message() {
    return (
        <p className="message">
            Already registered? <Link to="/login">Login to your account</Link>
        </p>
    )
}