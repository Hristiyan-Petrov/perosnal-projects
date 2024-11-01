import { useAuth0 } from "@auth0/auth0-react";
import { useAuthNotification } from "../../hooks/useAuthNotification";
import { AUTH_KEYS, AUTH_MESSAGES } from "../../constants/messages";
import { useLoaderData } from "react-router-dom";

export const loader = () => {
    return fetch('http://localhost:5000/status')
        .then(res => res.json())
        .then(res => {
            // console.log(res)
            return res;
        })
        .catch(err => {
            console.log(err)
            return null;
        })
}

export default function Dashboard() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    useAuthNotification(isAuthenticated, isLoading, AUTH_MESSAGES.loginSuccess, AUTH_KEYS.loginNotificationLocalStorageKey);

    const result = useLoaderData();
    console.log(user);
    console.log(result);

    return (
        <section id="dashboard">
            <h2>Job Offers</h2>

            {/* <!-- Display a div with information about every post (if any)--> */}
            <div className="offer">
                <img src="./images/example1.png" alt="example1" />
                <p>
                    <strong>Title: </strong><span className="title">Sales Manager</span>
                </p>
                <p><strong>Salary:</strong><span className="salary">1900</span></p>
                <a className="details-btn" href="">Details</a>
            </div>
            <div className="offer">
                <img src="./images/example2.png" alt="example2" />
                <p>
                    <strong>Title: </strong
                    ><span className="title">Senior Frontend Software Engineer</span>
                </p>
                <p><strong>Salary:</strong><span className="salary">7000</span></p>
                <a className="details-btn" href="">Details</a>
            </div>
            <div className="offer">
                <img src="./images/example3.png" alt="./images/example3.png" />
                <p>
                    <strong>Title: </strong><span className="title">Invoice Administrator</span>
                </p>
                <p><strong>Salary:</strong><span className="salary">1700</span></p>
                <a className="details-btn" href="">Details</a>
            </div>

            {/* <!-- Display an h2 if there are no posts --> */}
            <h2>No offers yet.</h2>
        </section>
    );
}