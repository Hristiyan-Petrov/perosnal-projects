import { Link } from "react-router-dom";
import LoginButton from "../../../components/LoginButton";
import FormView from "../../../components/common/FormView/FormView";

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
            buttonContent={'Login'}
            // buttonContent={<LoginButton />}
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