import { Link } from "react-router-dom";
import FormView from "../../../components/FormView";
import LoginButton from "../../../components/LoginButton";

export async function action({ request }) {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    console.log(data);

    return null;
}

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
            buttonContent={<LoginButton />}
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